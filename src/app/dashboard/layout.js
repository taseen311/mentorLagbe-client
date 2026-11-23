
"use client";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
    const { data: session, isPending } = authClient.useSession();

    const router = useRouter();
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith("/dashboard/admin");

    useEffect(() => {
        if (isPending || !isAdminRoute) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        const role = session.user?.role;

        if (role !== "admin") {
            router.replace(
                role === "tutor"
                    ? "/dashboard/tutor"
                    : "/dashboard/student"
            );
        }
    }, [isPending, session, isAdminRoute, router]);

    if (
        isAdminRoute &&
        (
            isPending ||
            !session ||
            session.user?.role !== "admin"
        )
    ) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />

                    <p className="font-medium text-slate-600">
                        Verifying access...
                    </p>
                </div>
            </div>
        );
    }

    return children;
}

