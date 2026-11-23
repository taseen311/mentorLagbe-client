
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

const DetailItem = ({ label, value }) => (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-teal-100 hover:bg-teal-50/40">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
        </p>

        <p className="mt-2 font-bold text-slate-800">
            {value || "Not specified"}
        </p>
    </div>
);

export default async function TuitionDetailsPage({ params }) {
    const { id } = await params;
    const tuition = await getTuition(id);

    if (!tuition) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-12 md:py-16">
            <div className="mx-auto max-w-5xl">

                {/* Breadcrumb / Label */}
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-700">
                        <span className="h-2 w-2 rounded-full bg-teal-500" />
                        Tuition Opportunity
                    </span>
                </div>

                {/* Main Header */}
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
                    <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
                                {tuition.title}
                            </h1>

                            <p className="mt-5 leading-7 text-slate-500">
                                {tuition.description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                                    {tuition.subject}
                                </span>

                                <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                                    {tuition.classLevel}
                                </span>

                                <span className="rounded-lg bg-teal-50 px-3 py-2 text-sm font-semibold capitalize text-teal-700">
                                    {tuition.mode}
                                </span>
                            </div>
                        </div>

                        {/* Fee Card */}
                        <div className="w-full shrink-0 rounded-2xl border border-teal-100 bg-teal-50 p-6 md:w-56">
                            <p className="text-sm font-semibold text-teal-700">
                                Monthly Salary
                            </p>

                            <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
                                ৳{Number(tuition.monthlyFee).toLocaleString("en-BD")}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Per month
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tuition Information */}
                <section className="mt-8">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-900">
                            Tuition Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Everything you need to know about this opportunity.
                        </p>
                    </div>

                    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 md:grid-cols-3 md:p-7">
                        <DetailItem
                            label="Subject"
                            value={tuition.subject}
                        />

                        <DetailItem
                            label="Class Level"
                            value={tuition.classLevel}
                        />

                        <DetailItem
                            label="Teaching Mode"
                            value={tuition.mode}
                        />

                        <DetailItem
                            label="Location"
                            value={tuition.location}
                        />

                        <DetailItem
                            label="Days Per Week"
                            value={
                                tuition.daysPerWeek
                                    ? `${tuition.daysPerWeek} days`
                                    : null
                            }
                        />

                        <DetailItem
                            label="Tutor Name"
                            value={tuition.tutorName}
                        />
                    </div>
                </section>

                {/* Application Section */}
                <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-1.5 bg-teal-600" />

                    <div className="p-7 md:p-9">
                        <div className="max-w-2xl">
                            <span className="text-sm font-bold uppercase tracking-wider text-teal-600">
                                Take the next step
                            </span>

                            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                                Interested in this tuition?
                            </h2>

                            <p className="mt-3 leading-7 text-slate-500">
                                Think this opportunity is right for you?
                                Submit your application and let the tutor
                                know youre interested.
                            </p>
                        </div>

                        <div className="mt-7">
                            <ApplyButton
                                tuition={JSON.parse(JSON.stringify(tuition))}
                            />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-slate-400">
                    Find the right opportunity and grow with MentorLagbe.
                </p>
            </div>
        </main>
    );
}

