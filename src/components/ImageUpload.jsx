
"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import {
    Image as ImageIcon,
    Upload,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

export default function ImageUpload({
    onImageUpload,
    currentImage,
    label = "Profile Picture",
}) {
    const inputId = useId();

    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // useEffect(() => {
    //     setPreview(currentImage || "");
    // }, [currentImage]);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setError("");
        setSuccess("");

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5MB.");
            e.target.value = "";
            return;
        }

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
            setError("Image upload configuration is missing.");
            e.target.value = "";
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error?.message || "Image upload failed."
                );
            }

            const imageUrl = result.data.display_url;

            setPreview(imageUrl);
            onImageUpload(imageUrl);
            setSuccess("Profile picture uploaded successfully!");

            e.target.value = "";
        } catch (error) {
            console.error("Image Upload Error:", error);
            setError(error.message || "Something went wrong. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label
                htmlFor={inputId}
                className="block text-sm font-bold text-slate-800"
            >
                {label}
            </label>

            <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
                {/* Image Preview */}
                <div className="flex shrink-0 justify-center sm:justify-start">
                    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-teal-50 shadow-md ring-1 ring-slate-200">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Profile picture preview"
                                fill
                                sizes="112px"
                                className="object-cover"
                            />
                        ) : (
                            <ImageIcon
                                size={36}
                                className="text-teal-600"
                            />
                        )}
                    </div>
                </div>

                {/* Upload Controls */}
                <div className="min-w-0 flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-slate-900">
                        Upload your picture
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        Choose a clear profile photo to help others recognize you.
                    </p>

                    <div className="mt-4">
                        <input
                            id={inputId}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="sr-only"
                        />

                        <label
                            htmlFor={inputId}
                            className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${uploading
                                ? "cursor-not-allowed bg-slate-300 text-slate-500"
                                : "bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/15"
                                }`}
                        >
                            {uploading ? (
                                <>
                                    <LoaderCircle
                                        size={17}
                                        className="animate-spin"
                                    />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={17} />
                                    {preview ? "Change Photo" : "Choose Photo"}
                                </>
                            )}
                        </label>
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                        JPG, PNG or other image formats · Maximum 5MB
                    </p>
                </div>
            </div>

            {/* Upload Status */}
            {uploading && (
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-teal-500" />
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-700">
                    <CheckCircle2 size={18} />
                    {success}
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}
        </div>
    );
}

