
import Link from "next/link";
import {
    ArrowRight,
    Check,
    Sparkles,
} from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#07110d]">

            {/* Desktop Background Image */}
            <div
                className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
                style={{
                    backgroundImage: "url('/images/hero-banner.jpg')",
                }}
            />

            {/* Desktop Dark Overlay */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-black/85 via-black/65 to-black/5 sm:block" />

            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:flex sm:min-h-[590px] sm:items-center sm:px-8">

                {/* Mobile Square Image */}
                <div
                    className="-mx-5 aspect-square bg-cover bg-center bg-no-repeat sm:hidden"
                    style={{
                        backgroundImage: "url('/images/hero-banner.jpg')",
                        backgroundPosition: "90% center",
                    }}
                />

                {/* Content */}
                <div className="max-w-[720px] py-12 sm:py-20 lg:py-24">

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-950 shadow-sm sm:text-sm">
                        <Sparkles size={17} className="text-amber-500" />
                        Your journey to better learning starts here
                    </div>

                    {/* Heading */}
                    <h1 className="text-[38px] font-extrabold leading-[1.13] tracking-tight text-white sm:text-5xl lg:text-[64px]">
                        Find The Right Tutor.
                        <span className="mt-1 block text-blue-500">
                            Unlock Your Potential.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-[590px] text-[15px] font-medium leading-relaxed text-white/90 sm:text-lg">
                        Whether you are looking for a tutor or searching for your
                        next teaching opportunity, MentorLagbe brings learning
                        connections closer to you.
                    </p>

                    {/* Buttons */}
                    <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                        <Link
                            href="/tuitions"
                            className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-1 hover:bg-blue-700 sm:px-7 sm:py-4"
                        >
                            Explore Tuitions
                            <ArrowRight
                                size={19}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:-translate-y-1 hover:bg-blue-50 sm:px-7 sm:py-4"
                        >
                            Become a Tutor
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white sm:gap-x-7 sm:text-sm">
                        <span className="flex items-center gap-2">
                            <Check size={18} strokeWidth={3} />
                            Easy applications
                        </span>

                        <span className="flex items-center gap-2">
                            <Check size={18} strokeWidth={3} />
                            Flexible opportunities
                        </span>

                        <span className="flex items-center gap-2">
                            <Check size={18} strokeWidth={3} />
                            Simple connections
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}

