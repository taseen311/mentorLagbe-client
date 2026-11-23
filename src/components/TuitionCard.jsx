
import Link from "next/link";
import {
    MapPin,
    BookOpen,
    CalendarDays,
    ArrowRight,
} from "lucide-react";

export default function TuitionCard({ tuition }) {
    return (
        <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-6">

            {/* Card Header */}
            <div className="mb-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
                        {tuition.subject}
                    </p>

                    <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-teal-700">
                        {tuition.title}
                    </h2>
                </div>

                <span className="shrink-0 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                    {tuition.mode}
                </span>
            </div>

            {/* Tuition Information */}
            <div className="flex-1 space-y-3.5">
                <p className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <BookOpen size={17} />
                    </span>
                    <span>{tuition.classLevel}</span>
                </p>

                <p className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <MapPin size={17} />
                    </span>
                    <span className="min-w-0 break-words">
                        {tuition.location || "Location not specified"}
                    </span>
                </p>

                <p className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <CalendarDays size={17} />
                    </span>
                    <span>{tuition.daysPerWeek} days per week</span>
                </p>
            </div>

            {/* Fee and Action */}
            <div className="mt-6 flex items-end justify-between gap-3 border-t border-slate-100 pt-5">
                <div>
                    <p className="text-xs font-medium text-slate-500">
                        Monthly Fee
                    </p>

                    <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        ৳{Number(tuition.monthlyFee).toLocaleString("en-BD")}
                    </p>
                </div>

                <Link
                    href={`/tuitions/${tuition._id}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20"
                >
                    Details
                    <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </div>
    );
}

