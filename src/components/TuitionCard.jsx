
import Link from "next/link";
import { MapPin, BookOpen, CalendarDays, ArrowRight } from "lucide-react";

export default function TuitionCard({ tuition }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        {tuition.subject}
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                        {tuition.title}
                    </h2>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {tuition.mode}
                </span>
            </div>

            <div className="space-y-3 text-sm text-slate-600">

                <p className="flex items-center gap-2">
                    <BookOpen size={16} />
                    {tuition.classLevel}
                </p>

                <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {tuition.location || "Location not specified"}
                </p>

                <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {tuition.daysPerWeek} days per week
                </p>

            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <div>
                    <p className="text-xs text-slate-500">Monthly Fee</p>
                    <p className="text-xl font-extrabold text-slate-900">
                        ৳{Number(tuition.monthlyFee).toLocaleString("en-BD")}
                    </p>
                </div>

                <Link
                    href={`/tuitions/${tuition._id}`}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Details <ArrowRight size={16} />
                </Link>

            </div>
        </div>
    );
}
