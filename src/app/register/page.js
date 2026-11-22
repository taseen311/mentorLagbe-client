
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

            alert("Account created successfully! Welcome to MentorLagbe.");

            // Redirect according to user role
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
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Join MentorLagbe and start your journey.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

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
                            minLength={8}
                            placeholder="At least 8 characters"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            I want to join as
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>
            </div>
        </main>
    );
}
