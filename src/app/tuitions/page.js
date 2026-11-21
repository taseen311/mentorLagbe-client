import TuitionCard from "@/components/TuitionCard";
import TuitionSearch from "@/components/TuitionSearch";
async function getTuitions() {
    try {
        const res = await fetch("http://localhost:5000/api/tuitions", {
            cache: "no-store",
        });

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

            {/* <p className="mb-6 text-sm font-medium text-slate-600">
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
                        No Tuitions Available
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        There are no approved tuition opportunities right now.
                        Please check back later.
                    </p>
                </div>
            )} */}

            <TuitionSearch initialTuitions={tuitions} />

        </main>
    );
}
