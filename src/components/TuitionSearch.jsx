
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Search,
    BookOpen,
    MapPin,
    CalendarDays,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
} from "lucide-react";

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

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const response = await fetch(
                `${apiUrl}/api/tuitions?${params.toString()}`,
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
        <section className="min-h-screen bg-slate-50 px-4 py-14 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-700">
                        Find Your Perfect Match
                    </span>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Browse Tuition{" "}
                        <span className="text-teal-600">
                            Opportunities
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                        Explore available tuition opportunities and find
                        the right learning or teaching opportunity for you.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-5 flex items-center gap-2">
                        <SlidersHorizontal size={19} className="text-teal-600" />
                        <h2 className="font-bold text-slate-900">
                            Search & Filter
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Search Input */}
                        <div className="relative">
                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Search by title, subject..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                            />
                        </div>

                        {/* Mode Filter */}
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                        >
                            <option value="">All Modes</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>

                        {/* Class Filter */}
                        <select
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                        >
                            <option value="">All Classes</option>
                            {Array.from({ length: 12 }, (_, index) => (
                                <option key={index + 1} value={`Class ${index + 1}`}>
                                    Class {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Available Tuitions
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Find an opportunity that matches your needs.
                        </p>
                    </div>

                    <span className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
                        {totalTuitions} Opportunities
                    </span>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
                        <div className="h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
                        <p className="mt-5 text-sm font-medium text-slate-500">
                            Finding the best opportunities...
                        </p>
                    </div>
                ) : tuitions.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-20 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                            <Search size={30} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            No Tuitions Found
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            We couldnt find any matching opportunities.
                            Try changing your search or filters.
                        </p>
                    </div>
                ) : (
                    /* Tuition Cards */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {tuitions.map((tuition) => (
                            <div
                                key={tuition._id}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60"
                            >
                                {/* Banner Image */}
                                {tuition.bannerImage ? (
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                        <Image
                                            src={tuition.bannerImage}
                                            alt={tuition.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-teal-50 to-slate-100">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-sm">
                                            <BookOpen size={32} />
                                        </div>
                                    </div>
                                )}

                                {/* Card Content */}
                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    {/* Tags */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                                            {tuition.subject}
                                        </span>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                            {tuition.mode}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-teal-700">
                                        {tuition.title}
                                    </h2>

                                    {/* Details */}
                                    <div className="mt-5 flex-1 space-y-3">
                                        <p className="flex items-center gap-3 text-sm text-slate-600">
                                            <BookOpen size={17} className="shrink-0 text-teal-600" />
                                            <span>
                                                <span className="font-semibold text-slate-800">Class:</span>{" "}
                                                {tuition.classLevel}
                                            </span>
                                        </p>

                                        <p className="flex items-center gap-3 text-sm text-slate-600">
                                            <MapPin size={17} className="shrink-0 text-teal-600" />
                                            <span className="min-w-0 break-words">
                                                <span className="font-semibold text-slate-800">Location:</span>{" "}
                                                {tuition.location || "Not specified"}
                                            </span>
                                        </p>

                                        <p className="flex items-center gap-3 text-sm text-slate-600">
                                            <CalendarDays size={17} className="shrink-0 text-teal-600" />
                                            <span>
                                                <span className="font-semibold text-slate-800">Schedule:</span>{" "}
                                                {tuition.daysPerWeek} days per week
                                            </span>
                                        </p>
                                    </div>

                                    {/* Fee and Button */}
                                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                                        <div>
                                            <p className="text-xs font-medium text-slate-500">
                                                Monthly Fee
                                            </p>

                                            <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                                                ৳{Number(tuition.monthlyFee).toLocaleString("en-BD")}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/tuitions/${tuition._id}`}
                                            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20"
                                        >
                                            View Details
                                            <ArrowRight
                                                size={16}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </Link>
                                    </div>
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
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft size={17} />
                            Previous
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                aria-current={currentPage === page ? "page" : undefined}
                                className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition ${currentPage === page
                                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                                    : "border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                            <ChevronRight size={17} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
