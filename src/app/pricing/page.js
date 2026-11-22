
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

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

            const response = await fetch(
                "http://localhost:5000/api/payments/create-checkout-session",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Payment failed to start");
            }

            if (data.url) {
                window.location.href = data.url;
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
        <main className="min-h-screen bg-slate-950 px-5 py-20 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-indigo-400">
                        Simple & Transparent Pricing
                    </p>

                    <h1 className="text-4xl font-bold md:text-5xl">
                        Choose Your <span className="text-indigo-400">Pro Plan</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-slate-400">
                        Unlock more opportunities with MentorLagbe Pro.
                        Choose the plan that matches your role.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Student Plan */}
                    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
                        <div className="mb-6">
                            <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
                                Student Plan
                            </span>

                            <h2 className="mt-6 text-3xl font-bold">
                                Student Pro
                            </h2>

                            <p className="mt-3 text-slate-400">
                                Find the right tutor and improve your learning journey.
                            </p>
                        </div>

                        <div className="mb-8">
                            <span className="text-5xl font-bold">$10</span>
                            <span className="text-slate-400"> / month</span>
                        </div>

                        <ul className="mb-10 space-y-4 text-slate-300">
                            <li>✓ Apply for tuition opportunities</li>
                            <li>✓ Access to student Pro membership</li>
                            <li>✓ Better learning opportunities</li>
                            <li>✓ Monthly subscription</li>
                        </ul>

                        <button
                            onClick={() => handleUpgrade("student")}
                            disabled={loading || isPending}
                            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Please wait..." : "Upgrade as Student"}
                        </button>
                    </div>

                    {/* Tutor Plan */}
                    <div className="relative rounded-3xl border border-indigo-500 bg-slate-900 p-8 shadow-xl shadow-indigo-950/40">
                        <span className="absolute -top-4 right-8 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold">
                            Recommended
                        </span>

                        <div className="mb-6">
                            <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400">
                                Tutor Plan
                            </span>

                            <h2 className="mt-6 text-3xl font-bold">
                                Tutor Pro
                            </h2>

                            <p className="mt-3 text-slate-400">
                                Grow your tutoring career and reach more students.
                            </p>
                        </div>

                        <div className="mb-8">
                            <span className="text-5xl font-bold">$15</span>
                            <span className="text-slate-400"> / month</span>
                        </div>

                        <ul className="mb-10 space-y-4 text-slate-300">
                            <li>✓ Unlimited tuition posts</li>
                            <li>✓ Access to tutor Pro membership</li>
                            <li>✓ Reach more potential students</li>
                            <li>✓ Monthly subscription</li>
                        </ul>

                        <button
                            onClick={() => handleUpgrade("tutor")}
                            disabled={loading || isPending}
                            className="w-full rounded-xl bg-indigo-600 px-6 py-4 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Please wait..." : "Upgrade as Tutor"}
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-slate-500">
                    Secure payments powered by Stripe. Cancel your subscription anytime.
                </p>
            </div>
        </main>
    );
}
