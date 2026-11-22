
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

            const response = await fetch(
                "http://localhost:5000/api/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
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
            alert(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <button disabled className="w-full rounded-xl bg-slate-300 px-6 py-3 font-bold text-slate-600">
                Checking account...
            </button>
        );
    }

    return (
        <button
            onClick={handleApply}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? "Submitting..." : "Apply Now"}
        </button>
    );
}
