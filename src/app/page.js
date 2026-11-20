
import Link from "next/link";

const highlights = [
  { value: "01", label: "Find the right tutor", icon: "🎯", color: "bg-blue-100 text-blue-700" },
  { value: "02", label: "Explore opportunities", icon: "📚", color: "bg-purple-100 text-purple-700" },
  { value: "03", label: "Grow together", icon: "🚀", color: "bg-pink-100 text-pink-700" },
  { value: "04", label: "Learn without limits", icon: "✨", color: "bg-emerald-100 text-emerald-700" },
];

const subjects = [
  { icon: "📐", name: "Mathematics", description: "Build strong problem-solving skills.", color: "from-blue-500 to-cyan-400", light: "bg-blue-50", text: "text-blue-700" },
  { icon: "🧪", name: "Science", description: "Explore the world through science.", color: "from-purple-500 to-violet-400", light: "bg-purple-50", text: "text-purple-700" },
  { icon: "📖", name: "English", description: "Develop confident communication.", color: "from-orange-500 to-amber-400", light: "bg-orange-50", text: "text-orange-700" },
  { icon: "💻", name: "ICT", description: "Discover the world of technology.", color: "from-emerald-500 to-teal-400", light: "bg-emerald-50", text: "text-emerald-700" },
  { icon: "⚗️", name: "Chemistry", description: "Understand how the world works.", color: "from-pink-500 to-rose-400", light: "bg-pink-50", text: "text-pink-700" },
  { icon: "🧬", name: "Biology", description: "Discover the science of life.", color: "from-yellow-500 to-orange-400", light: "bg-yellow-50", text: "text-yellow-700" },
];

const benefits = [
  {
    icon: "🛡️",
    title: "Trusted Opportunities",
    description: "Discover tuition posts that go through an administration approval process.",
    color: "bg-blue-100",
  },
  {
    icon: "🎯",
    title: "Better Connections",
    description: "Explore opportunities based on your subject, class and preferences.",
    color: "bg-purple-100",
  },
  {
    icon: "⚡",
    title: "Simple Experience",
    description: "A convenient platform to discover tuition opportunities and connect.",
    color: "bg-orange-100",
  },
];

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Explore Tuitions",
    description: "Browse available tuition opportunities and discover the right match.",
    color: "bg-blue-100",
  },
  {
    number: "02",
    icon: "🤝",
    title: "Apply & Connect",
    description: "Choose an opportunity and submit your application.",
    color: "bg-purple-100",
  },
  {
    number: "03",
    icon: "🎓",
    title: "Start Your Journey",
    description: "Connect with the right people and make learning meaningful.",
    color: "bg-pink-100",
  },
];

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">

          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
              <span>✨</span>
              Your journey to better learning starts here
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find The Right Tutor.
              <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Unlock Your Potential.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Whether you are looking for a tutor or searching for your next
              teaching opportunity, MentorLagbe brings learning connections
              closer to you.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/tuitions"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-center font-bold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                Explore Tuitions →
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-white bg-white/80 px-7 py-4 text-center font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-700"
              >
                Become a Tutor
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-600">
              <span>✓ Easy applications</span>
              <span>✓ Flexible opportunities</span>
              <span>✓ Simple connections</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-purple-300/60 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-blue-300/60 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-indigo-900/10 backdrop-blur sm:p-7">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Welcome to MentorLagbe</p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                    Your next opportunity
                  </h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-3xl shadow-lg shadow-blue-500/20">
                  🎓
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-5 text-white shadow-xl shadow-indigo-500/20">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                    SAMPLE OPPORTUNITY
                  </span>
                  <span className="text-xs font-semibold text-emerald-100">● Active</span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold">
                  Mathematics Tutor Needed
                </h3>

                <p className="mt-2 text-sm text-blue-100">
                  Class 9 · Offline · Dhaka
                </p>

                <div className="mt-6 flex items-end justify-between border-t border-white/20 pt-5">
                  <div>
                    <p className="text-xs text-blue-100">Illustrative monthly fee</p>
                    <p className="mt-1 text-3xl font-black">৳5,000</p>
                  </div>
                  <span className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700">
                    Explore →
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <span className="text-2xl">📚</span>
                  <p className="mt-3 text-sm font-bold text-slate-800">Learn Better</p>
                  <p className="mt-1 text-xs text-slate-500">Find learning support</p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-4">
                  <span className="text-2xl">🚀</span>
                  <p className="mt-3 text-sm font-bold text-slate-800">Grow Faster</p>
                  <p className="mt-1 text-xs text-slate-500">Discover opportunities</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-2xl">💡</span>
                <div>
                  <p className="font-extrabold text-slate-900">Learn Together</p>
                  <p className="text-xs text-slate-500">Make every lesson count</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {highlights.map((item) => (
            <div
              key={item.number || item.value}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.color}`}>
                {item.icon}
              </div>
              <p className="mt-4 text-2xl font-black text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-widest text-blue-600">
                Explore subjects
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Discover What You Love to Learn
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-500">
                Explore opportunities across popular academic subjects and take
                the next step in your learning journey.
              </p>
            </div>

            <Link href="/tuitions" className="font-bold text-blue-600 transition hover:text-purple-600">
              Explore all tuitions →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                href="/tuitions"
                key={subject.name}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`h-2 bg-gradient-to-r ${subject.color}`} />

                <div className="p-7">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${subject.light}`}>
                    {subject.icon}
                  </div>

                  <h3 className={`mt-6 text-xl font-extrabold text-slate-900 transition group-hover:${subject.text}`}>
                    {subject.name}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {subject.description}
                  </p>

                  <p className="mt-6 text-sm font-bold text-blue-600">
                    Explore opportunities ↗
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why MentorLagbe */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-widest text-purple-600">
              Why MentorLagbe
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Learning Connections Made Better
            </h2>
            <p className="mt-4 leading-7 text-slate-500">
              A simple and convenient way to discover opportunities and build
              meaningful learning connections.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${benefit.color}`}>
                  {benefit.icon}
                </div>

                <h3 className="mt-7 text-xl font-extrabold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-widest text-blue-600">
              Simple process
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              How MentorLagbe Works
            </h2>
            <p className="mt-4 text-slate-500">
              Three simple steps to get started.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white bg-white/90 p-8 shadow-lg shadow-blue-900/5 transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${step.color}`}>
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-slate-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-extrabold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-widest text-indigo-600">
              Simple pricing
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Choose Your Way to Grow
            </h2>
            <p className="mt-4 leading-7 text-slate-500">
              Get started for free or unlock more opportunities with a Pro plan.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-7 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                Free Plan
              </span>
              <h3 className="mt-6 text-3xl font-black text-slate-900">৳0</h3>
              <p className="mt-2 text-sm text-slate-500">A great place to get started.</p>

              <ul className="mt-7 space-y-4 text-sm text-slate-600">
                <li>✓ Access to platform features</li>
                <li>✓ Explore tuition opportunities</li>
                <li>✓ Standard account access</li>
              </ul>

              <Link
                href="/pricing"
                className="mt-9 block rounded-xl border border-blue-200 px-5 py-3 text-center font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Explore Free Plan
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl shadow-indigo-500/20">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white">
                  ⭐ Pro Plan
                </span>
                <h3 className="mt-6 text-3xl font-black">$15 / month</h3>
                <p className="mt-2 text-sm text-blue-100">
                  More flexibility for your growth.
                </p>

                <ul className="mt-7 space-y-4 text-sm text-blue-50">
                  <li>✓ More tuition posting opportunities for tutors</li>
                  <li>✓ Access to Pro plan benefits</li>
                  <li>✓ Flexible learning connections</li>
                </ul>

                <Link
                  href="/pricing"
                  className="mt-9 block rounded-xl bg-white px-5 py-3 text-center font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
                >
                  Explore Pro Plan
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-7 text-center text-xs text-slate-400">
            Student and tutor plans may have different pricing and benefits. See the pricing page for details.
          </p>
        </div>
      </section>

      {/* Tutor CTA */}
      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-7 py-16 text-center text-white shadow-2xl shadow-indigo-900/15 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-pink-400/20 blur-3xl" />

          <div className="relative">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-blue-100">
              For passionate educators
            </span>

            <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
              Share Your Knowledge.
              <span className="block text-blue-200">Shape Someone&apos;s Future.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100">
              Join MentorLagbe, discover teaching opportunities and connect
              with students who need your expertise.
            </p>

            <Link
              href="/register"
              className="mt-9 inline-flex rounded-xl bg-white px-8 py-4 font-extrabold text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
            >
              Start Teaching Today →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}


