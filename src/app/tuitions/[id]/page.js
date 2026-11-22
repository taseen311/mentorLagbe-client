
import { notFound } from "next/navigation";
import ApplyButton from "@/components/ApplyButton";
export const instant = false;

async function getTuition(id) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/${id}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Tuition Fetch Error:", error);
        return null;
    }
}

export default async function TuitionDetailsPage({ params }) {
    const { id } = await params;
    const tuition = await getTuition(id);

    if (!tuition) {
        notFound();
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-12 sm:px-8">
            <p className="font-semibold text-blue-600">
                TUITION DETAILS
            </p>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
                {tuition.title}
            </h1>

            <p className="mt-3 text-slate-500">
                {tuition.description}
            </p>

            <div className="mt-8 grid gap-5 rounded-2xl border border-slate-200 p-6 sm:grid-cols-2">
                <div>
                    <p className="text-sm text-slate-500">Subject</p>
                    <p className="mt-1 font-bold">{tuition.subject}</p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Class Level</p>
                    <p className="mt-1 font-bold">{tuition.classLevel}</p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Teaching Mode</p>
                    <p className="mt-1 font-bold">{tuition.mode}</p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="mt-1 font-bold">
                        {tuition.location || "Not specified"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Monthly Fee</p>
                    <p className="mt-1 text-xl font-extrabold text-blue-600">
                        ৳{Number(tuition.monthlyFee).toLocaleString("en-BD")}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Days Per Week</p>
                    <p className="mt-1 font-bold">
                        {tuition.daysPerWeek} days
                    </p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Tutor Name</p>
                    <p className="mt-1 font-bold">{tuition.tutorName}</p>
                </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-bold text-slate-900">
                    Interested in this tuition?
                </h2>

                <p className="mb-5 text-sm text-slate-500">
                    Submit your application to let the tutor know you are interested.
                </p>

                <ApplyButton tuition={JSON.parse(JSON.stringify(tuition))} />
            </div>
        </main>
    );
}
