
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
    },
    {
        name: "Physics",
        category: "Science",
        icon: Atom,
        description: "Understand the world around you.",
    },
    {
        name: "English",
        category: "Language",
        icon: Languages,
        description: "Improve your communication skills.",
    },
    {
        name: "Chemistry",
        category: "Science",
        icon: FlaskConical,
        description: "Explore the science of matter.",
    },
    {
        name: "Biology",
        category: "Science",
        icon: BookOpen,
        description: "Discover the science of life.",
    },
    {
        name: "ICT",
        category: "Technology",
        icon: Monitor,
        description: "Learn essential digital skills.",
    },
];

export default function SubjectsSection() {
    return (
        <section className="bg-slate-50 px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-700">
                        Explore Subjects
                    </span>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Find Tutors for Your{" "}
                        <span className="text-teal-600">
                            Favorite Subjects
                        </span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                        From academic subjects to essential skills, discover the right
                        tutor to help you reach your learning goals.
                    </p>
                </div>

                {/* Subject Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject) => {
                        const Icon = subject.icon;

                        return (
                            <Link
                                key={subject.name}
                                href={`/tuitions?subject=${encodeURIComponent(subject.name)}`}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-200/60"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700 transition duration-300 group-hover:bg-teal-600 group-hover:text-white">
                                        <Icon size={24} strokeWidth={1.8} />
                                    </div>

                                    <ArrowUpRight
                                        size={20}
                                        className="text-slate-300 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-600"
                                    />
                                </div>

                                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-teal-600">
                                    {subject.category}
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-slate-900 transition group-hover:text-teal-700">
                                    {subject.name}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {subject.description}
                                </p>

                                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-teal-700 opacity-0 transition duration-300 group-hover:opacity-100">
                                    Explore tuitions
                                    <ArrowUpRight size={15} />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Browse All Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/tuitions"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:bg-teal-600 hover:shadow-teal-600/20"
                    >
                        Browse All Tuitions
                        <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

