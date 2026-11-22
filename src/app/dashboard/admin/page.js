
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminDashboard() {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const fetchPendingTuitions = async () => {
        try {
            const response = await fetch(
                `${apiUrl}/api/tuitions/pending`,
                { cache: "no-store" }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch pending tuitions");
            }

            const data = await response.json();
            setTuitions(data);
        } catch (error) {
            console.error("Fetch Pending Tuitions Error:", error);
            alert("Could not load pending tuitions!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadTuitions = async () => {
            await fetchPendingTuitions();
        };

        loadTuitions();
    }, []);

    const handleApproval = async (id, approvalStatus) => {
        try {
            setUpdatingId(id);

            const response = await fetch(
                `${apiUrl}/api/tuitions/${id}/approval`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ approvalStatus }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Approval failed");
            }

            alert(result.message);

            setTuitions((prev) =>
                prev.filter((tuition) => tuition._id !== id)
            );
        } catch (error) {
            console.error("Approval Error:", error);
            alert(error.message || "Something went wrong!");
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold text-slate-600">
                    Loading pending tuitions...
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <p className="mb-2 font-semibold text-indigo-600">
                        ADMIN PANEL
                    </p>

                    <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                        Tuition Management
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Review tutor submissions and manage their approval.
                    </p>
                </div>

                <div className="mb-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Pending Approval
                    </p>

                    <p className="mt-2 text-3xl font-bold text-indigo-600">
                        {tuitions.length}
                    </p>
                </div>

                {tuitions.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                        <div className="mb-4 text-5xl">🎉</div>

                        <h2 className="text-xl font-bold text-slate-800">
                            All caught up!
                        </h2>

                        <p className="mt-2 text-slate-500">
                            There are no pending tuition requests.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">

                        {tuitions.map((tuition) => (
                            <div
                                key={tuition._id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                            >
                                {tuition.bannerImage ? (
                                    <Image
                                        src={tuition.bannerImage}
                                        alt={tuition.title}
                                        width={800}
                                        height={400}
                                        className="h-52 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-40 items-center justify-center bg-indigo-50 text-5xl">
                                        📚
                                    </div>
                                )}

                                <div className="p-6">

                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <h2 className="text-xl font-bold text-slate-900">
                                            {tuition.title}
                                        </h2>

                                        <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                            Pending
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm text-slate-600">
                                        <p>
                                            <strong>Subject:</strong>{" "}
                                            {tuition.subject}
                                        </p>

                                        <p>
                                            <strong>Class:</strong>{" "}
                                            {tuition.classLevel}
                                        </p>

                                        <p>
                                            <strong>Mode:</strong>{" "}
                                            {tuition.mode}
                                        </p>

                                        <p>
                                            <strong>Location:</strong>{" "}
                                            {tuition.location}
                                        </p>

                                        <p>
                                            <strong>Monthly Fee:</strong>{" "}
                                            ৳{tuition.monthlyFee}
                                        </p>

                                        <p>
                                            <strong>Days per week:</strong>{" "}
                                            {tuition.daysPerWeek}
                                        </p>

                                        <p>
                                            <strong>Tutor:</strong>{" "}
                                            {tuition.tutorName}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {tuition.tutorEmail}
                                        </p>
                                    </div>

                                    <div className="mt-5 border-t border-slate-100 pt-4">
                                        <h3 className="mb-2 font-semibold text-slate-800">
                                            Description
                                        </h3>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {tuition.description}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button
                                            onClick={() =>
                                                handleApproval(
                                                    tuition._id,
                                                    "approved"
                                                )
                                            }
                                            disabled={updatingId === tuition._id}
                                            className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {updatingId === tuition._id
                                                ? "Processing..."
                                                : "Approve"}
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleApproval(
                                                    tuition._id,
                                                    "rejected"
                                                )
                                            }
                                            disabled={updatingId === tuition._id}
                                            className="flex-1 rounded-lg bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </main>
    );
}
