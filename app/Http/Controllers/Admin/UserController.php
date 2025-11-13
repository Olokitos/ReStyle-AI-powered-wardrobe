<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index()
    {
        $users = User::where('is_admin', false)
            ->select('id', 'name', 'email', 'email_verified_at', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Hide payment information from user list (only show in detail/edit pages)
        $users->getCollection()->transform(function ($user) {
            $user->makeHidden(['gcash_number', 'bank_name', 'bank_account_number', 'bank_account_name']);
            return $user;
        });

        return Inertia::render('admin/users/index', [
            'users' => $users
        ]);
    }

    /**
     * Display the specified user
     */
    public function show(User $user)
    {
        // Prevent admin from viewing other admins
        if ($user->is_admin) {
            abort(403, 'Cannot view admin users.');
        }

        // Make payment information visible to admin
        $user->makeVisible(['gcash_number', 'bank_name', 'bank_account_number', 'bank_account_name']);

        return Inertia::render('admin/users/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified user
     */
    public function edit(User $user)
    {
        // Prevent admin from editing other admins
        if ($user->is_admin) {
            abort(403, 'Cannot edit admin users.');
        }

        // Make payment information visible to admin
        $user->makeVisible(['gcash_number', 'bank_name', 'bank_account_number', 'bank_account_name']);

        return Inertia::render('admin/users/edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, User $user)
    {
        // Prevent admin from updating other admins
        if ($user->is_admin) {
            abort(403, 'Cannot update admin users.');
        }

        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users,email,' . $user->id,
            'gcash_number' => 'nullable|string|max:16|regex:/^09\d{9}$/',
            'bank_name' => 'nullable|string|max:100',
            'bank_account_number' => 'nullable|string|max:50',
            'bank_account_name' => 'nullable|string|max:100',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'gcash_number' => $request->gcash_number,
            'bank_name' => $request->bank_name,
            'bank_account_number' => $request->bank_account_number,
            'bank_account_name' => $request->bank_account_name,
        ]);

        return redirect()->route('admin.users.show', $user)
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user
     */
    public function destroy(User $user)
    {
        // Prevent admin from deleting other admins
        if ($user->is_admin) {
            abort(403, 'Cannot delete admin users.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Reset user password
     */
    public function resetPassword(Request $request, User $user)
    {
        // Prevent admin from resetting other admin passwords
        if ($user->is_admin) {
            abort(403, 'Cannot reset admin passwords.');
        }

        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('admin.users.show', $user)
            ->with('success', 'Password reset successfully.');
    }
}