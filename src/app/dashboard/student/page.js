
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/jwt";

export default function StudentDashboard() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        const role = session.user?.role;

        if (role === "tutor") {
            router.replace("/dashboard/tutor");
            return;
        }

        if (role === "admin") {
            router.replace("/dashboard/admin");
            return;
        }

        if (role !== "student") return;

        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        let isMounted = true;

        const fetchApplications = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/applications/my-applications`,
                    {
                        cache: "no-store",
                        credentials: "include",
                        headers: getAuthHeaders(),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load applications"
                    );
                }

                if (isMounted) {
                    setApplications(data);
                }
            } catch (error) {
                console.error("Applications Fetch Error:", error);

                if (isMounted) {
                    setError(error.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchApplications();

        return () => {
            isMounted = false;
        };
    }, [session, isPending, router]);

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

    if (!session || session.user?.role !== "student") {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f4f7fb] px-5 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-3xl">
                    🔒
                </div>

                <h2 className="mt-6 text-2xl font-extrabold text-[#10243a]">
                    Access Restricted
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                    This dashboard is available for student accounts only.
                    Please sign in with your student account.
                </p>

                <Link
                    href="/login"
                    className="mt-6 rounded-xl bg-[#10243a] px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
                >
                    Back to Login
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#f4f7fb]">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                        Loading your applications...
                    </p>
                </div>
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

    const stats = [
        {
            label: "Total Applications",
            value: applications.length,
            icon: "📚",
            color: "bg-blue-50 text-blue-700",
        },
        {
            label: "Pending Review",
            value: pendingCount,
            icon: "⏳",
            color: "bg-amber-50 text-amber-700",
        },
        {
            label: "Accepted",
            value: acceptedCount,
            icon: "✓",
            color: "bg-emerald-50 text-emerald-700",
        },
        {
            label: "Rejected",
            value: rejectedCount,
            icon: "↗",
            color: "bg-rose-50 text-rose-700",
        },
    ];

    const getStatusStyle = (status) => {
        if (status === "accepted") {
            return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";
        }

        if (status === "rejected") {
            return "bg-rose-50 text-rose-700 ring-rose-600/10";
        }

        return "bg-amber-50 text-amber-700 ring-amber-600/10";
    };

    return (
        <main className="min-h-screen bg-[#f4f7fb] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto max-w-7xl">

                {/* Dashboard Header */}
                <section className="relative mb-9 overflow-hidden rounded-[28px] bg-[#10243a] px-7 py-9 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-11">
                    <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/[0.04]" />
                    <div className="absolute -bottom-32 right-48 h-64 w-64 rounded-full bg-teal-400/[0.06] blur-2xl" />

                    <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-bold tracking-wider text-teal-300">
                                <span className="h-2 w-2 rounded-full bg-teal-400" />
                                STUDENT DASHBOARD
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Welcome back, {session.user.name || "Student"}!
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                                Keep track of your tuition applications and
                                stay updated on your learning opportunities.
                            </p>
                        </div>

                        <Link
                            href="/tuitions"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-3.5 text-sm font-extrabold text-[#10243a] transition hover:-translate-y-0.5 hover:bg-teal-300"
                        >
                            Explore Tuitions
                            <span className="text-lg">→</span>
                        </Link>
                    </div>
                </section>

                {/* Statistics */}
                <section className="mb-11 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-500">
                                    {stat.label}
                                </p>

                                <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </div>

                            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#10243a]">
                                {stat.value}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Your application overview
                            </p>
                        </div>
                    ))}
                </section>

                {/* Applications Heading */}
                <section>
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                                Your Activity
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10243a] sm:text-3xl">
                                My Applications
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Review the status of your submitted applications.
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
                            {applications.length} Applications
                        </span>
                    </div>

                    {error ? (
                        <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm">
                            <div className="text-3xl">⚠️</div>

                            <h3 className="mt-3 text-lg font-bold text-slate-800">
                                Unable to Load Applications
                            </h3>

                            <p className="mt-2 text-sm text-rose-600">
                                {error}
                            </p>

                            <button
                                onClick={() => window.location.reload()}
                                className="mt-5 rounded-xl bg-[#10243a] px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-5 py-16 text-center shadow-sm sm:px-10">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-4xl">
                                📚
                            </div>

                            <h3 className="mt-6 text-xl font-extrabold text-[#10243a]">
                                No Applications Yet
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                                Your learning journey starts with the right
                                opportunity. Explore available tuitions and
                                apply for one that matches your goals.
                            </p>

                            <Link
                                href="/tuitions"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#10243a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-700"
                            >
                                Find Your Tuition
                                <span>→</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5">
                            {applications.map((application) => (
                                <article
                                    key={application._id}
                                    className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:border-teal-200 hover:shadow-lg hover:shadow-slate-900/5 sm:p-7"
                                >
                                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-lg font-extrabold text-[#10243a] transition group-hover:text-teal-700 sm:text-xl">
                                                    {application.tuitionTitle}
                                                </h3>

                                                <span
                                                    className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${getStatusStyle(application.status)}`}
                                                >
                                                    {application.status}
                                                </span>
                                            </div>

                                            <div className="mt-4 space-y-2">
                                                <p className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                                    <span className="font-semibold text-slate-700">
                                                        Tutor:
                                                    </span>
                                                    <span className="break-all">
                                                        {application.tutorEmail}
                                                    </span>
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    <span className="font-semibold text-slate-700">
                                                        Applied on:
                                                    </span>{" "}
                                                    {new Date(
                                                        application.appliedAt
                                                    ).toLocaleDateString("en-BD", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/tuitions/${application.tuitionId}`}
                                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-[#10243a] transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700"
                                        >
                                            View Details
                                            <span>→</span>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Footer Note */}
                <div className="mt-10 border-t border-slate-200 pt-6 text-center">
                    <p className="text-xs leading-6 text-slate-400">
                        Stay focused on your goals. Your next learning
                        opportunity could be just around the corner.
                    </p>
                </div>

            </div>
        </main>
    );
}
