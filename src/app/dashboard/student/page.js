
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function StudentDashboard() {
    const { data: session, isPending } = authClient.useSession();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending) return;

        if (!session || session.user.role !== "student") {
            return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const fetchApplications = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/applications/my-applications`,
                    {
                        cache: "no-store",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load applications"
                    );
                }

                setApplications(data);
            } catch (error) {
                console.error("Applications Fetch Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [session, isPending]);

    if (isPending || loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="font-semibold text-slate-600">
                    Loading your dashboard...
                </p>
            </div>
        );
    }

    if (!session || session.user.role !== "student") {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
                <h2 className="text-2xl font-bold text-slate-800">
                    Access Denied
                </h2>
                <p className="mt-2 text-slate-500">
                    Please login with a student account.
                </p>
                <Link
                    href="/login"
                    className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
                >
                    Login
                </Link>
            </div>
        );
    }

    const pendingCount = applications.filter(
        (application) => application.status === "pending"
    ).length;

    const acceptedCount = applications.filter(
        (application) => application.status === "accepted"
    ).length;

    const rejectedCount = applications.filter(
        (application) => application.status === "rejected"
    ).length;

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-12 sm:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Welcome */}
                <div className="mb-8">
                    <p className="font-semibold text-blue-600">
                        STUDENT DASHBOARD
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
                        Welcome, {session.user.name}!
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Track your tuition applications and their progress.
                    </p>
                </div>

                {/* Statistics */}
                <div className="mb-10 grid gap-5 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Total Applications
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                            {applications.length}
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Pending
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold text-amber-500">
                            {pendingCount}
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Accepted
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold text-emerald-600">
                            {acceptedCount}
                        </h2>
                    </div>
                </div>

                {/* Applications */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold text-slate-900">
                        My Applications
                    </h2>

                    <Link
                        href="/tuitions"
                        className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Browse Tuitions
                    </Link>
                </div>

                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                        {error}
                    </div>
                ) : applications.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                        <div className="text-5xl">📚</div>

                        <h3 className="mt-4 text-xl font-bold text-slate-800">
                            No Applications Yet
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Explore available tuitions and apply for your
                            preferred opportunity.
                        </p>

                        <Link
                            href="/tuitions"
                            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Explore Tuitions
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {applications.map((application) => (
                            <div
                                key={application._id}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {application.tuitionTitle}
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Tutor: {application.tutorEmail}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Applied on:{" "}
                                            {new Date(
                                                application.appliedAt
                                            ).toLocaleDateString("en-BD")}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${application.status === "accepted"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : application.status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-amber-100 text-amber-700"
                                            }`}
                                    >
                                        {application.status}
                                    </span>
                                </div>

                                <div className="mt-5 border-t border-slate-100 pt-4">
                                    <Link
                                        href={`/tuitions/${application.tuitionId}`}
                                        className="font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        View Tuition Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {rejectedCount > 0 && (
                    <p className="mt-5 text-sm text-slate-500">
                        You have {rejectedCount} rejected application(s).
                    </p>
                )}
            </div>
        </main>
    );
}
