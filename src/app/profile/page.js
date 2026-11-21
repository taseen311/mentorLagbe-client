
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
    console.log("Current User:", user);

    // Use the edited name, or fall back to the current profile name
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
        return <p className="p-10 text-center">Loading profile...</p>;
    }

    if (!session) {
        return <p className="p-10 text-center">Please login to view your profile.</p>;
    }

    return (
        <main className="mx-auto max-w-3xl px-5 py-12">
            <h1 className="text-3xl font-bold text-slate-900">
                My Profile
            </h1>

            <div className="mt-6 rounded-xl border border-slate-200 p-6">
                <div className="mb-6 space-y-2">
                    <p className="text-slate-700">
                        <span className="font-semibold">Email:</span>{" "}
                        {user.email}
                    </p>

                    <p className="text-slate-700">
                        <span className="font-semibold">Role:</span>{" "}
                        <span className="capitalize">{user.role}</span>
                    </p>
                    <p>Profile Image: {user.image || "No image saved"}</p>
                </div>

                <form onSubmit={handleUpdateProfile}>
                    <ImageUpload
                        onImageUpload={setImage}
                        currentImage={user.image}
                    />
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
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </main>
    );
}
