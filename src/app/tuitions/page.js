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

    console.log(tuitions);

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-5 py-12 sm:px-8">

            <div className="mb-10">
                <p className="font-semibold text-blue-600">
                    FIND YOUR OPPORTUNITY
                </p>

                <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    Browse Tuitions
                </h1>

                <p className="mt-3 text-slate-500">
                    Explore available tuition opportunities and find your perfect match.
                </p>
            </div>

            <TuitionSearch initialTuitions={tuitions} />

        </main>
    );
}
