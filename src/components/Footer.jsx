
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

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

                {/* Brand */}
                <div>
                    <Link href="/" className="text-2xl font-extrabold tracking-tight">
                        <span className="text-blue-500">Mentor</span>
                        <span className="text-white">Lagbe</span>
                        <span className="text-blue-500">.</span>
                    </Link>

                    <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
                        Connecting students with the right tutors.
                        Making quality education more accessible
                        through meaningful learning connections.
                    </p>

                    <p className="mt-5 text-sm text-slate-400">
                        Learn better. Grow together.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-5 font-bold text-white">Quick Links</h3>

                    <ul className="space-y-3">
                        {quickLinks.map((link) => (
                            <li key={link.href + link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm transition hover:text-blue-400"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* For Students & Tutors */}
                <div>
                    <h3 className="mb-5 font-bold text-white">For Students</h3>

                    <ul className="space-y-3">
                        {studentLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm transition hover:text-blue-400"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h3 className="mb-5 mt-8 font-bold text-white">For Tutors</h3>

                    <ul className="space-y-3">
                        {tutorLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm transition hover:text-blue-400"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="mb-5 font-bold text-white">Get in Touch</h3>

                    <p className="text-sm leading-7 text-slate-400">
                        Have questions or need assistance?
                        We would love to hear from you.
                    </p>

                    <a
                        href="mailto:hello@mentorlagbe.com"
                        className="mt-4 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300"
                    >
                        hello@mentorlagbe.com
                    </a>

                    <div className="mt-6">
                        <h4 className="font-semibold text-white">Follow Us</h4>

                        <div className="mt-3 flex gap-4 text-sm">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                                X
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <p>
                        © 2026 MentorLagbe. All rights reserved.
                    </p>

                    <p>Made with care for better learning.</p>
                </div>
            </div>
        </footer>
    );
}
