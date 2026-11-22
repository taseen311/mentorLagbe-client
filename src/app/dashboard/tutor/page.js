
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function TutorDashboard() {
    const { data: session, isPending } = authClient.useSession();

    const [applications, setApplications] = useState([]);
    const [myTuitions, setMyTuitions] = useState([]);
    const [tuitionLoading, setTuitionLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending || session?.user.role !== "tutor") return;

        const fetchApplications = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/applications/tutor-applications",
                    {
                        cache: "no-store",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load applications");
                }

                setApplications(data);
            } catch (error) {
                console.error("Applications Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [session, isPending]);

    useEffect(() => {
        if (isPending || session?.user.role !== "tutor") return;

        const fetchMyTuitions = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/tuitions/my-tuitions",
                    {
                        cache: "no-store",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load tuitions");
                }

                setMyTuitions(data);
            } catch (error) {
                console.error("My Tuitions Error:", error);
            } finally {
                setTuitionLoading(false);
            }
        };

        fetchMyTuitions();
    }, [session, isPending]);

    const handleStatusUpdate = async (id, status) => {
        try {
            setUpdatingId(id);

            const response = await fetch(
                `http://localhost:5000/api/applications/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update status");
            }

            setApplications((previousApplications) =>
                previousApplications.map((application) =>
                    application._id === id
                        ? { ...application, status }
                        : application
                )
            );

            alert(data.message);
        } catch (error) {
            alert(error.message);
        } finally {
            setUpdatingId(null);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading dashboard...
            </div>
        );
    }

    if (!session || session.user.role !== "tutor") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="font-semibold text-red-600">
                    Please login with a tutor account.
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-600">
                        Tutor Dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Welcome to MentorLagbe!
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage your tuition posts and connect with students.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">
                            Post a Tuition
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Create a new tuition post and find suitable students.
                        </p>

                        <Link
                            href="/dashboard/tutor/post-tuition"
                            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
                        >
                            Create Tuition
                        </Link>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">
                            My Tuitions
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            View and manage your tuition posts.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">
                            Applicants
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Review students who applied to your tuitions.
                        </p>

                        <p className="mt-4 text-3xl font-bold text-blue-600">
                            {applications.length}
                        </p>
                        <p className="text-sm text-slate-500">
                            Total Applications
                        </p>
                    </div>
                </div>


                <section className="mt-10">
                    <h2 className="mb-5 text-2xl font-bold text-slate-900">
                        My Tuitions
                    </h2>

                    {tuitionLoading && (
                        <p className="text-slate-500">Loading your tuitions...</p>
                    )}

                    {!tuitionLoading && myTuitions.length === 0 && (
                        <div className="rounded-xl border bg-white p-8 text-center">
                            <p className="font-semibold text-slate-700">
                                You havent posted any tuition yet.
                            </p>
                            <Link
                                href="/dashboard/tutor/post-tuition"
                                className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
                            >
                                Post Your First Tuition
                            </Link>
                        </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                        {myTuitions.map((tuition) => (
                            <div
                                key={tuition._id}
                                className="rounded-xl border bg-white p-6 shadow-sm"
                            >
                                <h3 className="text-lg font-bold text-slate-800">
                                    {tuition.title}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {tuition.subject} • {tuition.classLevel}
                                </p>

                                <p className="mt-3 font-semibold text-slate-700">
                                    ৳{tuition.monthlyFee}/month
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                        {tuition.mode}
                                    </span>

                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tuition.approvalStatus === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : tuition.approvalStatus === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {tuition.approvalStatus}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                <section className="mt-10">
                    <h2 className="mb-5 text-2xl font-bold text-slate-900">
                        Student Applications
                    </h2>

                    {loading && (
                        <p className="text-slate-500">
                            Loading applications...
                        </p>
                    )}

                    {error && (
                        <p className="rounded-lg bg-red-50 p-4 text-red-600">
                            {error}
                        </p>
                    )}

                    {!loading && !error && applications.length === 0 && (
                        <div className="rounded-xl border bg-white p-8 text-center">
                            <p className="font-semibold text-slate-700">
                                No applications yet.
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                Student applications will appear here.
                            </p>
                        </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                        {applications.map((application) => (
                            <div
                                key={application._id}
                                className="rounded-xl border bg-white p-6 shadow-sm"
                            >
                                <h3 className="text-lg font-bold text-slate-800">
                                    {application.studentName}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    {application.studentEmail}
                                </p>

                                <div className="my-4 border-t" />

                                <p className="text-sm text-slate-500">
                                    Applied for
                                </p>

                                <h4 className="mt-1 font-semibold text-slate-800">
                                    {application.tuitionTitle}
                                </h4>

                                <p className="mt-3 text-sm text-slate-500">
                                    Applied on:{" "}
                                    {new Date(application.appliedAt).toLocaleDateString()}
                                </p>

                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${application.status === "accepted"
                                            ? "bg-green-100 text-green-700"
                                            : application.status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {application.status.toUpperCase()}
                                    </span>

                                    {application.status === "pending" && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        application._id,
                                                        "accepted"
                                                    )
                                                }
                                                disabled={updatingId === application._id}
                                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        application._id,
                                                        "rejected"
                                                    )
                                                }
                                                disabled={updatingId === application._id}
                                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

