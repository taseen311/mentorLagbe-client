
import Link from "next/link";

export default function TutorDashboard() {
    return (
        <main className="min-h-screen bg-slate-50 px-5 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-600">
                        Tutor Dashboard
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Welcome to MentorLagbe!
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Manage your tuition posts and connect with students.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">
                            Post a Tuition
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Create a new tuition post and find suitable students.
                        </p>
                        <Link
                            href="/dashboard/tutor/post-tuition"
                            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
                        >
                            Create Tuition
                        </Link>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">
                            My Tuitions
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            View and manage your tuition posts.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">
                            Applicants
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Review students who applied to your tuitions.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
