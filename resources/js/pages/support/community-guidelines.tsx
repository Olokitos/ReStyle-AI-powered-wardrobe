import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';

const principles = [
    {
        title: 'Champion Sustainable Fashion',
        details:
            'Share tips on garment care, upcycling, and responsible sourcing. Celebrate brands and makers that prioritise ethical production and transparency.',
    },
    {
        title: 'Lead With Kindness',
        details:
            'Offer constructive feedback and keep conversations respectful. Discrimination, bullying, or harassment have no place in the Restyle community.',
    },
    {
        title: 'Protect Community Trust',
        details:
            'Communicate honestly, deliver items as described, and respond promptly. Report suspicious activity so we can investigate and keep everyone safe.',
    },
    {
        title: 'Uplift Local Creators',
        details:
            'Spotlight independent designers and tailors. When you collaborate or share their work, credit them clearly and follow any usage guidelines they provide.',
    },
];

export default function CommunityGuidelines() {
    return (
        <>
            <Head title="Community Guidelines" />
            <main className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-sky-100 dark:from-slate-950 dark:via-emerald-900/10 dark:to-slate-900">
                <section className="mx-auto max-w-5xl px-6 py-24">
                    <div className="rounded-3xl bg-white/80 p-10 shadow-2xl shadow-emerald-200/50 ring-1 ring-emerald-100 dark:bg-slate-900/70 dark:shadow-none dark:ring-emerald-500/30">
                        <header className="text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
                                Community
                            </p>
                            <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                                Community Guidelines
                            </h1>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                                Restyle thrives when we create space for mindful, inclusive exchanges. Follow these principles whenever you connect, collaborate, or trade.
                            </p>
                        </header>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2">
                            {principles.map((principle) => (
                                <article
                                    key={principle.title}
                                    className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/50 dark:border-slate-800 dark:bg-slate-900/80"
                                >
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {principle.title}
                                    </h2>
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                                        {principle.details}
                                    </p>
                                </article>
                            ))}
                        </div>

                        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-600 px-6 py-8 text-white">
                            <div>
                                <h3 className="text-lg font-semibold">See something off-brand?</h3>
                                <p className="mt-1 text-sm text-emerald-100">
                                    Flag content or report behaviour that does not align with our principles. Our moderation team reviews every submission carefully.
                                </p>
                            </div>
                            <Link
                                href="/support/contact"
                                className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                            >
                                Report an Issue →
                            </Link>
                        </footer>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

