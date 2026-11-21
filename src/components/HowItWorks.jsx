
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

function StepCard({ step, index }) {
    const Icon = step.icon;

    return (
        <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={23} />
                </div>

                <span className="text-3xl font-extrabold text-slate-100">
                    {step.number}
                </span>
            </div>

            <h3 className="mt-6 text-lg font-bold text-slate-900">
                {step.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
                {step.description}
            </p>
        </div>
    );
}

function ProcessColumn({ title, subtitle, steps, type }) {
    return (
        <div>
            <div className="mb-7">
                <span
                    className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${type === "student"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-violet-50 text-violet-600"
                        }`}
                >
                    {title}
                </span>

                <p className="mt-3 text-sm text-slate-500">{subtitle}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {steps.map((step, index) => (
                    <StepCard key={step.number} step={step} index={index} />
                ))}
            </div>
        </div>
    );
}

export default function HowItWorks() {
    return (
        <section className="bg-white px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                        Simple Process
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        How Does <span className="text-blue-600">MentorLagbe</span> Work?
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        Whether you want to learn or teach, getting started is simple.
                        Follow these easy steps and make your next move.
                    </p>
                </div>

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

                <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl bg-slate-900 px-7 py-9 text-center sm:flex-row sm:text-left">
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Ready to get started?
                        </h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Join MentorLagbe and make learning more accessible.
                        </p>
                    </div>

                    <Link
                        href="/register"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                    >
                        Join MentorLagbe <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
