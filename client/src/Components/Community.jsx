import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Users,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Sparkles,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  Star,
  ArrowRight,
  X,
} from 'lucide-react';
import axios from 'axios';

const API_URL = '/api';

const Community = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, students, recruiters, mentors
  const [skillFilter, setSkillFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [studentsRes, recruitersRes, mentorsRes] = await Promise.all([
        axios.get(`${API_URL}/student/browse`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/recruiter/browse`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/mentor/browse`, { headers }).catch(() => ({ data: [] }))
      ]);

      setStudents(studentsRes.data || []);
      setRecruiters(recruitersRes.data || []);
      setMentors(mentorsRes.data || []);
    } catch (error) {
      console.error('Error fetching community:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         student.education?.institution?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !skillFilter || student.skills?.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    return matchesSearch && matchesSkill;
  });

  const filteredRecruiters = recruiters.filter((recruiter) => {
    return recruiter.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           recruiter.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           recruiter.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           recruiter.lookingFor?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const filteredMentors = mentors.filter((mentor) => {
    return mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           mentor.areaOfExpertise?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           mentor.company?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getDisplayItems = () => {
    switch (selectedFilter) {
      case 'students':
        return filteredStudents;
      case 'recruiters':
        return filteredRecruiters;
      case 'mentors':
        return filteredMentors;
      default:
        return [...filteredStudents, ...filteredRecruiters, ...filteredMentors];
    }
  };

  const displayItems = getDisplayItems();

  const getItemType = (item) => {
    if (item.skills !== undefined && item.education !== undefined) return 'student';
    if (item.companyName !== undefined) return 'recruiter';
    return 'mentor';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F7FF] to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7FF] to-white text-gray-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 opacity-30 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-300 to-cyan-300 opacity-25 blur-3xl animate-blob animation-delay-2000" />
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
            <Users className="w-4 h-4" />
            Our Community
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Connect with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Amazing People
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover students, recruiters, and mentors in our vibrant community. Build connections, share knowledge, and grow together.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { label: 'Students', count: students.length, icon: <GraduationCap className="w-6 h-6" />, color: 'from-blue-500 to-indigo-500' },
            { label: 'Recruiters', count: recruiters.length, icon: <Briefcase className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
            { label: 'Mentors', count: mentors.length, icon: <Award className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-white mx-auto mb-3`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, skills, company, or expertise..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', label: 'All Members', icon: <Users className="w-4 h-4" />, count: students.length + recruiters.length + mentors.length },
              { id: 'students', label: 'Students', icon: <GraduationCap className="w-4 h-4" />, count: students.length },
              { id: 'recruiters', label: 'Recruiters', icon: <Briefcase className="w-4 h-4" />, count: recruiters.length },
              { id: 'mentors', label: 'Mentors', icon: <Award className="w-4 h-4" />, count: mentors.length },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedFilter(tab.id);
                  setSkillFilter('');
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {tab.icon}
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedFilter === tab.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Skill Filter for Students */}
          {selectedFilter === 'students' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="relative"
            >
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                placeholder="Filter by skill (e.g., React, Python, UI/UX)..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Community Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item, index) => {
              const type = getItemType(item);
              const isStudent = type === 'student';
              const isRecruiter = type === 'recruiter';
              const isMentor = type === 'mentor';

              return (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
                  onClick={() => {
                    if (isStudent) {
                      navigate(`/student-profile`);
                    } else if (isRecruiter) {
                      navigate(`/recruiter-profile`);
                    } else {
                      navigate(`/mentor-dashboard`);
                    }
                  }}
                >
                  {/* Avatar */}
                  <div className="text-center mb-4">
                    <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg ${
                      isStudent
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500'
                        : isRecruiter
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                        : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    }`}>
                      {item.fullName?.charAt(0)?.toUpperCase() || item.companyName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {item.fullName || item.companyName}
                    </h3>
                    {isStudent && item.education?.institution && (
                      <p className="text-sm text-gray-600 mb-2">{item.education.institution}</p>
                    )}
                    {isRecruiter && item.companyName && (
                      <p className="text-sm text-gray-600 mb-2">{item.designation || 'Recruiter'}</p>
                    )}
                    {isMentor && item.company && (
                      <p className="text-sm text-gray-600 mb-2">{item.company}</p>
                    )}
                    {item.location && (
                      <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-3">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills/Expertise */}
                  {isStudent && item.skills && item.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {item.skills.length > 4 && (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                            +{item.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {isRecruiter && item.lookingFor && item.lookingFor.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 text-center">Looking for:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.lookingFor.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {isMentor && item.areaOfExpertise && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 text-center">Expertise:</p>
                      <div className="text-center">
                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                          {item.areaOfExpertise}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bio/Description */}
                  {item.bio && (
                    <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                      {item.bio}
                    </p>
                  )}

                  {/* Type Badge */}
                  <div className={`text-center px-4 py-2 rounded-xl text-sm font-semibold ${
                    isStudent
                      ? 'bg-blue-50 text-blue-600'
                      : isRecruiter
                      ? 'bg-purple-50 text-purple-600'
                      : 'bg-green-50 text-green-600'
                  }`}>
                    {isStudent ? 'Student' : isRecruiter ? 'Recruiter' : 'Mentor'}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSkillFilter('');
                setSelectedFilter('all');
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Become part of a thriving network of students, recruiters, and mentors. Connect, learn, and grow together.
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
              onClick={() => navigate("/features")}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all"
            >
              Explore Features
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
      `}</style>
    </div>
  );
};

export default Community;

