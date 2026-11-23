
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/jwt";

export default function ApplyButton({ tuition }) {
    const { data: session, isPending } = authClient.useSession();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApply = async () => {
        if (!session) {
            router.push("/login");
            return;
        }

        if (session.user.role !== "student") {
            alert("Only students can apply for tuition!");
            return;
        }

        try {
            setLoading(true);

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const response = await fetch(
                `${apiUrl}/api/applications`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: getAuthHeaders({
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({
                        tuitionId: tuition._id,
                        tuitionTitle: tuition.title,
                        studentName: session.user.name,
                        studentEmail: session.user.email,
                        tutorEmail: tuition.tutorEmail,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Application failed");
            }

            alert("Your application has been submitted successfully!");
        } catch (error) {
            console.error("Application Error:", error);
            alert(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <button
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-4 font-semibold text-slate-400"
            >
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500" />
                Checking Account...
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={handleApply}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 font-bold text-white shadow-lg shadow-teal-100 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
            {loading ? (
                <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Submitting Application...
                </>
            ) : (
                <>
                    Apply Now
                    <span aria-hidden="true">→</span>
                </>
            )}
        </button>
    );
}
