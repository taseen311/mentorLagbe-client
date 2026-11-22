
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

        const role = session.user.role;

        if (role !== "admin") {
            if (role === "tutor") {
                router.replace("/dashboard/tutor");
            } else {
                router.replace("/dashboard/student");
            }
        }
    }, [isPending, session, isAdminRoute, router]);

    if (isAdminRoute && (
        isPending ||
        !session ||
        session.user.role !== "admin"
    )) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="font-semibold text-slate-600">
                    Verifying access...
                </p>
            </div>
        );
    }

    return children;
}
