import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MessageCircle,
  UserCircle,
  Network,
  Shield,
  Search,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  Lock,
  FileText,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Bell,
  Filter,
} from "lucide-react";

const Features = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // ==========================
  // FEATURE DATA (COLORS UPDATED)
  // ==========================

  const featuresByRole = {
    all: [
      {
        icon: <Search className="w-8 h-8" />,
        title: "Flashcard Matching System",
        description:
          "Connect students with recruiters using a smooth swipe-based matching experience.",
        color: "from-indigo-600 to-sky-500",
        bgColor: "bg-indigo-50",
        details: [
          "Swipe-style browsing experience",
          "Students & recruiters discover matches",
          "Smooth drag & drop animation",
          "Quick connect in a single swipe",
        ],
      },
      {
        icon: <MessageCircle className="w-8 h-8" />,
        title: "Real-Time Messaging",
        description:
          "Instant one-on-one conversations with real-time delivery and attachments.",
        color: "from-sky-500 to-indigo-500",
        bgColor: "bg-sky-50",
        details: [
          "Direct chat messaging",
          "Real-time notifications",
          "File & document sharing",
          "Conversation threads",
        ],
      },
      {
        icon: <Network className="w-8 h-8" />,
        title: "Smart Connection System",
        description:
          "Send, accept, and manage meaningful professional connections.",
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-50",
        details: [
          "Connection request management",
          "Track pending & approved",
          "Network organization tools",
        ],
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Community Hub",
        description:
          "Discover students, mentors, and recruiters with powerful search filters.",
        color: "from-indigo-700 to-indigo-500",
        bgColor: "bg-indigo-50",
        details: [
          "Browse network profiles",
          "Search by skills & roles",
          "View detailed user profiles",
        ],
      },
      {
        icon: <UserCircle className="w-8 h-8" />,
        title: "Profile Management",
        description:
          "Build a complete professional identity with skills, education, and projects.",
        color: "from-cyan-600 to-teal-500",
        bgColor: "bg-cyan-50",
        details: [
          "Skills & portfolio entries",
          "Experience tracking",
          "Resume & LinkedIn links",
        ],
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Secure Platform",
        description:
          "Enterprise-grade authentication and privacy-focused architecture.",
        color: "from-slate-700 to-slate-500",
        bgColor: "bg-slate-100",
        details: [
          "JWT authentication",
          "Role-based access",
          "Protected routes",
        ],
      },
    ],

    student: [
      {
        icon: <GraduationCap className="w-8 h-8" />,
        title: "Student Dashboard",
        description:
          "Track connections, applications, and progress — all in one place.",
        color: "from-indigo-600 to-indigo-400",
        bgColor: "bg-indigo-50",
        details: [
          "Profile completion insights",
          "Active recruiter connections",
          "Real-time updates",
        ],
      },
      {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Browse Recruiters",
        description:
          "Swipe through recruiters and explore hiring opportunities.",
        color: "from-sky-500 to-indigo-500",
        bgColor: "bg-sky-50",
        details: [
          "Company insights",
          "Skill expectations",
          "Instant connect",
        ],
      },
      {
        icon: <FileText className="w-8 h-8" />,
        title: "Professional Profile",
        description:
          "Showcase projects, achievements, certifications, and skills.",
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-50",
        details: [
          "Projects & GitHub",
          "Education & achievements",
          "Resume & docs",
        ],
      },
      {
        icon: <MessageCircle className="w-8 h-8" />,
        title: "Direct Messaging",
        description:
          "Engage directly with recruiters and discuss opportunities.",
        color: "from-cyan-500 to-indigo-500",
        bgColor: "bg-cyan-50",
        details: ["Real-time chat", "File sharing", "Message threads"],
      },
    ],

    recruiter: [
      {
        icon: <Users className="w-8 h-8" />,
        title: "Recruiter Dashboard",
        description:
          "Manage hiring pipeline and candidate interactions efficiently.",
        color: "from-violet-500 to-indigo-500",
        bgColor: "bg-violet-50",
        details: [
          "Candidate activity",
          "Hiring pipeline overview",
          "Company profile tools",
        ],
      },
      {
        icon: <Search className="w-8 h-8" />,
        title: "Browse Students",
        description:
          "Discover top candidates using skill & education filters.",
        color: "from-indigo-600 to-sky-500",
        bgColor: "bg-indigo-50",
        details: [
          "Skill-based discovery",
          "Portfolio & project insights",
          "Instant connect",
        ],
      },
      {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Company Profile",
        description:
          "Showcase brand presence, culture, and hiring expectations.",
        color: "from-indigo-700 to-indigo-500",
        bgColor: "bg-indigo-50",
        details: [
          "Company branding",
          "Hiring roles & values",
          "Contact preferences",
        ],
      },
      {
        icon: <Filter className="w-8 h-8" />,
        title: "Smart Candidate Discovery",
        description:
          "Search and match candidates with precision filters.",
        color: "from-cyan-500 to-emerald-500",
        bgColor: "bg-cyan-50",
        details: [
          "Advanced filters",
          "Education criteria",
          "Community browsing",
        ],
      },
    ],

    mentor: [
      {
        icon: <Award className="w-8 h-8" />,
        title: "Mentor Dashboard",
        description:
          "Track mentorship engagement and guided students.",
        color: "from-indigo-600 to-sky-500",
        bgColor: "bg-indigo-50",
        details: [
          "Student progress tracking",
          "Community insights",
          "Availability status",
        ],
      },
      {
        icon: <MessageCircle className="w-8 h-8" />,
        title: "Community Chatroom",
        description:
          "Guide students and share knowledge in real-time discussions.",
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-50",
        details: [
          "Group mentoring",
          "Career guidance",
          "Knowledge sharing",
        ],
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Student Engagement",
        description:
          "Connect with motivated learners who seek guidance.",
        color: "from-sky-500 to-indigo-500",
        bgColor: "bg-sky-50",
        details: [
          "One-to-one support",
          "Learning resources",
          "Project help",
        ],
      },
      {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Expertise Showcase",
        description:
          "Highlight your professional experience & mentoring areas.",
        color: "from-amber-500 to-amber-400",
        bgColor: "bg-amber-50",
        details: [
          "Expertise areas",
          "Industry background",
          "Mentorship style",
        ],
      },
    ],
  };

  const responsiveFeatures = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Optimized for smartphone experience",
    },
    {
      icon: <Tablet className="w-6 h-6" />,
      title: "Tablet Ready",
      description: "Smooth responsive layouts",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Desktop Experience",
      description: "Full-scale professional interface",
    },
  ];

  const currentFeatures = featuresByRole[activeTab] || featuresByRole.all;

  // ==========================
  // UI RENDER
  // ==========================

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900 relative overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-300 to-sky-300 opacity-30 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-200 to-cyan-200 opacity-25 blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Platform Features
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
              Connect & Grow
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TechLearn Hub connects students, recruiters, and mentors through
            matching, messaging, networking, and community tools.
          </p>
        </motion.div>
      </section>

      {/* TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: "all", label: "All Features", icon: <Zap className="w-4 h-4" /> },
            { id: "student", label: "Students", icon: <GraduationCap className="w-4 h-4" /> },
            { id: "recruiter", label: "Recruiters", icon: <Briefcase className="w-4 h-4" /> },
            { id: "mentor", label: "Mentors", icon: <Award className="w-4 h-4" /> },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border transition"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-gray-600 mt-1">{feature.description}</p>

              <ul className="mt-3 space-y-2">
                {feature.details?.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RESPONSIVE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-indigo-600 to-sky-500 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Fully Responsive Experience</h2>
            <p className="opacity-90 max-w-2xl mx-auto">
              Seamlessly optimized across mobile, tablet, and large screens.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {responsiveFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm opacity-90">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Teams Trust{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
            TechLearn Hub
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Zap />, title: "Fast & Responsive", description: "Optimized performance for instant actions" },
            { icon: <Lock />, title: "Secure & Private", description: "Protected with enterprise-grade security" },
            { icon: <Globe />, title: "Access Anywhere", description: "Works seamlessly across locations" },
            { icon: <Bell />, title: "Real-Time Alerts", description: "Stay updated instantly" },
          ].map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-center bg-white rounded-xl p-6 border shadow hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white flex items-center justify-center mx-auto mb-3">
                {h.icon}
              </div>
              <h3 className="font-semibold">{h.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{h.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-sky-500 rounded-3xl p-10 text-white text-center shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="opacity-90 max-w-2xl mx-auto mb-6">
            Join our growing community — connect, collaborate, and unlock opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/role")}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow"
            >
              Get Started <ArrowRight className="inline w-5 h-5 ml-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-white/20 border border-white/30 rounded-xl"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Features;
