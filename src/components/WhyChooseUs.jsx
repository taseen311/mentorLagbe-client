
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
    },
    {
        icon: Users,
        title: "Easy Connections",
        description:
            "Connect students and tutors through a simple and organized application system.",
    },
    {
        icon: Zap,
        title: "Simple Experience",
        description:
            "Find tuition opportunities and manage your activities without unnecessary hassle.",
    },
    {
        icon: Wallet,
        title: "Flexible Plans",
        description:
            "Choose a plan that fits your needs, with free and Pro membership options.",
    },
    {
        icon: Clock,
        title: "Save Your Time",
        description:
            "Explore relevant tuition opportunities and apply without searching everywhere.",
    },
    {
        icon: Headset,
        title: "Dedicated Support",
        description:
            "Get help when you need assistance navigating your learning journey.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-700">
                        Why MentorLagbe
                    </span>

                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        A Better Way to{" "}
                        <span className="text-teal-600">
                            Learn & Teach
                        </span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        We make finding tutors and discovering teaching opportunities
                        easier with a platform designed for both students and tutors.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.title}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
                            >
                                {/* Decorative Number */}
                                <span className="absolute right-6 top-5 text-4xl font-black text-slate-100 transition-colors duration-300 group-hover:text-teal-50">
                                    0{index + 1}
                                </span>

                                {/* Icon */}
                                <div className="relative flex h-13 w-13 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-600/20">
                                    <Icon size={24} strokeWidth={1.8} />
                                </div>

                                {/* Content */}
                                <h3 className="mt-6 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
                                    {benefit.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500">
                                    {benefit.description}
                                </p>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-7 right-7 h-0.5 origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
