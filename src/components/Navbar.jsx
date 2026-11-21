
"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
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
} from "lucide-react";

const navLinks = [
    { name: "Home", href: "/", icon: House },
    { name: "Browse Tuitions", href: "/tuitions", icon: BookOpen },
    { name: "Pricing", href: "/pricing", icon: Tags },
    { name: "About", href: "/about", icon: Info },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const userRole = user?.role;

    const dashboardPath = userRole
        ? `/dashboard/${userRole}`
        : "/login";

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">

                {/* Brand */}
                <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-200/70">
                        <GraduationCap size={23} />
                    </div>

                    <div>
                        <p className="text-xl font-extrabold tracking-tight text-slate-900">
                            Mentor<span className="text-blue-600">Lagbe</span>
                            <span className="text-violet-600">.</span>
                        </p>
                        <p className="-mt-0.5 text-[9px] font-semibold tracking-[2px] text-slate-400">
                            LEARN • GROW • SUCCEED
                        </p>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-semibold transition ${active
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                    }`}
                            >
                                <Icon size={16} strokeWidth={2} />
                                {link.name}
                            </Link>


                        );
                    })}

                </div>

                {/* Auth Actions */}
                <div className="hidden items-center gap-2.5 lg:flex">
                    {!isPending && user ? (
                        <>
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-800">
                                    {user.name}
                                </p>
                                <p className="text-xs capitalize text-slate-500">
                                    {userRole}
                                </p>
                            </div>

                            <Link
                                href={dashboardPath}
                                className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-100"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/profile"
                                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                Update Profile
                            </Link>

                            <button
                                onClick={async () => {
                                    await authClient.signOut();
                                    window.location.href = "/";
                                }}
                                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                            >
                                Sign Out
                            </button>

                        </>
                    ) : !isPending ? (
                        <>
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <UserRound size={16} />
                                Sign In
                            </Link>


                            <Link
                                href="/register"
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-md shadow-blue-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Get Started
                                <ArrowUpRight size={16} />
                            </Link>
                        </>
                    ) : null}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    className="rounded-lg bg-slate-50 p-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 lg:hidden"
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${active
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="my-2 border-t border-slate-100" />

                        {!isPending && user ? (
                            <>
                                <div className="px-3 py-2">
                                    <p className="font-bold text-slate-800">
                                        {user.name}
                                    </p>
                                    <p className="text-xs capitalize text-slate-500">
                                        {userRole}
                                    </p>
                                </div>

                                <Link
                                    href={dashboardPath}
                                    onClick={closeMenu}
                                    className="rounded-lg px-3 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/profile"
                                    onClick={closeMenu}
                                    className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Update Profile
                                </Link>

                                <button
                                    onClick={async () => {
                                        await authClient.signOut();
                                        closeMenu();
                                        window.location.href = "/";
                                    }}
                                    className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : !isPending ? (
                            <>
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700"
                                >
                                    <UserRound size={18} />
                                    Sign In
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={closeMenu}
                                    className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-bold text-white"
                                >
                                    Get Started
                                    <ArrowUpRight size={17} />
                                </Link>
                            </>
                        ) : null}
                    </div>
                </div>
            )}

        </header>
    );
}

