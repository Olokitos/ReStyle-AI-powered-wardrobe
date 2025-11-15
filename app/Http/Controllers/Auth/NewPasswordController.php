<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    /**
     * Show the password reset page.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        // If user is already authenticated, redirect them to dashboard
        if (auth()->check()) {
            return redirect()->route('dashboard');
        }

        $email = $request->query('email') ?? $request->email;
        $token = $request->route('token');

        if (!$token) {
            return redirect()->route('password.request')
                ->withErrors(['token' => 'Invalid reset token. Please request a new password reset link.']);
        }

        return Inertia::render('auth/reset-password', [
            'email' => $email,
            'token' => $token,
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'token.required' => 'Reset token is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'password.required' => 'Please enter a new password.',
            'password.confirmed' => 'Password confirmation does not match.',
        ]);

        try {
            // Here we will attempt to reset the user's password. If it is successful we
            // will update the password on an actual user model and persist it to the
            // database. Otherwise we will parse the error and return the response.
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (User $user) use ($request) {
                    $user->forceFill([
                        'password' => Hash::make($request->password),
                        'remember_token' => Str::random(60),
                    ])->save();

                    event(new PasswordReset($user));
                    
                    Log::info('Password reset successful', ['user_id' => $user->id, 'email' => $user->email]);
                }
            );

            // If the password was successfully reset, we will redirect the user back to
            // the application's home authenticated view. If there is an error we can
            // redirect them back to where they came from with their error message.
            if ($status == Password::PASSWORD_RESET) {
                return to_route('login')->with('status', 'Your password has been reset successfully! You can now log in with your new password.');
            }

            // Handle specific error cases
            $errorMessage = match($status) {
                Password::INVALID_TOKEN => 'This password reset link is invalid or has expired. Please request a new one.',
                Password::INVALID_USER => 'We could not find a user with that email address.',
                'passwords.throttled' => 'Too many reset attempts. Please wait a few minutes before trying again.',
                default => 'Unable to reset password. Please try again or request a new reset link.',
            };

            throw ValidationException::withMessages([
                'email' => [$errorMessage],
            ]);

        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Password reset error', [
                'email' => $request->email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            throw ValidationException::withMessages([
                'email' => 'An error occurred while resetting your password. Please try again or contact support.',
            ]);
        }
    }
}
