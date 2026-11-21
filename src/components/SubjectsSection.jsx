
import Link from "next/link";
import {
    Calculator,
    Atom,
    BookOpen,
    Languages,
    FlaskConical,
    Monitor,
    ArrowUpRight,
} from "lucide-react";

const subjects = [
    {
        name: "Mathematics",
        category: "Science",
        icon: Calculator,
        description: "Build strong problem-solving skills.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        name: "Physics",
        category: "Science",
        icon: Atom,
        description: "Understand the world around you.",
        color: "bg-violet-50 text-violet-600",
    },
    {
        name: "English",
        category: "Language",
        icon: Languages,
        description: "Improve your communication skills.",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        name: "Chemistry",
        category: "Science",
        icon: FlaskConical,
        description: "Explore the science of matter.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        name: "Biology",
        category: "Science",
        icon: BookOpen,
        description: "Discover the science of life.",
        color: "bg-rose-50 text-rose-600",
    },
    {
        name: "ICT",
        category: "Technology",
        icon: Monitor,
        description: "Learn essential digital skills.",
        color: "bg-cyan-50 text-cyan-600",
    },
];

export default function SubjectsSection() {
    return (
        <section className="bg-slate-50 px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                        Explore Subjects
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Find Tutors for Your{" "}
                        <span className="text-blue-600">Favorite Subjects</span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        From academic subjects to essential skills, discover the right
                        tutor to help you reach your learning goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject) => {
                        const Icon = subject.icon;

                        return (
                            <Link
                                key={subject.name}
                                href={`/tuitions?subject=${encodeURIComponent(subject.name)}`}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                            >
                                <div className="flex items-start justify-between">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${subject.color}`}
                                    >
                                        <Icon size={24} />
                                    </div>

                                    <ArrowUpRight
                                        size={20}
                                        className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600"
                                    />
                                </div>

                                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {subject.category}
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                    {subject.name}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {subject.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/tuitions"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                        Browse All Tuitions <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
