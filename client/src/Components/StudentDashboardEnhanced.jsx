import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, MessageCircle, UserCheck, X, CheckCircle, TrendingUp, Bell,
  Briefcase, GraduationCap, FileText, LogOut, Settings, Users, Calendar,
  BookOpen, Target, Clock, Award, ChevronRight, Play, MessageSquare, Flame
} from 'lucide-react';
import axios from 'axios';

const API_URL = '/api';

const ROADMAPS = [
  { id: 1, title: 'Web Development', progress: 65, level: 'Intermediate', color: 'from-blue-500 to-cyan-500' },
  { id: 2, title: 'Data Structures & Algorithms', progress: 40, level: 'Beginner', color: 'from-purple-500 to-pink-500' },
  { id: 3, title: 'Career Skills', progress: 80, level: 'Advanced', color: 'from-green-500 to-emerald-500' },
];

const UPCOMING_SESSIONS = [
  { id: 1, title: 'React Best Practices', mentor: 'John Smith', date: 'Today, 3:00 PM', type: 'Live' },
  { id: 2, title: 'System Design Basics', mentor: 'Sarah Johnson', date: 'Tomorrow, 11:00 AM', type: 'Video Call' },
  { id: 3, title: 'Resume Review', mentor: 'Mike Chen', date: 'Dec 5, 2:00 PM', type: 'One-on-One' },
];

const ANNOUNCEMENTS = [
  { id: 1, title: 'New Mentor Added!', message: 'Welcome our new mentor specializing in Machine Learning.', time: '2 hours ago', type: 'info' },
  { id: 2, title: 'Community Event', message: 'Join our weekly coding challenge this Saturday.', time: '1 day ago', type: 'event' },
  { id: 3, title: 'Resource Update', message: 'New study materials added for React Native development.', time: '3 days ago', type: 'resource' },
];

const QUICK_ACTIONS = [
  { icon: BookOpen, label: 'Study Material', color: 'bg-blue-500/20 text-blue-300', path: '/student-browse' },
  { icon: FileText, label: 'Assignments', color: 'bg-purple-500/20 text-purple-300', path: '/student-browse' },
  { icon: MessageSquare, label: 'Community Chat', color: 'bg-green-500/20 text-green-300', path: '/chatroom' },
  { icon: User, label: 'Profile', color: 'bg-orange-500/20 text-orange-300', path: '/student-profile' },
  { icon: Settings, label: 'Settings', color: 'bg-gray-500/20 text-gray-300', path: '/student-profile' },
];

const StudentDashboardEnhanced = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    fetchDashboardData();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.fullName || user.email) {
      setUserName(user.fullName || user.email.split('@')[0]);
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/student/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      // Set fallback data if API fails
      setDashboardData({
        profileCompletion: 75,
        pendingRequests: [],
        acceptedConnections: [],
        totalConnections: 0,
        upcomingSessions: [],
        announcements: [
          { id: 1, title: 'Welcome!', message: 'Welcome to TechLearn Platform', time: 'Just now' },
          { id: 2, title: 'New Features', message: 'Check out our new mentorship features', time: '1 day ago' },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-white/80">Continue your learning journey and achieve your goals.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/student-profile')}
                className="px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Settings size={18} /> Profile
              </button>
              <button
                onClick={() => navigate('/student-browse')}
                className="px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Users size={18} /> Browse Mentors
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={BookOpen}
            value="3"
            label="Enrolled Programs"
            color="from-blue-500 to-cyan-500"
            delay={0}
          />
          <StatCard
            icon={CheckCircle}
            value="12"
            label="Sessions Completed"
            color="from-green-500 to-emerald-500"
            delay={0.1}
          />
          <StatCard
            icon={Flame}
            value="7"
            label="Day Streak"
            color="from-orange-500 to-red-500"
            delay={0.2}
          />
          <StatCard
            icon={Award}
            value={`${dashboardData?.profileCompletion || 75}%`}
            label="Profile Complete"
            color="from-purple-500 to-pink-500"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Target size={24} /> Learning Roadmaps
              </h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {ROADMAPS.map((roadmap, index) => (
                <motion.div
                  key={roadmap.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{roadmap.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${roadmap.color} text-white`}>
                        {roadmap.level}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-white">{roadmap.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${roadmap.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${roadmap.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar size={24} /> Upcoming Sessions
              </h2>
            </div>
            <div className="space-y-4">
              {UPCOMING_SESSIONS.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 rounded-2xl p-4 border border-white/10"
                >
                  <h3 className="text-white font-semibold text-sm mb-1">{session.title}</h3>
                  <p className="text-white/60 text-xs mb-2">with {session.mentor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs flex items-center gap-1">
                      <Clock size={12} /> {session.date}
                    </span>
                    <button className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs hover:bg-purple-500/30 transition-all flex items-center gap-1">
                      <Play size={12} /> Join
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell size={24} /> Announcements
              </h2>
            </div>
            <div className="space-y-4">
              {ANNOUNCEMENTS.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-white font-medium text-sm mb-1">{announcement.title}</h3>
                  <p className="text-white/60 text-xs mb-2">{announcement.message}</p>
                  <span className="text-white/40 text-xs">{announcement.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare size={24} /> Community Chat
              </h2>
              <button
                onClick={() => navigate('/chatroom')}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Open Chat
              </button>
            </div>
            <div className="space-y-3">
              <ChatPreview name="Sarah M." message="Has anyone tried the new React 19 features?" time="2m ago" />
              <ChatPreview name="John D." message="The DSA session yesterday was really helpful!" time="15m ago" />
              <ChatPreview name="Mike T." message="Looking for study partners for system design..." time="1h ago" />
            </div>
            <button
              onClick={() => navigate('/chatroom')}
              className="w-full mt-4 py-3 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all text-sm"
            >
              Join Conversation
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => navigate(action.path)}
                    className={`p-4 rounded-xl ${action.color} hover:scale-105 transition-all flex flex-col items-center gap-2`}
                  >
                    <Icon size={24} />
                    <span className="text-xs font-medium">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {dashboardData?.pendingRequests?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <UserCheck size={24} /> Pending Connection Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.pendingRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white/5 rounded-2xl p-4 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {request.recruiter?.companyName?.charAt(0) || 'R'}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{request.recruiter?.companyName}</h3>
                      <p className="text-white/60 text-xs">{request.recruiter?.fullName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-all text-sm">
                      Accept
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all text-sm">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
  >
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-3`}>
      <Icon className="text-white" size={20} />
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-white/60 text-sm">{label}</p>
  </motion.div>
);

const ChatPreview = ({ name, message, time }) => (
  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
      {name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-white text-sm font-medium">{name}</span>
        <span className="text-white/40 text-xs">{time}</span>
      </div>
      <p className="text-white/60 text-xs truncate">{message}</p>
    </div>
  </div>
);

export default StudentDashboardEnhanced;
