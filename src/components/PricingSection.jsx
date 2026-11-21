
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
        <section className="bg-white px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                        Simple Pricing
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Choose the Right <span className="text-blue-600">Plan</span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        Start for free and upgrade whenever you need more flexibility
                        and opportunities.
                    </p>
                </div>

                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-3xl border p-7 sm:p-9 ${plan.popular
                                    ? "border-blue-500 bg-slate-900 text-white shadow-2xl shadow-blue-200/40"
                                    : "border-slate-200 bg-white text-slate-900 shadow-sm"
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 right-7 inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white">
                                    <Crown size={14} /> Most Popular
                                </span>
                            )}

                            <p
                                className={`text-sm font-bold ${plan.popular ? "text-blue-300" : "text-blue-600"
                                    }`}
                            >
                                {plan.audience}
                            </p>

                            <h3 className="mt-3 text-2xl font-extrabold">{plan.name}</h3>

                            <p
                                className={`mt-3 text-sm ${plan.popular ? "text-slate-300" : "text-slate-500"
                                    }`}
                            >
                                {plan.description}
                            </p>

                            <div className="mt-7 flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold">{plan.price}</span>
                                <span
                                    className={`text-sm ${plan.popular ? "text-slate-400" : "text-slate-500"
                                        }`}
                                >
                                    / {plan.period}
                                </span>
                            </div>

                            <div
                                className={`my-7 border-t ${plan.popular ? "border-slate-700" : "border-slate-100"
                                    }`}
                            />

                            <p className="mb-5 text-sm font-bold">Whats included:</p>

                            <ul className="space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <Check
                                            size={18}
                                            className="shrink-0 text-emerald-500"
                                        />
                                        <span
                                            className={
                                                plan.popular ? "text-slate-200" : "text-slate-600"
                                            }
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/pricing"
                                className={`mt-9 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${plan.popular
                                        ? "bg-blue-600 text-white hover:bg-blue-500"
                                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                    }`}
                            >
                                Explore Plan <ArrowRight size={17} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
