import { FormEvent, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';

interface ContactFormState {
    name: string;
    email: string;
    topic: string;
    message: string;
}

const initialForm: ContactFormState = {
    name: '',
    email: '',
    topic: '',
    message: '',
};

export default function Contact() {
    const [form, setForm] = useState<ContactFormState>(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // This is a placeholder for a real API integration.
        // In production, submit the form via Inertia post request or a dedicated endpoint.
        setSubmitted(true);
        setForm(initialForm);
    };

    return (
        <>
            <Head title="Contact Support" />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr]">
                    <section className="rounded-3xl bg-white p-10 shadow-2xl shadow-emerald-200/60 ring-1 ring-emerald-100 dark:bg-slate-900 dark:ring-slate-800">
                        <header>
                            <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-500">
                                Contact
                            </p>
                            <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                                Talk with our Support Team
                            </h1>
                            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                                Whether you need help with an order, account settings, or marketplace concerns, we’re here Monday to Friday from 9 AM to 6 PM (PHT).
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                                    placeholder="Your full name"
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                                    placeholder="you@example.com"
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Topic
                                </label>
                                <select
                                    value={form.topic}
                                    onChange={(event) => setForm({ ...form, topic: event.target.value })}
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select a topic</option>
                                    <option value="account">Account & Security</option>
                                    <option value="orders">Orders & Trades</option>
                                    <option value="payments">Payments & Payouts</option>
                                    <option value="feedback">Product Feedback</option>
                                    <option value="other">Something else</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Message
                                </label>
                                <textarea
                                    value={form.message}
                                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                                    placeholder="Tell us a bit more about what you need."
                                    rows={5}
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
                            >
                                Submit Request
                            </button>
                        </form>

                        {submitted && (
                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200">
                                Thanks for reaching out! A member of our support team will contact you within one business day.
                            </div>
                        )}
                    </section>

                    <aside className="space-y-6 rounded-3xl bg-slate-900 px-8 py-10 text-slate-100 shadow-emerald-500/20 ring-1 ring-white/10">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">Prefer a quick answer?</h2>
                            <p className="mt-2 text-sm text-slate-300">
                                Visit our Help Center for guides, step-by-step articles, and troubleshooting tips across wardrobe management, the marketplace, and teams.
                            </p>
                            <Link
                                href="/support/help-center"
                                className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                            >
                                Browse the Help Center →
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-lg font-semibold text-white">Direct Lines</h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-200">
                                <li>
                                    Support Email:{' '}
                                    <a href="mailto:help@restyle.com" className="font-medium text-emerald-300 hover:underline">
                                        help@restyle.com
                                    </a>
                                </li>
                                <li>
                                    Phone (Weekdays):{' '}
                                    <a href="tel:+639761083939" className="font-medium text-emerald-300 hover:underline">
                                        (+63) 976 108 3939
                                    </a>
                                </li>
                                <li>Live chat: Available in-app 9 AM – 6 PM PHT</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-lg font-semibold text-white">Office Hours</h3>
                            <p className="mt-2 text-sm text-slate-200">
                                Monday – Friday, 9 AM to 6 PM (PHT). We aim to respond to all enquiries within one business day, with priority given to safety reports.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}

