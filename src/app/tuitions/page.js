
import TuitionCard from "@/components/TuitionCard";
import { connection } from "next/server";
import TuitionSearch from "@/components/TuitionSearch";

export const instant = false;

async function getTuitions() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/tuitions`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch tuitions");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching tuitions:", error);
        return [];
    }
}

export default async function TuitionsPage() {
    await connection();

    const tuitions = await getTuitions();

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-12 sm:px-8 md:py-16">
            <div className="mx-auto w-full max-w-7xl">

                {/* Page Header */}
                <section className="relative mb-10 overflow-hidden rounded-3xl bg-slate-900 px-7 py-10 md:px-12 md:py-14">
                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
                            <span className="h-2 w-2 rounded-full bg-teal-400" />
                            Find Your Opportunity
                        </span>

                        <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                            Discover Your Next{" "}
                            <span className="text-teal-400">
                                Teaching Opportunity.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                            Explore available tuition opportunities,
                            connect with students and find the right
                            match for your teaching journey.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                            <span className="flex items-center gap-2">
                                <span className="text-teal-400">✓</span>
                                Flexible opportunities
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="text-teal-400">✓</span>
                                Find your perfect match
                            </span>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
                    <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
                </section>

                {/* Search Section */}
                <section>
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Available Tuitions
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Search and explore opportunities that
                                match your preferences.
                            </p>
                        </div>

                        <span className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                            Explore Opportunities
                        </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                        <TuitionSearch initialTuitions={tuitions} />
                    </div>
                </section>

                {/* Footer Note */}
                <p className="mt-8 text-center text-sm text-slate-400">
                    Your next great opportunity could be just one search away.
                </p>
            </div>
        </main>
    );
}

