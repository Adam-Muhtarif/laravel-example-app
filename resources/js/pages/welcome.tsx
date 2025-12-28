import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Layout,
    ShieldCheck,
    Zap,
} from 'lucide-react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            <Head title="Welcome" />

            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <div className="text-xl font-bold tracking-tighter">
                        TaskFlow
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-50" />

                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-3xl animate-in text-center duration-1000 fade-in slide-in-from-bottom-8">
                        <h1 className="mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
                            Manage tasks with <br />
                            anti-gravity speed.
                        </h1>

                        <p className="mb-8 text-xl leading-relaxed text-gray-400">
                            The most intuitive task manager designed for
                            individuals who want to break free from productivity
                            friction.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/register"
                                className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-all hover:scale-105 hover:bg-gray-200 active:scale-95"
                            >
                                Start for free
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/login"
                                className="rounded-full border border-white/10 px-8 py-4 text-lg font-medium transition-colors hover:bg-white/5"
                            >
                                Live Demo
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="perspective-1000 relative mt-20 animate-in delay-300 duration-1000 fill-mode-backwards zoom-in-95 fade-in">
                        <div className="relative rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
                            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-50 blur-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop"
                                alt="App Dashboard"
                                className="w-full rounded-lg border border-white/5 shadow-2xl"
                            />

                            {/* Floating Elements - using CSS animation for float */}
                            <div className="absolute -top-8 -right-8 animate-bounce rounded-xl border border-white/10 bg-black p-4 shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-green-500/20 p-2">
                                        <CheckCircle2 className="size-6 text-green-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">
                                            Task Completed
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Just now
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="border-t border-white/10 bg-zinc-950 py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Zap,
                                title: 'Lightning Fast',
                                desc: 'Built with Inertia.js and React for instant page transitions and interactions.',
                            },
                            {
                                icon: Layout,
                                title: 'Clean Interface',
                                desc: 'A distraction-free environment that helps you focus on what really matters.',
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Secure by Default',
                                desc: "Enterprise-grade security with Laravel's robust authentication system.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/5 bg-white/5 p-8 transition-all hover:-translate-y-1 hover:border-white/10"
                            >
                                <feature.icon className="mb-6 size-10 text-purple-400" />
                                <h3 className="mb-3 text-xl font-bold">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed text-gray-400">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
                    <div className="text-sm text-gray-500">
                        © 2024 TaskFlow. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Twitter
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
