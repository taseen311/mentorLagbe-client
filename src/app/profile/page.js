
"use client";

import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = session?.user;

    const displayName = name ?? user?.name ?? "";

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!displayName.trim()) {
            alert("Name cannot be empty!");
            return;
        }

        try {
            setLoading(true);

            const updateData = {
                name: displayName.trim(),
            };

            if (image) {
                updateData.image = image;
            }

            const { error } = await authClient.updateUser(updateData);

            if (error) {
                alert(error.message || "Profile update failed!");
                return;
            }

            setName(displayName.trim());
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Profile Update Error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
                    <p className="font-medium text-slate-500">
                        Loading your profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-5">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl">
                        👤
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Login Required
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Please login to access and manage your profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-12 md:py-16">
            <div className="mx-auto max-w-4xl">

                {/* Page Header */}
                <div className="mb-10">
                    <span className="inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                        Account Settings
                    </span>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-3 max-w-xl leading-7 text-slate-500">
                        Manage your personal information and keep your
                        MentorLagbe account up to date.
                    </p>
                </div>

                {/* Profile Overview */}
                <div className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-2 bg-teal-600" />

                    <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold uppercase text-white">
                                {user.name?.charAt(0) || "U"}
                            </div>

                            <div className="min-w-0">
                                <h2 className="truncate text-xl font-bold text-slate-900">
                                    {user.name || "User"}
                                </h2>

                                <p className="mt-1 break-all text-sm text-slate-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <span className="w-fit rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold capitalize text-teal-700">
                            {user.role}
                        </span>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-8 border-b border-slate-100 pb-6">
                        <h2 className="text-xl font-bold text-slate-900">
                            Personal Information
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Update your profile details and profile picture.
                        </p>
                    </div>

                    <form onSubmit={handleUpdateProfile}>
                        {/* Profile Image */}
                        <div className="mb-8">
                            <label className="mb-3 block text-sm font-semibold text-slate-700">
                                Profile Picture
                            </label>

                            <ImageUpload
                                onImageUpload={setImage}
                                currentImage={user.image}
                            />

                            <p className="mt-3 text-xs text-slate-400">
                                Upload a clear image to personalize your account.
                            </p>
                        </div>

                        {/* Full Name */}
                        <div className="mb-7">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={displayName}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-7">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={user.email || ""}
                                readOnly
                                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-slate-500 outline-none"
                            />

                            <p className="mt-2 text-xs text-slate-400">
                                Your registered email address.
                            </p>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs leading-5 text-slate-400">
                                Make sure your information is correct before saving.
                            </p>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-teal-100 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Note */}
                <p className="mt-6 text-center text-sm text-slate-400">
                    Your profile information helps students and tutors
                    connect with you on MentorLagbe.
                </p>
            </div>
        </main>
    );
}

