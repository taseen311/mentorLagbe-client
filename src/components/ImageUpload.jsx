
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUpload({ onImageUpload, currentImage }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || "");

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file!");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB!");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("image", file);

            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error?.message || "Image upload failed!");
            }

            const imageUrl = result.data.display_url;

            setPreview(imageUrl);
            onImageUpload(imageUrl);

            alert("Image uploaded successfully!");
        } catch (error) {
            console.error("Image Upload Error:", error);
            alert(error.message || "Something went wrong!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
                Profile Picture
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full rounded-lg border border-slate-300 p-3"
            />

            {uploading && <p>Uploading image...</p>}

            {preview && (
                <Image
                    height={50}
                    width={50}
                    src={preview}
                    alt="Uploaded preview"
                    className="h-24 w-24 rounded-full object-cover"
                />
            )}
        </div>
    );
}
