
import Link from "next/link";
import {
    GraduationCap,
    BookOpen,
    ArrowRight,
    Sparkles,
} from "lucide-react";

export default function CTASection() {
    return (
        <section className="bg-slate-50 px-5 py-20 sm:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 px-7 py-14 text-white shadow-xl shadow-slate-300/40 sm:px-12 sm:py-16">
                {/* Decorative Background */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-400/10 px-4 py-2 text-xs font-bold tracking-wide text-teal-300">
                        <Sparkles size={16} />
                        Your Next Opportunity Starts Here
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                        Ready to Make Your
                        <span className="mt-1 block text-teal-400">
                            Next Move?
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                        Whether you are looking for the right tutor or ready
                        to share your knowledge, MentorLagbe helps you take
                        the next step with confidence.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/tuitions"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/10 transition duration-300 hover:-translate-y-1 hover:bg-teal-300"
                        >
                            <BookOpen size={18} />
                            Find a Tutor
                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/register"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-teal-300/50 hover:bg-teal-400/10"
                        >
                            <GraduationCap size={19} />
                            Become a Tutor
                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

