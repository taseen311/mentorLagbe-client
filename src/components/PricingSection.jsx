
import Link from "next/link";
import { Check, Crown, ArrowRight } from "lucide-react";

const plans = [
    {
        name: "Free Plan",
        audience: "For Students & Tutors",
        price: "৳0",
        period: "Forever free",
        description: "Get started with the essential features.",
        features: [
            "Browse tuition opportunities",
            "Apply for available tuitions",
            "Create up to 2 tuition posts (Tutors)",
            "Basic profile management",
        ],
        popular: false,
    },
    {
        name: "Pro Plan",
        audience: "For Students & Tutors",
        price: "From $10",
        period: "Subscription based",
        description: "Unlock more opportunities with premium access.",
        features: [
            "Everything in Free Plan",
            "Unlimited tuition posts (Tutors)",
            "Premium membership badge",
            "Enhanced learning opportunities",
        ],
        popular: true,
    },
];

export default function PricingSection() {
    return (
        <section className="bg-slate-50 px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-600">
                        Simple Pricing
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                        Choose the Right{" "}
                        <span className="text-teal-600">Plan</span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        Start for free and upgrade whenever you need more flexibility
                        and opportunities.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="mx-auto grid max-w-4xl gap-7 md:grid-cols-2 md:items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-9 ${plan.popular
                                    ? "border-teal-500/40 bg-slate-950 text-white shadow-2xl shadow-slate-300/50"
                                    : "border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-xl hover:shadow-slate-200/60"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <span className="absolute -top-3 right-7 inline-flex items-center gap-1.5 rounded-full bg-teal-400 px-4 py-1.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-teal-500/20">
                                    <Crown size={14} />
                                    Most Popular
                                </span>
                            )}

                            <p
                                className={`text-sm font-bold ${plan.popular ? "text-teal-400" : "text-teal-700"
                                    }`}
                            >
                                {plan.audience}
                            </p>

                            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
                                {plan.name}
                            </h3>

                            <p
                                className={`mt-3 text-sm leading-6 ${plan.popular ? "text-slate-400" : "text-slate-500"
                                    }`}
                            >
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mt-7 flex flex-wrap items-baseline gap-2">
                                <span className="text-4xl font-extrabold tracking-tight">
                                    {plan.price}
                                </span>

                                <span
                                    className={`text-sm ${plan.popular ? "text-slate-400" : "text-slate-500"
                                        }`}
                                >
                                    / {plan.period}
                                </span>
                            </div>

                            <div
                                className={`my-7 border-t ${plan.popular ? "border-slate-800" : "border-slate-100"
                                    }`}
                            />

                            <p className="mb-5 text-sm font-bold">
                                What&apos;s included:
                            </p>

                            {/* Features */}
                            <ul className="flex-1 space-y-4">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-start gap-3 text-sm"
                                    >
                                        <span
                                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${plan.popular
                                                    ? "bg-teal-400/15 text-teal-400"
                                                    : "bg-teal-50 text-teal-600"
                                                }`}
                                        >
                                            <Check size={13} strokeWidth={3} />
                                        </span>

                                        <span
                                            className={
                                                plan.popular
                                                    ? "leading-6 text-slate-300"
                                                    : "leading-6 text-slate-600"
                                            }
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href="/pricing"
                                className={`group mt-9 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all duration-300 ${plan.popular
                                        ? "bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/10 hover:-translate-y-0.5 hover:bg-teal-300 hover:shadow-teal-500/20"
                                        : "border border-teal-100 bg-teal-50 text-teal-800 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-100"
                                    }`}
                            >
                                Explore Plan
                                <ArrowRight
                                    size={17}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

