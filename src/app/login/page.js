"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

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
            const role = data?.user?.role;

            if (role === "student") {
                router.push("/dashboard/student");
            } else if (role === "tutor") {
                router.push("/dashboard/tutor");
            } else if (role === "admin") {
                router.push("/dashboard/admin");
            } else {
                alert("User role not found!");
            }
            console.log("User Role:", data?.user?.role);
            alert("Login successful!");

        } catch (error) {
            console.error("Login Failed:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Welcome Back!
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to continue your MentorLagbe journey.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Dont have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Create Account
                    </Link>
                </p>

            </div>
        </main>
    );
}