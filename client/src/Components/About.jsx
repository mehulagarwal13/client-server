import React from "react";
import { motion } from "framer-motion";
import { Heart, Rocket, Target, Sparkles } from "lucide-react";
import img1 from "../assets/mentor.png";
import img2 from "../assets/s2.jpg";
import img3 from "../assets/s3.jpg";

export default function About() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-50 to-white overflow-hidden text-gray-900">

      {/* soft ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-300/40 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-300/40 blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase font-semibold text-indigo-600 tracking-widest">
            About Us
          </p>

          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight">
            Turning learners into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
              builders of tomorrow
            </span>
          </h1>

          <p className="mt-4 text-gray-600 max-w-xl">
            We are a mentor-led learning community — connecting passionate
            students with experienced mentors to build real-world projects
            together.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Trusted by 1,000+ learners
          </div>
        </motion.div>

        {/* Hero Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="relative w-[320px] sm:w-[420px]">

            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-sky-400/20 blur-2xl rounded-3xl" />

            <img
              src={img1}
              alt="team"
              className="relative rounded-2xl shadow-2xl border border-white/40"
            />

            <div className="absolute -left-3 -top-3 px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs shadow">
              Mentor-Led
            </div>

            <div className="absolute right-1 -bottom-4 bg-white/90 px-3 py-2 rounded-lg shadow text-sm">
              Live Cohorts • Projects
            </div>
          </div>
        </motion.div>
      </section>

      {/* VALUES / MISSION */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

        <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-lg transition p-6">
          <Heart className="w-6 h-6 text-rose-500" />
          <h3 className="mt-3 font-semibold text-lg">Our Mission</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Make high-quality mentorship accessible to every motivated learner
            through collaboration, community and real-world building.
          </p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-lg transition p-6">
          <Target className="w-6 h-6 text-indigo-600" />
          <h3 className="mt-3 font-semibold text-lg">What We Value</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Clarity, kindness and momentum — progress over perfection
            and outcomes over vanity metrics.
          </p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-lg transition p-6">
          <Rocket className="w-6 h-6 text-sky-600" />
          <h3 className="mt-3 font-semibold text-lg">How We Work</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Live sessions, async feedback and peer groups —
            you learn by building with mentors who’ve done it.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-center">Meet the Team</h2>
        <p className="text-center text-gray-600">
          A small team with a big heart ❤️
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[ 
            { img: img2, name: "Aarav Gupta", role: "Founder • Mentor" },
            { img: img3, name: "Meera Shah", role: "Program Lead" },
            { img: img1, name: "Dev Mentor", role: "Senior Mentor" }
          ].map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border border-gray-100"
            >
              <img
                src={m.img}
                alt="member"
                className="w-24 h-24 rounded-full object-cover mx-auto shadow border"
              />

              <h4 className="mt-4 font-semibold text-center">
                {m.name}
              </h4>

              <p className="text-sm text-gray-600 text-center">
                {m.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-16 pt-4">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">

          <div>
            <h3 className="text-2xl font-bold">Join the Community</h3>
            <p className="mt-1 opacity-90">
              Learn with mentors, build projects, and grow faster.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/role"
              className="px-5 py-3 rounded-lg bg-white text-indigo-700 font-semibold shadow"
            >
              Become a Member
            </a>

            <a
              href="/contact"
              className="px-5 py-3 rounded-lg bg-white/20 backdrop-blur border border-white/30"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translateY(0px) }
          50% { transform: translateY(16px) }
          100% { transform: translateY(0px) }
        }
        .animate-blob { animation: blob 7s ease-in-out infinite }
        .animation-delay-2000 { animation-delay: 2s }
      `}</style>
    </div>
  );
}
