
import {
    ShieldCheck,
    Users,
    Zap,
    Wallet,
    Clock,
    Headset,
} from "lucide-react";

const benefits = [
    {
        icon: ShieldCheck,
        title: "Trusted & Verified",
        description:
            "Tuition posts go through an admin approval process to maintain a trusted platform.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: Users,
        title: "Easy Connections",
        description:
            "Connect students and tutors through a simple and organized application system.",
        color: "bg-violet-50 text-violet-600",
    },
    {
        icon: Zap,
        title: "Simple Experience",
        description:
            "Find tuition opportunities and manage your activities without unnecessary hassle.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: Wallet,
        title: "Flexible Plans",
        description:
            "Choose a plan that fits your needs, with free and Pro membership options.",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: Clock,
        title: "Save Your Time",
        description:
            "Explore relevant tuition opportunities and apply without searching everywhere.",
        color: "bg-rose-50 text-rose-600",
    },
    {
        icon: Headset,
        title: "Dedicated Support",
        description:
            "Get help when you need assistance navigating your learning journey.",
        color: "bg-cyan-50 text-cyan-600",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-slate-50 px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                        Why MentorLagbe
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        A Better Way to <span className="text-blue-600">Learn & Teach</span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        We make finding tutors and discovering teaching opportunities
                        easier with a platform designed for both students and tutors.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.title}
                                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40"
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${benefit.color} transition duration-300 group-hover:scale-110`}
                                >
                                    <Icon size={24} />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-slate-900">
                                    {benefit.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
