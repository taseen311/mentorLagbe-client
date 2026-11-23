
"use client";

import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/jwt";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function PostTuitionPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        classLevel: "",
        location: "",
        mode: "Online",
        monthlyFee: "",
        daysPerWeek: "",
        description: "",
    });

    const [bannerImage, setBannerImage] = useState("");
    const [loading, setLoading] = useState(false);

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10";

    const labelClass =
        "mb-2.5 block text-sm font-bold text-slate-700";

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isPending) return;

        if (!user) {
            alert("Please login first!");
            return;
        }

        if (user.role !== "tutor") {
            alert("Only tutors can post tuition!");
            return;
        }

        try {
            setLoading(true);

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const response = await fetch(`${apiUrl}/api/tuitions`, {
                method: "POST",
                credentials: "include",
                headers: getAuthHeaders({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    ...formData,
                    monthlyFee: Number(formData.monthlyFee),
                    daysPerWeek: Number(formData.daysPerWeek),
                    bannerImage,
                    tutorName: user.name,
                    tutorEmail: user.email,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create tuition");
            }

            alert("Tuition posted successfully! Waiting for admin approval.");

            console.log("Created Tuition:", result);

            setFormData({
                title: "",
                subject: "",
                classLevel: "",
                location: "",
                mode: "Online",
                monthlyFee: "",
                daysPerWeek: "",
                description: "",
            });

            setBannerImage("");
        } catch (error) {
            console.error("Post Tuition Error:", error);
            alert(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#f4f7fb]">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                        Checking your account...
                    </p>
                </div>
            </div>
        );
    }

    if (!user || user.role !== "tutor") {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f7fb] px-5 py-12">
                <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-9 text-center shadow-sm">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-4xl">
                        {user ? "🔒" : "👋"}
                    </div>

                    <h1 className="mt-6 text-2xl font-extrabold text-[#10243a]">
                        {user ? "Tutor Access Only" : "Welcome to MentorLagbe"}
                    </h1>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                        {user
                            ? "Only registered tutors can post tuition opportunities. Please use a tutor account to continue."
                            : "Please sign in to your tutor account to create and publish a tuition listing."}
                    </p>

                    <a
                        href="/login"
                        className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#10243a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-700"
                    >
                        Sign In to Continue →
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f4f7fb] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto max-w-5xl">

                {/* Page Header */}
                <section className="relative mb-8 overflow-hidden rounded-[28px] bg-[#10243a] px-7 py-9 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-11">
                    <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/[0.04]" />
                    <div className="absolute -bottom-32 right-48 h-64 w-64 rounded-full bg-teal-400/[0.07] blur-2xl" />

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-bold tracking-wider text-teal-300">
                            <span className="h-2 w-2 rounded-full bg-teal-400" />
                            TUTOR OPPORTUNITY
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Post a Tuition
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                            Share your teaching requirements and connect with
                            students who are looking for the right tutor.
                        </p>
                    </div>
                </section>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm"
                >
                    <div className="border-b border-slate-100 px-6 py-6 sm:px-9">
                        <h2 className="text-xl font-extrabold text-[#10243a]">
                            Tuition Information
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Complete the details below to create your tuition listing.
                        </p>
                    </div>

                    <div className="space-y-9 p-6 sm:p-9">

                        {/* Banner Image */}
                        <section>
                            <div className="mb-4">
                                <h3 className="font-bold text-[#10243a]">
                                    Cover Image
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Add an attractive image to your tuition listing.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:p-6">
                                <ImageUpload
                                    onImageUpload={setBannerImage}
                                    label="Tuition Banner Image"
                                />
                            </div>
                        </section>

                        {/* Basic Information */}
                        <section>
                            <div className="mb-5">
                                <h3 className="font-bold text-[#10243a]">
                                    Basic Information
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Tell students what kind of tuition you are offering.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="title" className={labelClass}>
                                        Tuition Title <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Need a Math Tutor for Class 8"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className={labelClass}>
                                        Subject <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="e.g. Mathematics"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="classLevel" className={labelClass}>
                                        Class Level <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="classLevel"
                                        name="classLevel"
                                        value={formData.classLevel}
                                        onChange={handleChange}
                                        placeholder="e.g. Class 8"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Location & Schedule */}
                        <section>
                            <div className="mb-5">
                                <h3 className="font-bold text-[#10243a]">
                                    Location & Schedule
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Specify where and how the tuition will take place.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="location" className={labelClass}>
                                        Location <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Barisal, Bangladesh"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="mode" className={labelClass}>
                                        Tuition Mode
                                    </label>
                                    <select
                                        id="mode"
                                        name="mode"
                                        value={formData.mode}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="daysPerWeek" className={labelClass}>
                                        Days Per Week <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="daysPerWeek"
                                        type="number"
                                        name="daysPerWeek"
                                        value={formData.daysPerWeek}
                                        onChange={handleChange}
                                        placeholder="e.g. 5"
                                        min="1"
                                        max="7"
                                        className={inputClass}
                                        required
                                    />
                                    <p className="mt-2 text-xs text-slate-400">
                                        Choose between 1 and 7 days.
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="monthlyFee" className={labelClass}>
                                        Monthly Fee (BDT) <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                                            ৳
                                        </span>
                                        <input
                                            id="monthlyFee"
                                            type="number"
                                            name="monthlyFee"
                                            value={formData.monthlyFee}
                                            onChange={handleChange}
                                            placeholder="e.g. 5000"
                                            min="1"
                                            className={`${inputClass} pl-9`}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Description */}
                        <section>
                            <div className="mb-5">
                                <h3 className="font-bold text-[#10243a]">
                                    Tuition Description
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Describe the requirements and expectations in detail.
                                </p>
                            </div>

                            <label htmlFor="description" className={labelClass}>
                                Description <span className="text-rose-500">*</span>
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the tuition requirements, preferred teaching experience, student expectations, and other important details..."
                                rows={6}
                                className={`${inputClass} resize-y leading-7`}
                                required
                            />
                        </section>

                        {/* Submit */}
                        <section className="border-t border-slate-100 pt-7">
                            <div className="mb-5 flex items-start gap-3 rounded-xl bg-teal-50 p-4">
                                <span className="text-lg">ℹ️</span>
                                <p className="text-xs leading-6 text-teal-900">
                                    Your tuition listing will be submitted for
                                    admin approval. Once approved, students
                                    will be able to discover and apply for it.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10243a] px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-teal-700/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Submitting Tuition...
                                    </>
                                ) : (
                                    <>
                                        Publish Tuition
                                        <span className="text-lg">→</span>
                                    </>
                                )}
                            </button>

                            <p className="mt-4 text-center text-xs text-slate-400">
                                Please review your information before submitting.
                            </p>
                        </section>
                    </div>
                </form>

                <p className="mt-7 text-center text-xs text-slate-400">
                    MentorLagbe · Connecting tutors with students
                </p>
            </div>
        </main>
    );
}

