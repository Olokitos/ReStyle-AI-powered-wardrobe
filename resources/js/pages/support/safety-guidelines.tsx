import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';

const guidelines = [
    {
        title: 'Secure Exchanges',
        description:
            'Coordinate exchanges through Restyle messaging and meet in well-lit, public locations. Avoid sharing personal contact details until you feel comfortable and confident.',
    },
    {
        title: 'Product Transparency',
        description:
            'Describe the condition, size, fabric, and any imperfections honestly. High-quality photos help buyers make informed decisions and reduce disputes.',
    },
    {
        title: 'Payment & Protection',
        description:
            'Use Restyle’s verified payment options for in-app transactions. Never wire money or send gift cards outside the platform—these methods cannot be protected or refunded.',
    },
    {
        title: 'Community Conduct',
        description:
            'Treat every member with respect. Harassment, hate speech, and discriminatory language are strictly prohibited and may result in account suspension.',
    },
];

export default function SafetyGuidelines() {
    return (
        <>
            <Head title="Safety Guidelines" />
            <main className="min-h-screen bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_transparent_55%)]" />
                <div className="relative mx-auto max-w-4xl px-6 py-20">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                    >
                        ← Back to Home
                    </Link>

                    <header className="mt-10 space-y-4">
                        <p className="text-sm uppercase tracking-[0.2em] text-emerald-400/80">
                            Safety First
                        </p>
                        <h1 className="text-4xl font-bold text-white sm:text-5xl">
                            Safety Guidelines
                        </h1>
                        <p className="max-w-3xl text-lg text-slate-300">
                            We designed Restyle to celebrate sustainable fashion. To keep our community protected, follow these best practices whenever you connect, buy, or trade.
                        </p>
                    </header>

                    <section className="mt-12 space-y-8">
                        {guidelines.map((guideline) => (
                            <div
                                key={guideline.title}
                                className="rounded-3xl border border-white/5 bg-white/5 p-8 shadow-[0_0_30px_-15px_rgba(16,185,129,0.8)] backdrop-blur transition hover:border-emerald-400/60 hover:bg-emerald-500/5"
                            >
                                <h2 className="text-2xl font-semibold text-white">
                                    {guideline.title}
                                </h2>
                                <p className="mt-3 text-base text-slate-200">
                                    {guideline.description}
                                </p>
                            </div>
                        ))}
                    </section>

                    <aside className="mt-12 rounded-3xl border border-emerald-300/40 bg-emerald-500/10 p-8 text-slate-100">
                        <h3 className="text-xl font-semibold text-white">Need immediate assistance?</h3>
                        <p className="mt-2 text-sm text-emerald-100/90">
                            If something feels unsafe or you need to report a member, reach out to our Safety team right away. We review every report confidentially.
                        </p>
                        <Link
                            href="/support/contact"
                            className="mt-4 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                        >
                            Contact the Safety Team →
                        </Link>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}

