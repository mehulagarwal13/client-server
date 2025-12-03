import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MessageCircle,
  UserCircle,
  Network,
  Shield,
  Upload,
  Search,
  Heart,
  X,
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

  // Feature categories
  const featuresByRole = {
    all: [
      {
        icon: <Search className="w-8 h-8" />,
        title: "Flashcard Matching System",
        description: "Connect students with recruiters through an intuitive swipe-based interface. Students browse company opportunities while recruiters discover top talent.",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        details: [
          "Tinder-style swipe interface for easy browsing",
          "Students swipe through recruiter profiles",
          "Recruiters swipe through student profiles",
          "Drag and drop interactions with smooth animations",
          "Quick connect with a single swipe",
        ],
      },
      {
        icon: <MessageCircle className="w-8 h-8" />,
        title: "Real-Time Messaging",
        description: "Instant one-on-one messaging between connected users. Chat seamlessly with text, share files, and stay connected.",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        details: [
          "Direct messaging between students and recruiters",
          "Real-time message delivery",
          "File and document sharing",
          "Message history and conversation threads",
          "Notification system for new messages",
        ],
      },
      {
        icon: <Network className="w-8 h-8" />,
        title: "Smart Connection System",
        description: "Build your professional network. Send connection requests, manage pending requests, and track your connections all in one place.",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        details: [
          "Send connection requests to users",
          "Accept or reject incoming requests",
          "View all active connections",
          "Track connection status (pending/accepted/rejected)",
          "Manage your professional network",
        ],
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Community Hub",
        description: "Explore our vibrant community of students, recruiters, and mentors. Search by skills, filter by role, and discover amazing people.",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        details: [
          "Browse all community members",
          "Search by name, skills, or company",
          "Filter by role (student/recruiter/mentor)",
          "View detailed member profiles",
          "Connect directly from community page",
        ],
      },
      {
        icon: <UserCircle className="w-8 h-8" />,
        title: "Comprehensive Profile Management",
        description: "Create detailed professional profiles showcasing your skills, education, experience, and achievements.",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        details: [
          "Skills management with easy add/remove",
          "Education and experience tracking",
          "Portfolio and resume links",
          "Profile picture uploads",
          "Real-time profile updates",
        ],
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Secure & Protected Platform",
        description: "Enterprise-grade security with role-based access control. Your data is safe and your privacy is protected.",
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-50",
        details: [
          "JWT-based authentication system",
          "Role-based access control (Student/Recruiter/Mentor)",
          "Protected routes and API endpoints",
          "Secure password hashing",
          "Privacy-focused design",
        ],
      },
    ],
    student: [
      {
        icon: <GraduationCap className="w-8 h-8" />,
        title: "Student Dashboard",
        description: "Your personalized command center. Track profile completion, view connection requests, and manage your job search all from one place.",
        color: "from-blue-500 to-indigo-500",
        bgColor: "bg-blue-50",
        details: [
          "Profile completion tracking",
          "Pending connection requests",
          "Active recruiter connections",
          "Quick access to browse and profile",
          "Real-time updates and notifications",
        ],
      },
      {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Browse Recruiters",
        description: "Discover exciting job opportunities. Swipe through recruiter profiles, learn about companies, and connect with employers looking for your skills.",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        details: [
          "Swipe through recruiter/company profiles",
          "View company details and opportunities",
          "See skills they're looking for",
          "Send connection requests instantly",
          "Track your browsing progress",
        ],
      },
      {
        icon: <FileText className="w-8 h-8" />,
        title: "Professional Profile",
        description: "Build a standout profile that showcases your skills, education, projects, and achievements to attract the right opportunities.",
        color: "from-green-500 to-teal-500",
        bgColor: "bg-green-50",
        details: [
          "Add skills and technologies",
          "Education and certifications",
          "Project portfolio and GitHub links",
          "Resume and LinkedIn integration",
          "Profile picture and bio",
        ],
      },
      {
        icon: <MessageCircle className="w-8 h-8" />,
        title: "Direct Messaging",
        description: "Communicate directly with recruiters who want to connect. Discuss opportunities, ask questions, and build relationships.",
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-50",
        details: [
          "Chat with connected recruiters",
          "Share files and documents",
          "Real-time message notifications",
          "Message history and threads",
        ],
      },
    ],
    recruiter: [
      {
        icon: <Users className="w-8 h-8" />,
        title: "Recruiter Dashboard",
        description: "Manage your hiring pipeline efficiently. View connection requests, track active connections, and monitor your recruitment activities.",
        color: "from-pink-500 to-rose-500",
        bgColor: "bg-pink-50",
        details: [
          "View all connection requests",
          "Track pending and accepted connections",
          "Monitor hiring pipeline",
          "Quick access to browse students",
          "Company profile management",
        ],
      },
      {
        icon: <Search className="w-8 h-8" />,
        title: "Browse Students",
        description: "Find the perfect candidates for your open positions. Swipe through student profiles, review skills, and discover top talent.",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        details: [
          "Swipe through student profiles",
          "View skills, education, and experience",
          "See portfolio and project links",
          "Filter by skills and qualifications",
          "Send connection requests instantly",
        ],
      },
      {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Company Profile",
        description: "Create an attractive company profile that showcases your opportunities, culture, and what you're looking for in candidates.",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        details: [
          "Company name and branding",
          "Industry and company details",
          "Skills you're looking for",
          "Company description and values",
          "Contact information",
        ],
      },
      {
        icon: <Filter className="w-8 h-8" />,
        title: "Smart Candidate Discovery",
        description: "Find candidates that match your requirements. Search and filter by skills, education, experience, and more.",
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-50",
        details: [
          "Search by specific skills",
          "Filter by education level",
          "Browse community members",
          "Advanced search capabilities",
        ],
      },
    ],
    mentor: [
      {
        icon: <Award className="w-8 h-8" />,
        title: "Mentor Dashboard",
        description: "Your mentorship hub. Track students you've helped, view community engagement, and manage your availability.",
        color: "from-purple-500 to-indigo-500",
        bgColor: "bg-purple-50",
        details: [
          "Track students mentored",
          "View community contributions",
          "Monitor your availability status",
          "Quick access to chatroom",
          "Mentorship statistics",
        ],
      },
      {
        icon: <MessageCircle className="w-8 h-8" />,
        title: "Community Chatroom",
        description: "Engage with students in real-time. Answer questions, share knowledge, provide guidance, and help students grow in their tech journey.",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        details: [
          "Real-time community chatroom",
          "Engage with multiple students",
          "Answer questions and provide guidance",
          "Share resources and tips",
          "Build mentorship relationships",
        ],
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Student Engagement",
        description: "Connect with motivated students seeking guidance. Share your expertise and help them build real-world skills.",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        details: [
          "Interact with students in chatroom",
          "Provide one-on-one guidance",
          "Share learning resources",
          "Help with projects and career advice",
        ],
      },
      {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Expertise Showcase",
        description: "Highlight your area of expertise, industry experience, and skills. Let students know how you can help them succeed.",
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-50",
        details: [
          "Display your expertise areas",
          "Share your experience and background",
          "Company and role information",
          "Availability and mentorship style",
        ],
      },
    ],
  };

  const responsiveFeatures = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Fully responsive design that works perfectly on all devices",
    },
    {
      icon: <Tablet className="w-6 h-6" />,
      title: "Tablet Optimized",
      description: "Seamless experience on tablets with touch-friendly interactions",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Desktop Ready",
      description: "Full-featured experience on desktop with advanced capabilities",
    },
  ];

  const currentFeatures = featuresByRole[activeTab] || featuresByRole.all;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7FF] to-white text-gray-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 opacity-30 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-300 to-cyan-300 opacity-25 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-300 opacity-20 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Connect & Grow
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            TechLearn Hub connects students with recruiters and mentors in one powerful platform. Discover matching, messaging, and community features designed to help you succeed.
          </p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: "all", label: "All Features", icon: <Zap className="w-4 h-4" /> },
            { id: "student", label: "For Students", icon: <GraduationCap className="w-4 h-4" /> },
            { id: "recruiter", label: "For Recruiters", icon: <Briefcase className="w-4 h-4" /> },
            { id: "mentor", label: "For Mentors", icon: <Award className="w-4 h-4" /> },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {currentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

              {/* Details List */}
              {feature.details && (
                <ul className="space-y-2 mb-4">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity -z-10`} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Responsive Design Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Fully Responsive Design</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Experience TechLearn Hub seamlessly across all devices - from mobile phones to large desktop screens.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {responsiveFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">TechLearn Hub</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Lightning Fast",
              description: "Optimized performance for instant interactions",
            },
            {
              icon: <Lock className="w-6 h-6" />,
              title: "Secure & Private",
              description: "Your data is protected with industry-standard security",
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: "Always Available",
              description: "Access your account from anywhere, anytime",
            },
            {
              icon: <Bell className="w-6 h-6" />,
              title: "Real-Time Updates",
              description: "Get instant notifications for connections and messages",
            },
          ].map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                {highlight.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
              <p className="text-sm text-gray-600">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join our community of students finding opportunities, recruiters discovering talent, and mentors guiding the next generation. Connect, learn, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/role")}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all"
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
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Features;
