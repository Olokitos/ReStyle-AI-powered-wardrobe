import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';

const faqSections = [
    {
        title: 'Getting Started',
        items: [
            {
                question: 'How do I create an account?',
                answer: 'Choose Register from the top navigation, complete the sign-up form, and confirm your email. You can start curating your wardrobe and browsing the marketplace immediately after verification.',
            },
            {
                question: 'What can I do with Restyle?',
                answer: 'Use Restyle to catalogue your wardrobe, discover sustainable swaps, list pre-loved pieces, and connect with a community focused on circular fashion.',
            },
        ],
    },
    {
        title: 'Account & Security',
        items: [
            {
                question: 'How do I keep my account secure?',
                answer: 'Enable two-factor authentication from your settings page, use a strong password, and never share login credentials. We notify you by email about unusual activity.',
            },
            {
                question: 'Can I recover my password?',
                answer: 'Yes. Use the “Forgot password” link on the login page and follow the instructions. Contact Support if you no longer have access to your email.',
            },
        ],
    },
];

export default function HelpCenter() {
    return (
        <>
            <Head title="Help Center" />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-blue-900/30">
                <header className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
                        Support
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                        Help Center
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                        Quick answers to the most common questions about getting started, managing your account, and keeping your experience secure.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
                        <Link
                            href="/support/contact"
                            className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                        >
                            Contact Support
                        </Link>
                        <Link
                            href="/support/safety-guidelines"
                            className="rounded-full border border-emerald-200 px-6 py-3 font-semibold text-emerald-600 transition hover:border-emerald-400 hover:text-emerald-500 dark:border-emerald-500/40 dark:text-emerald-300"
                        >
                            Review Safety Guidelines
                        </Link>
                    </div>
                </header>

                <section className="mx-auto grid max-w-5xl gap-10 px-6 pb-24">
                    {faqSections.map((section) => (
                        <article
                            key={section.title}
                            className="rounded-3xl bg-white/70 p-8 shadow-xl shadow-emerald-500/10 backdrop-blur-md transition hover:shadow-2xl dark:bg-slate-900/60 dark:shadow-emerald-400/10"
                        >
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                                {section.title}
                            </h2>
                            <div className="mt-6 space-y-6">
                                {section.items.map((item) => (
                                    <div
                                        key={item.question}
                                        className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
                                    >
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {item.question}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}

