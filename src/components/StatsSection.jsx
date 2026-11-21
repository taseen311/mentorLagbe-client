
"use client";

import { useEffect, useState } from "react";

const stats = [
    {
        value: 1200,
        suffix: "+",
        label: "Active Students",
        description: "Learning with confidence",
        color: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-100",
    },
    {
        value: 5000,
        suffix: "+",
        label: "Qualified Tutors",
        description: "Ready to guide you",
        color: "bg-violet-50",
        textColor: "text-violet-600",
        borderColor: "border-violet-100",
    },
    {
        value: 8500,
        suffix: "+",
        label: "Tuition Opportunities",
        description: "Explore and apply",
        color: "bg-emerald-50",
        textColor: "text-emerald-600",
        borderColor: "border-emerald-100",
    },
    {
        value: 64,
        suffix: "+",
        label: "Subjects Covered",
        description: "Learn what matters to you",
        color: "bg-amber-50",
        textColor: "text-amber-600",
        borderColor: "border-amber-100",
    },
];

function Counter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const duration = 2000;
        const steps = 60;
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
                        className={`rounded-2xl border ${stat.borderColor} ${stat.color} p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7`}
                    >
                        <h2 className={`text-3xl font-extrabold tracking-tight ${stat.textColor} sm:text-4xl`}>
                            <Counter target={stat.value} />
                            {stat.suffix}
                        </h2>

                        <p className="mt-2 text-sm font-bold text-slate-800 sm:text-base">
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
