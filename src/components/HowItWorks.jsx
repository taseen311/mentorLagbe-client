
import Link from "next/link";
import {
    Search,
    UserPlus,
    GraduationCap,
    ArrowRight,
    FileText,
    CheckCircle2,
} from "lucide-react";

const studentSteps = [
    {
        number: "01",
        icon: Search,
        title: "Find Your Tutor",
        description:
            "Browse tuition opportunities and find the right match for your learning needs.",
    },
    {
        number: "02",
        icon: FileText,
        title: "Apply for Tuition",
        description:
            "Choose your preferred tuition and submit your application in just a few clicks.",
    },
    {
        number: "03",
        icon: CheckCircle2,
        title: "Start Learning",
        description:
            "Connect with your tutor and take the next step toward your academic goals.",
    },
];

const tutorSteps = [
    {
        number: "01",
        icon: UserPlus,
        title: "Create Your Profile",
        description:
            "Sign up and showcase your educational background and teaching experience.",
    },
    {
        number: "02",
        icon: GraduationCap,
        title: "Post Tuition",
        description:
            "Create tuition opportunities and wait for admin approval before publishing.",
    },
    {
        number: "03",
        icon: CheckCircle2,
        title: "Connect with Students",
        description:
            "Review applications, choose suitable students and start teaching.",
    },
];

function StepCard({ step }) {
    const Icon = step.icon;

    return (
        <div className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60">
            <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors duration-300 group-hover:bg-teal-500 group-hover:text-white">
                    <Icon size={23} />
                </div>

                <span className="text-3xl font-extrabold tracking-tight text-slate-100 transition-colors group-hover:text-teal-100">
                    {step.number}
                </span>
            </div>

            <h3 className="mt-6 text-lg font-bold text-slate-900">
                {step.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
                {step.description}
            </p>

            <div className="mt-5 h-1 w-10 rounded-full bg-teal-400 transition-all duration-300 group-hover:w-16" />
        </div>
    );
}

function ProcessColumn({ title, subtitle, steps, type }) {
    return (
        <div>
            <div className="mb-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-bold text-teal-700">
                    {type === "student" ? (
                        <Search size={14} />
                    ) : (
                        <GraduationCap size={15} />
                    )}
                    {title}
                </span>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    {subtitle}
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {steps.map((step) => (
                    <StepCard key={step.number} step={step} />
                ))}
            </div>
        </div>
    );
}

export default function HowItWorks() {
    return (
        <section className="bg-slate-50 px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-600">
                        Simple Process
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                        How Does{" "}
                        <span className="text-teal-600">
                            MentorLagbe
                        </span>{" "}
                        Work?
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        Whether you want to learn or teach, getting started is simple.
                        Follow these easy steps and make your next move.
                    </p>
                </div>

                {/* Student & Tutor Process */}
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
                    <ProcessColumn
                        title="For Students"
                        subtitle="Find the right tutor and achieve your learning goals."
                        steps={studentSteps}
                        type="student"
                    />

                    <ProcessColumn
                        title="For Tutors"
                        subtitle="Share your knowledge and discover teaching opportunities."
                        steps={tutorSteps}
                        type="tutor"
                    />
                </div>

                {/* Bottom CTA */}
                <div className="relative mt-14 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 px-7 py-9 shadow-lg sm:px-10">
                    <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

                    <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
                        <div>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                                Ready to get started?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-300">
                                Join MentorLagbe and make learning more accessible.
                            </p>
                        </div>

                        <Link
                            href="/register"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-teal-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-500/20"
                        >
                            Join MentorLagbe
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
