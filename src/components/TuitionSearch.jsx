
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TuitionSearch({ initialTuitions }) {
    const [search, setSearch] = useState("");
    const [mode, setMode] = useState("");
    const [classLevel, setClassLevel] = useState("");

    const [tuitions, setTuitions] = useState(
        initialTuitions?.tuitions || []
    );
    const [totalTuitions, setTotalTuitions] = useState(
        initialTuitions?.totalTuitions || 0
    );
    const [totalPages, setTotalPages] = useState(
        initialTuitions?.totalPages || 1
    );
    const [currentPage, setCurrentPage] = useState(
        initialTuitions?.currentPage || 1
    );

    const [loading, setLoading] = useState(false);

    const fetchTuitions = async (page = 1) => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (search.trim()) params.set("search", search.trim());
            if (mode) params.set("mode", mode);
            if (classLevel) params.set("classLevel", classLevel);

            params.set("page", page);

            const response = await fetch(
                `http://localhost:5000/api/tuitions?${params.toString()}`,
                { cache: "no-store" }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch tuitions");
            }

            const data = await response.json();

            setTuitions(data.tuitions || []);
            setTotalTuitions(data.totalTuitions || 0);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(data.currentPage || page);
        } catch (error) {
            console.error("Fetch Tuitions Error:", error);
            setTuitions([]);
            setTotalTuitions(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchTuitions(1);
        }, 400);

        return () => clearTimeout(delaySearch);
    }, [search, mode, classLevel]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }

        fetchTuitions(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <p className="mb-2 font-semibold uppercase tracking-widest text-indigo-600">
                        Find Your Perfect Match
                    </p>

                    <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                        Browse Tuition Opportunities
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Explore available tuition opportunities and find
                        the right learning or teaching opportunity for you.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">

                    <input
                        type="text"
                        placeholder="Search by title, subject..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                    >
                        <option value="">All Modes</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>

                    <select
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                    >
                        <option value="">All Classes</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option>
                        <option value="Class 4">Class 4</option>
                        <option value="Class 5">Class 5</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                    </select>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="font-medium text-slate-700">
                        {totalTuitions} tuition opportunities found
                    </p>
                </div>

                {/* Tuition Cards */}
                {loading ? (
                    <div className="py-20 text-center">
                        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
                        <p className="mt-3 text-slate-500">Loading tuitions...</p>
                    </div>
                ) : tuitions.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
                        <h3 className="text-xl font-bold text-slate-800">
                            No Tuitions Found
                        </h3>
                        <p className="mt-2 text-slate-500">
                            Try changing your search or filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {tuitions.map((tuition) => (
                            <div
                                key={tuition._id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                {tuition.bannerImage ? (
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={tuition.bannerImage}
                                            alt={tuition.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-48 items-center justify-center bg-indigo-50 text-5xl">
                                        📚
                                    </div>
                                )}

                                <div className="p-5">
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                            {tuition.subject}
                                        </span>

                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                            {tuition.mode}
                                        </span>
                                    </div>

                                    <h2 className="mb-3 text-xl font-bold text-slate-900">
                                        {tuition.title}
                                    </h2>

                                    <div className="space-y-2 text-sm text-slate-600">
                                        <p>
                                            <strong>Class:</strong>{" "}
                                            {tuition.classLevel}
                                        </p>
                                        <p>
                                            <strong>Location:</strong>{" "}
                                            {tuition.location}
                                        </p>
                                        <p>
                                            <strong>Days per week:</strong>{" "}
                                            {tuition.daysPerWeek}
                                        </p>
                                        <p>
                                            <strong>Monthly Fee:</strong>{" "}
                                            <span className="font-bold text-indigo-600">
                                                ৳{tuition.monthlyFee}
                                            </span>
                                        </p>
                                    </div>

                                    <Link
                                        href={`/tuitions/${tuition._id}`}
                                        className="mt-5 block rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`h-10 w-10 rounded-lg font-semibold transition ${currentPage === page
                                        ? "bg-indigo-600 text-white"
                                        : "border border-slate-300 text-slate-700 hover:bg-indigo-50"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
