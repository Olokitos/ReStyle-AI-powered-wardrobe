<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the password reset link request page.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        // If user is already authenticated, redirect them to dashboard
        // (they shouldn't need to reset password if they're logged in)
        if (auth()->check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ], [
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Email address is too long.',
        ]);

        try {
            // We will send the password reset link to this user. Once we have attempted
            // to send the link, we will examine the response then see the message we
            // need to show to the user. Finally, we'll send out a proper response.
            $status = Password::sendResetLink(
                $request->only('email')
            );

            // Always return success message for security (don't reveal if email exists)
            if ($status == Password::RESET_LINK_SENT) {
                Log::info('Password reset link sent', ['email' => $request->email]);
                return back()->with('status', 'We have emailed your password reset link. Please check your inbox and spam folder.');
            }

            // If email doesn't exist, still show success message (security best practice)
            Log::warning('Password reset requested for non-existent email', ['email' => $request->email]);
            return back()->with('status', 'If that email address exists in our system, we have sent a password reset link.');

        } catch (\Exception $e) {
            Log::error('Password reset link error', [
                'email' => $request->email,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors([
                'email' => 'We encountered an error while sending the reset link. Please try again later or contact support if the problem persists.',
            ]);
        }
    }
}
