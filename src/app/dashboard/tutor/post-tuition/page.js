
"use client";

import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function PostTuitionPage() {
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        classLevel: "",
        mode: "Online",
        monthlyFee: "",
        daysPerWeek: "",
        description: "",
    });

    const [bannerImage, setBannerImage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Tuition Data:", {
            ...formData,
            bannerImage,
        });

        alert("Form data collected! API connection is next.");
    };

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-10">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold text-slate-900">
                    Post a Tuition
                </h1>

                <p className="mt-2 text-slate-500">
                    Provide tuition details to find your students.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
                >
                    <ImageUpload
                        onImageUpload={setBannerImage}
                        label="Tuition Banner Image"
                    />

                    <div>
                        <label className="mb-2 block font-semibold">
                            Tuition Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Need a Math Tutor for Class 8"
                            className="w-full rounded-lg border p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Subject
                        </label>
                        <input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="e.g. Mathematics"
                            className="w-full rounded-lg border p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Class Level
                        </label>
                        <input
                            name="classLevel"
                            value={formData.classLevel}
                            onChange={handleChange}
                            placeholder="e.g. Class 8"
                            className="w-full rounded-lg border p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Tuition Mode
                        </label>
                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Monthly Fee (BDT)
                        </label>
                        <input
                            type="number"
                            name="monthlyFee"
                            value={formData.monthlyFee}
                            onChange={handleChange}
                            placeholder="e.g. 5000"
                            min="1"
                            className="w-full rounded-lg border p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Days Per Week
                        </label>
                        <input
                            type="number"
                            name="daysPerWeek"
                            value={formData.daysPerWeek}
                            onChange={handleChange}
                            placeholder="e.g. 5"
                            min="1"
                            max="7"
                            className="w-full rounded-lg border p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold">
                            Tuition Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the tuition requirements..."
                            rows={4}
                            className="w-full rounded-lg border p-3"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Submit Tuition
                    </button>
                </form>
            </div>
        </main>
    );
}
