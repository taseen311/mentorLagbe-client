
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/jwt";

export default function TutorDashboard() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const [applications, setApplications] = useState([]);
    const [myTuitions, setMyTuitions] = useState([]);
    const [tuitionLoading, setTuitionLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        const role = session.user?.role;

        if (role === "student") {
            router.replace("/dashboard/student");
            return;
        }

        if (role === "admin") {
            router.replace("/dashboard/admin");
            return;
        }

        if (role !== "tutor") return;

        let isMounted = true;

        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const fetchApplications = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/applications/tutor-applications`,
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

                if (isMounted) setApplications(data);
            } catch (error) {
                console.error("Applications Error:", error);
                if (isMounted) setError(error.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        const fetchMyTuitions = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/tuitions/my-tuitions`,
                    {
                        cache: "no-store",
                        credentials: "include",
                        headers: getAuthHeaders(),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load tuitions"
                    );
                }

                if (isMounted) setMyTuitions(data);
            } catch (error) {
                console.error("My Tuitions Error:", error);
            } finally {
                if (isMounted) setTuitionLoading(false);
            }
        };

        fetchApplications();
        fetchMyTuitions();

        return () => {
            isMounted = false;
        };
    }, [session, isPending, router]);

    const handleStatusUpdate = async (id, status) => {
        try {
            setUpdatingId(id);

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const response = await fetch(
                `${apiUrl}/api/applications/${id}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: getAuthHeaders({
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update status");
            }

            setApplications((previous) =>
                previous.map((application) =>
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
            <div className="flex min-h-[70vh] items-center justify-center bg-[#f4f7fb]">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                        Preparing your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (!session) return null;

    if (session.user?.role !== "tutor") {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#f4f7fb] px-5">
                <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-9 text-center shadow-sm">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-3xl">
                        🔒
                    </div>

                    <h2 className="mt-6 text-2xl font-extrabold text-[#10243a]">
                        Access Restricted
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                        Please sign in with an authorized tutor account to
                        access this dashboard.
                    </p>

                    <Link
                        href="/login"
                        className="mt-6 inline-flex rounded-xl bg-[#10243a] px-6 py-3 font-bold text-white transition hover:bg-teal-700"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    const pendingApplications = applications.filter(
        (application) => application.status === "pending"
    ).length;

    const acceptedApplications = applications.filter(
        (application) => application.status === "accepted"
    ).length;

    const stats = [
        {
            title: "Total Tuitions",
            value: tuitionLoading ? "..." : myTuitions.length,
            icon: "📚",
            color: "bg-blue-50 text-blue-700",
        },
        {
            title: "Applications",
            value: loading ? "..." : applications.length,
            icon: "👥",
            color: "bg-violet-50 text-violet-700",
        },
        {
            title: "Pending Review",
            value: loading ? "..." : pendingApplications,
            icon: "⏳",
            color: "bg-amber-50 text-amber-700",
        },
        {
            title: "Accepted",
            value: loading ? "..." : acceptedApplications,
            icon: "✓",
            color: "bg-emerald-50 text-emerald-700",
        },
    ];

    const getStatusStyle = (status) => {
        if (status === "approved" || status === "accepted") {
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

                {/* Welcome Header */}
                <section className="relative mb-9 overflow-hidden rounded-[28px] bg-[#10243a] px-7 py-9 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-11">
                    <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/[0.04]" />
                    <div className="absolute -bottom-32 right-48 h-64 w-64 rounded-full bg-teal-400/[0.06] blur-2xl" />

                    <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-bold tracking-wider text-teal-300">
                                <span className="h-2 w-2 rounded-full bg-teal-400" />
                                TUTOR WORKSPACE
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Welcome back,{" "}
                                {session.user?.name?.split(" ")[0] || "Tutor"}!
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                                Manage your tuition posts, review student
                                applications, and grow your teaching journey
                                with MentorLagbe.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/tutor/post-tuition"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-3.5 font-extrabold text-[#10243a] transition hover:-translate-y-0.5 hover:bg-teal-300"
                        >
                            <span className="text-xl">＋</span>
                            Post a Tuition
                        </Link>
                    </div>
                </section>

                {/* Statistics */}
                <section className="mb-11 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-500">
                                    {stat.title}
                                </p>

                                <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </div>

                            <p className="mt-5 text-3xl font-extrabold tracking-tight text-[#10243a]">
                                {stat.value}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Your dashboard overview
                            </p>
                        </div>
                    ))}
                </section>

                {/* My Tuitions */}
                <section className="mb-12">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                                Your Teaching
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10243a] sm:text-3xl">
                                My Tuitions
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Manage and monitor your tuition posts.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/tutor/post-tuition"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#10243a] transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                        >
                            <span className="text-lg">＋</span>
                            Add New
                        </Link>
                    </div>

                    {tuitionLoading ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm font-medium text-slate-500">
                            Loading your tuitions...
                        </div>
                    ) : myTuitions.length === 0 ? (
                        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-4xl">
                                📚
                            </div>

                            <h3 className="mt-6 text-xl font-extrabold text-[#10243a]">
                                No Tuitions Posted Yet
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                                Start your teaching journey by creating your
                                first tuition post and connecting with students.
                            </p>

                            <Link
                                href="/dashboard/tutor/post-tuition"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#10243a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-700"
                            >
                                Create Your First Tuition →
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2">
                            {myTuitions.map((tuition) => (
                                <article
                                    key={tuition._id}
                                    className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-slate-900/5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-extrabold text-[#10243a]">
                                                {tuition.title}
                                            </h3>

                                            <p className="mt-2 text-sm text-slate-500">
                                                {tuition.subject} · {tuition.classLevel}
                                            </p>
                                        </div>

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl">
                                            📖
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-[#f4f7fb] p-4">
                                        <div>
                                            <p className="text-xs font-medium text-slate-400">
                                                Monthly Fee
                                            </p>
                                            <p className="mt-1 text-xl font-extrabold text-[#10243a]">
                                                ৳{tuition.monthlyFee}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-slate-400">
                                                Tuition Mode
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-slate-700">
                                                {tuition.mode}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                        <span className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${getStatusStyle(tuition.approvalStatus)}`}>
                                            {tuition.approvalStatus || "pending"}
                                        </span>

                                        <span className="text-xs text-slate-400">
                                            {tuition.daysPerWeek || "—"} days / week
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Student Applications */}
                <section>
                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                            Application Management
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10243a] sm:text-3xl">
                            Student Applications
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Review applicants and manage their application status.
                        </p>
                    </div>

                    {loading && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm font-medium text-slate-500">
                            Loading applications...
                        </div>
                    )}

                    {error && (
                        <div className="rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-700">
                            <strong>Unable to load applications:</strong>{" "}
                            {error}
                        </div>
                    )}

                    {!loading && !error && applications.length === 0 && (
                        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
                                👥
                            </div>

                            <h3 className="mt-6 text-xl font-extrabold text-[#10243a]">
                                No Applications Yet
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                                Student applications will appear here when
                                someone applies to your tuition posts.
                            </p>
                        </div>
                    )}

                    {!loading && !error && applications.length > 0 && (
                        <div className="grid gap-5 md:grid-cols-2">
                            {applications.map((application) => (
                                <article
                                    key={application._id}
                                    className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:border-teal-200 hover:shadow-lg hover:shadow-slate-900/5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-lg font-extrabold text-teal-700">
                                                {application.studentName?.charAt(0)?.toUpperCase() || "S"}
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-extrabold text-[#10243a]">
                                                    {application.studentName}
                                                </h3>

                                                <p className="mt-1 break-all text-xs text-slate-500">
                                                    {application.studentEmail}
                                                </p>
                                            </div>
                                        </div>

                                        <span className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${getStatusStyle(application.status)}`}>
                                            {application.status}
                                        </span>
                                    </div>

                                    <div className="my-5 rounded-xl bg-[#f4f7fb] p-4">
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Applied For
                                        </p>

                                        <h4 className="mt-2 font-bold text-[#10243a]">
                                            {application.tuitionTitle}
                                        </h4>

                                        <p className="mt-2 text-xs text-slate-500">
                                            Applied on:{" "}
                                            {new Date(application.appliedAt).toLocaleDateString("en-BD", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    {application.status === "pending" && (
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        application._id,
                                                        "accepted"
                                                    )
                                                }
                                                disabled={updatingId === application._id}
                                                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {updatingId === application._id
                                                    ? "Updating..."
                                                    : "✓ Accept"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        application._id,
                                                        "rejected"
                                                    )
                                                }
                                                disabled={updatingId === application._id}
                                                className="flex-1 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {updatingId === application._id
                                                    ? "Updating..."
                                                    : "✕ Reject"}
                                            </button>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Footer */}
                <div className="mt-12 border-t border-slate-200 pt-6 text-center">
                    <p className="text-xs leading-6 text-slate-400">
                        Empowering tutors and students with{" "}
                        <span className="font-bold text-teal-700">
                            MentorLagbe
                        </span>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}



