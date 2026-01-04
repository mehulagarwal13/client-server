import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");

      setTimeout(() => setStatus("idle"), 2000);
    }, 900);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-50 to-white overflow-hidden">

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-300/40 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-300/40 blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-12 md:grid-cols-2 items-start">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Let’s{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
              Connect & Collaborate
            </span>
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            Have feedback, questions, or an idea to discuss?
            We’d love to hear from you — our team usually responds within 24 hours.
          </p>

          <div className="mt-8 space-y-4 text-gray-800">

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              hello@techlearnhub.com
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-600" />
              +91-800-123-5678
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              India • Remote-first
            </div>
          </div>

          {/* Social buttons */}
          <div className="mt-8 flex items-center gap-4">
            <a
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-white shadow-sm hover:shadow-md hover:border-indigo-300 transition"
              href="#"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>

            <a
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-white shadow-sm hover:shadow-md hover:border-indigo-300 transition"
              href="#"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl p-6 sm:p-8"
        >
          {/* glow border */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-sky-400/20 blur-xl -z-10" />

          <div className="grid gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/70 backdrop-blur focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Email
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="jane@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/70 backdrop-blur focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/70 backdrop-blur resize-y focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={status === "submitting"}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 shadow-lg hover:shadow-xl transition disabled:opacity-60"
            >
              <Send className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />

              {status === "submitting"
                ? "Sending…"
                : status === "success"
                ? "Sent!"
                : "Send Message"}
            </button>
          </div>

          {/* Decorative accent */}
          <div className="pointer-events-none absolute -top-5 -right-5 w-24 h-24 rounded-full bg-indigo-400/40 blur-2xl" />
        </motion.form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translateY(0px) }
          50% { transform: translateY(18px) }
          100% { transform: translateY(0px) }
        }
        .animate-blob { animation: blob 7s ease-in-out infinite }
        .animation-delay-2000 { animation-delay: 2s }
      `}</style>
    </div>
  );
}
