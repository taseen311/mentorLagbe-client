
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { syncJWT } from "@/lib/jwt";

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                console.error("Login Error:", error);
                alert(error.message);
                return;
            }

            console.log("Login Successful:", data);

            await syncJWT(formData.email);

            const role = data?.user?.role;

            if (role === "student") {
                router.push("/dashboard/student");
            } else if (role === "tutor") {
                router.push("/dashboard/tutor");
            } else if (role === "admin") {
                router.push("/dashboard/admin");
            } else {
                alert("User role not found!");
                return;
            }

            alert("Login successful!");
        } catch (error) {
            console.error("Login Failed:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f7fb] px-4 py-12 sm:px-6">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:grid-cols-2">

                {/* Left Side */}
                <div className="relative hidden flex-col justify-between overflow-hidden bg-[#10243a] p-12 text-white lg:flex">

                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-white/[0.04]" />
                    <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-[55px] border-teal-400/[0.08]" />

                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400 text-xl font-black text-[#10243a]">
                                M
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight">
                                Mentor<span className="text-teal-400">Lagbe</span>
                            </span>
                        </Link>
                    </div>

                    <div className="relative z-10 my-12">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-300">
                            <span className="h-2 w-2 rounded-full bg-teal-400" />
                            YOUR LEARNING JOURNEY STARTS HERE
                        </div>

                        <h2 className="max-w-md text-4xl font-extrabold leading-[1.2] tracking-tight xl:text-5xl">
                            Great learning begins with the right mentor.
                        </h2>

                        <p className="mt-6 max-w-sm text-base leading-8 text-slate-300">
                            Connect with dedicated tutors, discover new
                            opportunities, and take the next step toward
                            your academic goals.
                        </p>

                        <div className="mt-10 space-y-4">
                            {[
                                "Find tutors who match your goals",
                                "Learn with confidence and flexibility",
                                "Build a better future through learning",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-sm font-bold text-teal-300">
                                        ✓
                                    </span>
                                    <span className="text-sm text-slate-200">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 border-t border-white/10 pt-6 text-xs text-slate-400">
                        Empowering students. Connecting great mentors.
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-14">

                    <div className="w-full max-w-md">

                        <Link href="/" className="mb-10 inline-flex items-center gap-2 lg:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10243a] text-lg font-black text-teal-400">
                                M
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-[#10243a]">
                                Mentor<span className="text-teal-600">Lagbe</span>
                            </span>
                        </Link>

                        <div className="mb-9">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
                                Welcome Back
                            </p>

                            <h1 className="text-3xl font-extrabold tracking-tight text-[#10243a] sm:text-4xl">
                                Sign in to your account
                            </h1>

                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                Welcome back! Enter your credentials to
                                continue your MentorLagbe journey.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-bold text-slate-700"
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
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-bold text-slate-700"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-700 transition hover:text-teal-900"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10243a] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-teal-700/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                {loading ? "Signing In..." : "Sign In to Your Account"}
                                {!loading && <span className="text-lg">→</span>}
                            </button>

                        </form>

                        <div className="my-8 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-xs font-medium text-slate-400">
                                NEW TO MENTORLAGBE?
                            </span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <p className="text-center text-sm text-slate-500">
                            Dont have an account?{" "}
                            <Link
                                href="/register"
                                className="font-bold text-teal-700 transition hover:text-teal-900 hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>

                        <div className="mt-10 text-center text-xs text-slate-400">
                            © {new Date().getFullYear()} MentorLagbe. All rights reserved.
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
