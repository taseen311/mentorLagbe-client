
"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getAuthToken, syncJWT, removeAuthToken } from "@/lib/jwt";
import { usePathname } from "next/navigation";
import {
    GraduationCap,
    House,
    BookOpen,
    Tags,
    Info,
    UserRound,
    ArrowUpRight,
    Menu,
    X,
    LayoutDashboard,
    LogOut,
} from "lucide-react";

const navLinks = [
    { name: "Home", href: "/", icon: House },
    { name: "Browse Tuitions", href: "/tuitions", icon: BookOpen },
    { name: "Pricing", href: "/pricing", icon: Tags },
    { name: "About", href: "/about", icon: Info },
];

function NavbarContent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const userRole = user?.role;

    const dashboardPath = userRole
        ? `/dashboard/${userRole}`
        : "/login";

    // Sync JWT when a logged-in user does not have a token
    useEffect(() => {
        if (user?.email && !getAuthToken()) {
            syncJWT(user.email);
        }
    }, [user?.email]);

    const closeMenu = () => setIsMenuOpen(false);

    const handleSignOut = async () => {
        removeAuthToken();
        await authClient.signOut();
        closeMenu();
        window.location.assign("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm shadow-slate-200/30 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">

                {/* Brand */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="group flex items-center gap-2.5"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-teal-700 text-white shadow-md shadow-teal-900/15 transition-transform duration-300 group-hover:-rotate-3">
                        <GraduationCap size={23} />
                    </div>

                    <div>
                        <p className="text-xl font-extrabold tracking-tight text-slate-950">
                            Mentor<span className="text-teal-600">Lagbe</span>
                            <span className="text-slate-900">.</span>
                        </p>

                        <p className="-mt-0.5 text-[9px] font-bold tracking-[2px] text-slate-400">
                            LEARN • GROW • SUCCEED
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${active
                                        ? "bg-teal-50 text-teal-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
                                    }`}
                            >
                                <Icon size={16} strokeWidth={2} />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Auth Actions */}
                <div className="hidden items-center gap-2 lg:flex">
                    {isPending ? (
                        <div className="h-10 w-40 animate-pulse rounded-xl bg-slate-100" />
                    ) : user ? (
                        <>
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="h-10 w-10 rounded-full border-2 border-teal-100 object-cover"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-700 ring-1 ring-teal-100">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className="mr-2 text-right">
                                <p className="max-w-28 truncate text-sm font-bold text-slate-800">
                                    {user.name}
                                </p>
                                <p className="text-xs capitalize text-slate-500">
                                    {userRole}
                                </p>
                            </div>

                            <Link
                                href={dashboardPath}
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700"
                            >
                                <LayoutDashboard size={16} />
                                Dashboard
                            </Link>

                            <Link
                                href="/profile"
                                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-teal-700"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-teal-700"
                            >
                                <UserRound size={16} />
                                Sign In
                            </Link>

                            <Link
                                href="/register"
                                className="group flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-[13px] font-bold text-slate-950 shadow-md shadow-teal-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-lg"
                            >
                                Get Started
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    className="rounded-xl bg-slate-100 p-2.5 text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 lg:hidden"
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-xl lg:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">

                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active
                                            ? "bg-teal-50 text-teal-700"
                                            : "text-slate-700 hover:bg-slate-50 hover:text-teal-700"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="my-2 border-t border-slate-100" />

                        {isPending ? (
                            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
                        ) : user ? (
                            <>
                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-4">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User"}
                                            width={44}
                                            height={44}
                                            unoptimized
                                            className="h-11 w-11 rounded-full border-2 border-teal-100 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-700">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate font-bold text-slate-800">
                                            {user.name}
                                        </p>
                                        <p className="text-xs capitalize text-slate-500">
                                            {userRole}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href={dashboardPath}
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-700"
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>

                                <Link
                                    href="/profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    <UserRound size={18} />
                                    Update Profile
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    <UserRound size={18} />
                                    Sign In
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={closeMenu}
                                    className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-400"
                                >
                                    Get Started
                                    <ArrowUpRight size={17} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default function Navbar() {
    return (
        <Suspense
            fallback={
                <header className="sticky top-0 z-50 h-[68px] border-b border-slate-100 bg-white/95" />
            }
        >
            <NavbarContent />
        </Suspense>
    );
}


