
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
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-violet-700 px-7 py-14 text-white shadow-xl shadow-blue-200/50 sm:px-12 sm:py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold">
                        <Sparkles size={16} />
                        Your Next Opportunity Starts Here
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">
                        Ready to Make Your
                        <span className="block text-blue-200">
                            Next Move?
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                        Whether youre looking for the perfect tutor or ready to share
                        your knowledge, MentorLagbe is here to help you get started.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/tuitions"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
                        >
                            <BookOpen size={18} />
                            Find a Tutor
                            <ArrowRight size={17} />
                        </Link>

                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/20"
                        >
                            <GraduationCap size={19} />
                            Become a Tutor
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
