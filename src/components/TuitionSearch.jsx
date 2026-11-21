
"use client";

import { useState } from "react";
import TuitionCard from "@/components/TuitionCard";

import { Search } from "lucide-react";

export default function TuitionSearch({ initialTuitions }) {
    const [search, setSearch] = useState("");
    const [tuitions, setTuitions] = useState(initialTuitions);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("");
    const [classLevel, setClassLevel] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (search.trim()) {
                params.append("search", search.trim());
            }

            if (mode) {
                params.append("mode", mode);
            }

            if (classLevel) {
                params.append("classLevel", classLevel);
            }

            const res = await fetch(
                `http://localhost:5000/api/tuitions?${params.toString()}`,
                { cache: "no-store" }
            );

            if (!res.ok) {
                throw new Error("Failed to search tuitions");
            }

            const data = await res.json();
            setTuitions(data);

        } catch (error) {
            console.error("Search Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setSearch("");
        setMode("");
        setClassLevel("");

        try {
            setLoading(true);

            const res = await fetch(
                "http://localhost:5000/api/tuitions",
                { cache: "no-store" }
            );

            if (!res.ok) {
                throw new Error("Failed to reset filters");
            }

            const data = await res.json();
            setTuitions(data);
        } catch (error) {
            console.error("Reset Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <form onSubmit={handleSearch} className="mb-8 flex gap-3">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                    <Search size={20} className="text-slate-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by subject, class, title or mode..."
                        className="w-full outline-none"
                    />
                </div>

                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="rounded-xl border border-slate-200 px-3 py-3"
                >
                    <option value="">All Modes</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                </select>

                <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    className="rounded-xl border border-slate-200 px-3 py-3"
                >
                    <option value="">All Classes</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={`Class ${i + 1}`}>
                            Class {i + 1}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Reset
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            <p className="mb-6 text-sm font-medium text-slate-600">
                {tuitions.length} tuition opportunities found
            </p>

            {tuitions.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tuitions.map((tuition) => (
                        <TuitionCard
                            key={tuition._id}
                            tuition={tuition}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
                    <h2 className="text-xl font-bold text-slate-800">
                        No Tuitions Found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Try searching with a different keyword.
                    </p>
                </div>
            )}
        </section>
    );
}
