// Components
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter your email address and we'll send you a link to reset your password"
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-start">
                        <Mail className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                {status}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                <Form {...PasswordResetLinkController.store.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    placeholder="you@example.com"
                                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
                                    disabled={processing}
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div className="my-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                            Sending reset link...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="h-4 w-4 mr-2" />
                                            Send password reset link
                                        </>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center">
                    <TextLink 
                        href={login()} 
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 inline-flex items-center"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to login
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
