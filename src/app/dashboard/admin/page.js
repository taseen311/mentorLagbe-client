
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/jwt";

export default function AdminDashboard() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        if (session.user?.role !== "admin") {
            return;
        }

        let isMounted = true;

        const fetchPendingTuitions = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/tuitions/pending`,
                    {
                        cache: "no-store",
                        credentials: "include",
                        headers: getAuthHeaders(),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch pending tuitions"
                    );
                }

                if (isMounted) {
                    setTuitions(data);
                }
            } catch (error) {
                console.error("Fetch Pending Tuitions Error:", error);

                if (isMounted) {
                    setError(error.message || "Could not load pending tuitions.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchPendingTuitions();

        return () => {
            isMounted = false;
        };
    }, [session, isPending, router, apiUrl]);

    const handleApproval = async (id, approvalStatus) => {
        try {
            setUpdatingId(id);

            const response = await fetch(
                `${apiUrl}/api/tuitions/${id}/approval`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: getAuthHeaders({
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({ approvalStatus }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Approval failed");
            }

            setTuitions((previous) =>
                previous.filter((tuition) => tuition._id !== id)
            );

            alert(result.message);
        } catch (error) {
            console.error("Approval Error:", error);
            alert(error.message || "Something went wrong!");
        } finally {
            setUpdatingId(null);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
                    <p className="font-medium text-slate-600">
                        Preparing Admin Dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (!session) return null;

    if (session.user?.role !== "admin") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                        🔒
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Access Restricted
                    </h2>

                    <p className="mt-3 text-slate-500">
                        You need an administrator account to access this dashboard.
                    </p>

                    <Link
                        href="/login"
                        className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    const approvedCount = 0;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Admin Welcome Header */}
                <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-800 p-7 text-white shadow-xl shadow-indigo-200 sm:p-10">
                    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
                    <div className="absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />

                    <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-green-400" />
                                Administrator Workspace
                            </span>

                            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Welcome,{" "}
                                {session.user?.name?.split(" ")[0] || "Admin"}!
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
                                Manage tuition submissions, review tutor
                                requests, and maintain the quality of
                                MentorLagbe.
                            </p>
                        </div>

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-4xl backdrop-blur">
                            🛡️
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Pending Approval",
                            value: loading ? "..." : tuitions.length,
                            icon: "⏳",
                            color: "bg-amber-50 text-amber-700",
                            description: "Waiting for review",
                        },
                        {
                            title: "Total to Review",
                            value: loading ? "..." : tuitions.length,
                            icon: "📋",
                            color: "bg-indigo-50 text-indigo-700",
                            description: "Current pending submissions",
                        },
                        {
                            title: "Admin Status",
                            value: "Active",
                            icon: "🛡️",
                            color: "bg-green-50 text-green-700",
                            description: "Administrator access",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-500">
                                    {stat.title}
                                </p>

                                <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${stat.color}`}>
                                    {stat.icon}
                                </span>
                            </div>

                            <p className="mt-4 text-3xl font-extrabold text-slate-900">
                                {stat.value}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Tuition Management */}
                <section>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900">
                                Tuition Management
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Review tutor submissions and manage approvals.
                            </p>
                        </div>

                        <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                            {loading ? "Loading..." : `${tuitions.length} Pending`}
                        </span>
                    </div>

                    {loading && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
                            <p className="font-medium text-slate-600">
                                Loading pending tuition requests...
                            </p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                            <h3 className="font-bold">
                                Unable to load tuition requests
                            </h3>
                            <p className="mt-2 text-sm">{error}</p>
                        </div>
                    )}

                    {!loading && !error && tuitions.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <div className="mb-5 text-6xl">🎉</div>

                            <h3 className="text-2xl font-extrabold text-slate-800">
                                All Caught Up!
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                                There are no pending tuition requests at the
                                moment. New tutor submissions will appear here.
                            </p>

                            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                                <span>✓</span>
                                Everything is up to date
                            </div>
                        </div>
                    )}

                    {!loading && !error && tuitions.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2">

                            {tuitions.map((tuition) => (
                                <article
                                    key={tuition._id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Tuition Image */}
                                    {tuition.bannerImage ? (
                                        <div className="relative h-52 w-full bg-slate-100">
                                            <Image
                                                src={tuition.bannerImage}
                                                alt={tuition.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 text-6xl">
                                            📚
                                        </div>
                                    )}

                                    <div className="p-6">

                                        {/* Title */}
                                        <div className="mb-5 flex items-start justify-between gap-3">
                                            <div>
                                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                                    Tuition Request
                                                </p>

                                                <h3 className="text-xl font-extrabold text-slate-900">
                                                    {tuition.title}
                                                </h3>
                                            </div>

                                            <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                                                Pending
                                            </span>
                                        </div>

                                        {/* Tuition Details */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                ["Subject", tuition.subject],
                                                ["Class", tuition.classLevel],
                                                ["Mode", tuition.mode],
                                                ["Location", tuition.location],
                                                ["Monthly Fee", `৳${tuition.monthlyFee}`],
                                                ["Days / Week", tuition.daysPerWeek],
                                            ].map(([label, value]) => (
                                                <div
                                                    key={label}
                                                    className="rounded-xl bg-slate-50 p-3"
                                                >
                                                    <p className="text-xs text-slate-400">
                                                        {label}
                                                    </p>

                                                    <p className="mt-1 break-words text-sm font-bold text-slate-800">
                                                        {value || "N/A"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tutor Information */}
                                        <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                                            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-indigo-700">
                                                Tutor Information
                                            </p>

                                            <p className="font-bold text-slate-800">
                                                {tuition.tutorName}
                                            </p>

                                            <p className="mt-1 break-all text-sm text-slate-500">
                                                {tuition.tutorEmail}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div className="mt-5">
                                            <h4 className="mb-2 font-bold text-slate-800">
                                                About This Tuition
                                            </h4>

                                            <p className="text-sm leading-7 text-slate-600">
                                                {tuition.description}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                                            <button
                                                onClick={() =>
                                                    handleApproval(
                                                        tuition._id,
                                                        "approved"
                                                    )
                                                }
                                                disabled={updatingId === tuition._id}
                                                className="rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {updatingId === tuition._id
                                                    ? "Processing..."
                                                    : "✓ Approve"}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleApproval(
                                                        tuition._id,
                                                        "rejected"
                                                    )
                                                }
                                                disabled={updatingId === tuition._id}
                                                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {updatingId === tuition._id
                                                    ? "Processing..."
                                                    : "✕ Reject"}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}

                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="mt-12 border-t border-slate-200 pt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Managing a better learning community with{" "}
                        <span className="font-bold text-indigo-600">
                            MentorLagbe
                        </span>
                        .
                    </p>
                </footer>
            </div>
        </main>
    );
}
