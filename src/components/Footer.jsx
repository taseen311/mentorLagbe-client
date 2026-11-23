
import Link from "next/link";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tuitions", href: "/tuitions" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
];

const studentLinks = [
    { name: "Find a Tutor", href: "/tuitions" },
    { name: "How It Works", href: "/about" },
    { name: "Sign Up", href: "/register" },
];

const tutorLinks = [
    { name: "Become a Tutor", href: "/register" },
    { name: "Browse Opportunities", href: "/tuitions" },
    { name: "Pricing Plans", href: "/pricing" },
];

const linkStyle =
    "inline-flex text-sm text-slate-400 transition-colors duration-200 hover:text-teal-400";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
                {/* Brand */}
                <div>
                    <Link
                        href="/"
                        className="inline-block text-2xl font-extrabold tracking-tight"
                    >
                        <span className="text-teal-400">Mentor</span>
                        <span className="text-white">Lagbe</span>
                        <span className="text-teal-400">.</span>
                    </Link>

                    <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
                        Connecting students with the right tutors.
                        Making quality education more accessible
                        through meaningful learning connections.
                    </p>

                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                        Learn better. Grow together.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-6 text-sm font-bold tracking-wide text-white">
                        Quick Links
                    </h3>

                    <ul className="space-y-4">
                        {quickLinks.map((link) => (
                            <li key={link.href + link.name}>
                                <Link href={link.href} className={linkStyle}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Students & Tutors */}
                <div>
                    <h3 className="mb-6 text-sm font-bold tracking-wide text-white">
                        For Students
                    </h3>

                    <ul className="space-y-4">
                        {studentLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className={linkStyle}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h3 className="mb-5 mt-9 text-sm font-bold tracking-wide text-white">
                        For Tutors
                    </h3>

                    <ul className="space-y-4">
                        {tutorLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className={linkStyle}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="mb-6 text-sm font-bold tracking-wide text-white">
                        Get in Touch
                    </h3>

                    <p className="text-sm leading-7 text-slate-400">
                        Have questions or need assistance?
                        We would love to hear from you.
                    </p>

                    <a
                        href="mailto:hello@mentorlagbe.com"
                        className="mt-4 inline-block text-sm font-semibold text-teal-400 transition-colors hover:text-teal-300"
                    >
                        hello@mentorlagbe.com
                    </a>

                    <div className="mt-8">
                        <h4 className="text-sm font-bold text-white">
                            Follow Us
                        </h4>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-400"
                            >
                                Facebook
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-400"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="https://x.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-400"
                            >
                                X
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800/80">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-center text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
                    <p>
                        © 2026 MentorLagbe. All rights reserved.
                    </p>

                    <p>
                        Made with care for better learning.
                    </p>
                </div>
            </div>
        </footer>
    );
}
