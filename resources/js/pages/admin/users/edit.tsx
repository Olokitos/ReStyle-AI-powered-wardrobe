import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Users, 
    Save,
    X,
    CreditCard,
    Shield
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'User Management',
        href: '/admin/users',
    },
    {
        title: 'Edit User',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    gcash_number?: string | null;
    bank_name?: string | null;
    bank_account_number?: string | null;
    bank_account_name?: string | null;
}

interface UserEditProps {
    user: User;
}

export default function UserEdit({ user }: UserEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        gcash_number: user.gcash_number || '',
        bank_name: user.bank_name || '',
        bank_account_number: user.bank_account_number || '',
        bank_account_name: user.bank_account_name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User: ${user.name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link 
                        href={`/admin/users/${user.id}`}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to User Details</span>
                    </Link>
                </div>

                {/* Page Title */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Edit User</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Update user information and account details.
                    </p>
                </div>

                {/* Edit Form */}
                <div className="max-w-2xl mx-auto w-full">
                    <Card className="border-gray-200 dark:border-gray-700">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Users className="h-5 w-5" />
                                <span>User Information</span>
                            </CardTitle>
                            <CardDescription>
                                Update the user's basic information. Changes will be saved immediately.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter full name"
                                        maxLength={100}
                                        required
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => {
                                            // Remove any characters that are not letters, numbers, @, or .
                                            const value = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '');
                                            setData('email', value);
                                        }}
                                        onKeyPress={(e) => {
                                            // Only allow letters (a-z, A-Z), numbers (0-9), @, and .
                                            if (!/[a-zA-Z0-9@.]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        placeholder="Enter email address"
                                        maxLength={100}
                                        required
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                {/* Payment Information Section */}
                                <div className="space-y-4 border-t pt-6 mt-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                            <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Payment Information (Admin Only)
                                            </Label>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                Manage user payment details for payouts
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* GCash Number */}
                                    <div className="space-y-2">
                                        <Label htmlFor="gcash_number" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            GCash Number
                                        </Label>
                                        <Input
                                            id="gcash_number"
                                            type="tel"
                                            inputMode="numeric"
                                            pattern="[0-9]{11,13}"
                                            value={data.gcash_number}
                                            onChange={(e) => {
                                                // Remove any non-numeric characters
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                setData('gcash_number', value);
                                            }}
                                            onKeyPress={(e) => {
                                                // Only allow numeric characters (0-9)
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="09XXXXXXXXX"
                                            maxLength={13}
                                            className={errors.gcash_number ? 'border-red-500' : ''}
                                        />
                                        {errors.gcash_number && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.gcash_number}</p>
                                        )}
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Enter GCash mobile number (PH format: 09XXXXXXXXX)
                                        </div>
                                    </div>

                                    {/* Bank Information */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="bank_name" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                                                <span>Bank Name</span>
                                            </Label>
                                            <Input
                                                id="bank_name"
                                                type="text"
                                                value={data.bank_name}
                                                onChange={(e) => {
                                                    // Remove any characters that are not letters, numbers, spaces, or hyphens
                                                    const value = e.target.value.replace(/[^a-zA-Z0-9\s-]/g, '');
                                                    setData('bank_name', value);
                                                }}
                                                onKeyPress={(e) => {
                                                    // Only allow letters, spaces, and common bank name characters
                                                    if (!/[a-zA-Z0-9\s-]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                placeholder="e.g., BPI, BDO, RCBC, Metrobank"
                                                maxLength={100}
                                                className={errors.bank_name ? 'border-red-500' : ''}
                                            />
                                            {errors.bank_name && (
                                                <p className="text-sm text-red-600 dark:text-red-400">{errors.bank_name}</p>
                                            )}
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Enter the full name of the bank
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bank_account_number" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                                                <span>Account Number</span>
                                            </Label>
                                            <Input
                                                id="bank_account_number"
                                                type="text"
                                                inputMode="numeric"
                                                value={data.bank_account_number}
                                                onChange={(e) => {
                                                    // Remove any non-numeric characters
                                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                                    setData('bank_account_number', value);
                                                }}
                                                onKeyPress={(e) => {
                                                    // Only allow numeric characters (0-9)
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                placeholder="Enter account number (numbers only)"
                                                maxLength={50}
                                                className={`font-mono ${errors.bank_account_number ? 'border-red-500' : ''}`}
                                            />
                                            {errors.bank_account_number && (
                                                <p className="text-sm text-red-600 dark:text-red-400">{errors.bank_account_number}</p>
                                            )}
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Enter bank account number (numbers only)
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bank_account_name" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                                            <span>Account Name</span>
                                        </Label>
                                        <Input
                                            id="bank_account_name"
                                            type="text"
                                            value={data.bank_account_name}
                                            onChange={(e) => {
                                                // Remove any characters that are not letters, spaces, apostrophes, hyphens, or periods
                                                const value = e.target.value.replace(/[^a-zA-Z\s'-.]/g, '');
                                                setData('bank_account_name', value);
                                            }}
                                            onKeyPress={(e) => {
                                                // Only allow letters, spaces, apostrophes, hyphens, and periods
                                                if (!/[a-zA-Z\s'-.]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="Name as it appears on bank account"
                                            maxLength={100}
                                            className={errors.bank_account_name ? 'border-red-500' : ''}
                                        />
                                        {errors.bank_account_name && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.bank_account_name}</p>
                                        )}
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Enter the exact name as it appears on the bank account
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-start space-x-2">
                                            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                            <div className="text-xs text-blue-800 dark:text-blue-200">
                                                <p className="font-medium mb-1">Security Notice</p>
                                                <p className="text-blue-600 dark:text-blue-300">
                                                    Payment information is encrypted and securely stored. Only administrators can view and edit this information.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Current Status */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Current Status
                                    </Label>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            <strong>Email Verification:</strong> {user.email_verified_at ? 'Verified' : 'Unverified'}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            <strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            <strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Warning Alert */}
                                <Alert>
                                    <AlertDescription>
                                        <strong>Important:</strong> Changing the email address will not automatically verify the new email. 
                                        The user will need to verify their new email address through the verification process.
                                    </AlertDescription>
                                </Alert>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-4 pt-4">
                                    <Link href={`/admin/users/${user.id}`}>
                                        <Button type="button" variant="outline">
                                            <X className="mr-2 h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                </div>
            </div>
        </AppLayout>
    );
}
