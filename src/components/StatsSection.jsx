
"use client";

import { useEffect, useState } from "react";

const stats = [
    {
        value: 1200,
        suffix: "+",
        label: "Active Students",
        description: "Learning with confidence",
    },
    {
        value: 5000,
        suffix: "+",
        label: "Qualified Tutors",
        description: "Ready to guide you",
    },
    {
        value: 8500,
        suffix: "+",
        label: "Tuition Opportunities",
        description: "Explore and apply",
    },
    {
        value: 64,
        suffix: "+",
        label: "Subjects Covered",
        description: "Learn what matters to you",
    },
];

function Counter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const duration = 3500;
        const steps = 100;
        const increment = target / steps;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [target]);

    return <>{count.toLocaleString("en-US")}</>;
}

export default function StatsSection() {
    return (
        <section className="relative z-20 mx-auto -mt-8 w-full max-w-7xl px-5 pb-16 sm:-mt-12 sm:px-8">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-teal-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-teal-600 sm:text-4xl">
                            <Counter target={stat.value} />
                            {stat.suffix}
                        </h2>

                        <p className="mt-2 text-sm font-bold text-slate-900 sm:text-base">
                            {stat.label}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

