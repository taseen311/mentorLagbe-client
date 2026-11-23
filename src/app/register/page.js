
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { syncJWT } from "@/lib/jwt";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data, error } = await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            if (error) {
                console.error("Registration Error:", error);
                alert(error.message);
                return;
            }

            console.log("Registration Successful:", data);

            await syncJWT(formData.email);

            alert("Account created successfully! Welcome to MentorLagbe.");

            if (formData.role === "tutor") {
                router.replace("/dashboard/tutor");
            } else {
                router.replace("/dashboard/student");
            }

            router.refresh();
        } catch (error) {
            console.error("Registration Failed:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-2xl font-extrabold text-white shadow-lg shadow-teal-100">
                        M
                    </div>

                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
                        Join MentorLagbe
                    </p>

                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                        Create Your Account
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Start connecting, learning and growing with
                        the right people.
                    </p>
                </div>

                {/* Registration Card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                            />

                            <p className="mt-2 text-xs text-slate-400">
                                Use at least 8 characters for your password.
                            </p>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label
                                htmlFor="role"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                I want to join as
                            </label>

                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                            >
                                <option value="student">
                                    Student — Find the right tutor
                                </option>

                                <option value="tutor">
                                    Tutor — Teach and grow your career
                                </option>
                            </select>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-4 font-bold text-white shadow-lg shadow-teal-100 transition duration-200 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                        <p className="text-sm text-slate-500">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="font-bold text-teal-700 transition hover:text-teal-800 hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>

                <p className="mt-7 text-center text-xs text-slate-400">
                    By joining MentorLagbe, you are taking the first step
                    toward new opportunities.
                </p>
            </div>
        </main>
    );
}
