
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/jwt";

const plans = [
    {
        role: "student",
        label: "For Students",
        name: "Student Pro",
        price: "10",
        description:
            "Find the right tutor and take your learning journey further.",
        features: [
            "Apply for tuition opportunities",
            "Access to Student Pro membership",
            "Better learning opportunities",
            "Monthly subscription",
        ],
        button: "Upgrade as Student",
        popular: false,
    },
    {
        role: "tutor",
        label: "For Tutors",
        name: "Tutor Pro",
        price: "15",
        description:
            "Grow your tutoring career and connect with more students.",
        features: [
            "Unlimited tuition posts",
            "Access to Tutor Pro membership",
            "Reach more potential students",
            "Monthly subscription",
        ],
        button: "Upgrade as Tutor",
        popular: true,
    },
];

export default function PricingPage() {
    const { data: session, isPending } = authClient.useSession();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async (planRole) => {
        if (!session?.user) {
            alert("Please login first to upgrade your plan.");
            return;
        }

        if (session.user.role !== planRole) {
            alert(`This plan is only available for ${planRole}s.`);
            return;
        }

        try {
            setLoading(true);

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const response = await fetch(
                `${apiUrl}/api/payments/create-checkout-session`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: getAuthHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Payment failed to start");
            }

            if (data.url) {
                window.location.assign(data.url);
            } else {
                throw new Error("Checkout URL not found");
            }
        } catch (error) {
            console.error("Upgrade Error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-20 text-slate-900">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                        Simple & Transparent Pricing
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Invest in Your{" "}
                        <span className="text-teal-600">Growth.</span>
                    </h1>

                    <p className="mt-5 text-base leading-7 text-slate-500 md:text-lg">
                        Get more out of MentorLagbe with a plan designed
                        around your goals. Choose your role and unlock
                        your next opportunity.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.role}
                            className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10 ${plan.popular
                                    ? "border-teal-500 shadow-lg shadow-teal-100"
                                    : "border-slate-200"
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-4 right-8 rounded-full bg-teal-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                                    Recommended
                                </span>
                            )}

                            {/* Plan Info */}
                            <div>
                                <span
                                    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${plan.popular
                                            ? "bg-teal-50 text-teal-700"
                                            : "bg-slate-100 text-slate-600"
                                        }`}
                                >
                                    {plan.label}
                                </span>

                                <h2 className="mt-6 text-3xl font-bold text-slate-900">
                                    {plan.name}
                                </h2>

                                <p className="mt-3 min-h-14 leading-7 text-slate-500">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="my-8 border-b border-slate-100 pb-8">
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                                        ${plan.price}
                                    </span>

                                    <span className="mb-2 text-sm font-medium text-slate-400">
                                        / month
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-slate-400">
                                    Billed monthly
                                </p>
                            </div>

                            {/* Features */}
                            <div className="flex-1">
                                <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-700">
                                    Whats included
                                </h3>

                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-600">
                                                ✓
                                            </span>

                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => handleUpgrade(plan.role)}
                                disabled={loading || isPending}
                                className={`mt-10 w-full rounded-xl px-6 py-4 font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${plan.popular
                                        ? "bg-teal-600 text-white shadow-lg shadow-teal-100 hover:bg-teal-700"
                                        : "bg-slate-900 text-white hover:bg-slate-800"
                                    }`}
                            >
                                {loading
                                    ? "Please wait..."
                                    : plan.button}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3 4.5 6v5.5c0 4.6 3.2 7.7 7.5 9.5 4.3-1.8 7.5-4.9 7.5-9.5V6L12 3Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9 12 2 2 4-4"
                            />
                        </svg>
                    </span>

                    <p className="text-sm text-slate-500">
                        Secure payments powered by Stripe. Cancel your
                        subscription anytime.
                    </p>
                </div>
            </div>
        </main>
    );
}

