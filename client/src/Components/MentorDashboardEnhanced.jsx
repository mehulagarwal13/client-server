import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Users, GraduationCap, LogOut, Settings, MessageSquare,
  Calendar, Clock, Video, Plus, X, CheckCircle, AlertCircle, User,
  Mail, Eye, Reply, Bell, TrendingUp, Award, ChevronRight
} from 'lucide-react';
import axios from 'axios';

const API_URL = '/api';

const SAMPLE_MENTEES = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', interest: 'Web Development', lastActive: '2 hours ago', avatar: 'A' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', interest: 'Data Science', lastActive: '1 day ago', avatar: 'B' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', interest: 'Machine Learning', lastActive: '3 hours ago', avatar: 'C' },
  { id: 4, name: 'David Brown', email: 'david@example.com', interest: 'DevOps', lastActive: 'Just now', avatar: 'D' },
];

const SAMPLE_SESSIONS = [
  { id: 1, title: 'React Fundamentals', date: '2024-12-05', time: '10:00 AM', mode: 'Online', link: 'https://meet.google.com/abc-def', student: 'Alice Johnson' },
  { id: 2, title: 'System Design Basics', date: '2024-12-06', time: '2:00 PM', mode: 'Online', link: 'https://zoom.us/j/123456', student: 'Bob Smith' },
  { id: 3, title: 'Career Guidance', date: '2024-12-07', time: '11:00 AM', mode: 'Offline', link: '', student: 'Carol White' },
];

const SAMPLE_DOUBTS = [
  { id: 1, student: 'Alice Johnson', question: 'How do I implement authentication in React?', time: '1 hour ago', status: 'pending' },
  { id: 2, student: 'Bob Smith', question: 'Can you explain the difference between SQL and NoSQL?', time: '3 hours ago', status: 'pending' },
  { id: 3, student: 'David Brown', question: 'What are the best practices for Docker containerization?', time: '1 day ago', status: 'answered' },
];

const COMMUNITY_GROUPS = [
  { id: 1, name: '#general', members: 156, lastMessage: 'Great session today!' },
  { id: 2, name: '#web-dev', members: 89, lastMessage: 'Anyone tried Next.js 14?' },
  { id: 3, name: '#dsa', members: 124, lastMessage: 'Tips for dynamic programming?' },
];

const MentorDashboardEnhanced = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Mentor');
  const [activeTab, setActiveTab] = useState('overview');
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    mode: 'Online',
    link: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.fullName || user.email) {
      setUserName(user.fullName || user.email.split('@')[0]);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleCreateSession = () => {
    console.log('Creating session:', newSession);
    setShowSessionModal(false);
    setNewSession({ title: '', date: '', time: '', mode: 'Online', link: '' });
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
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome, {userName}! 🎓
              </h1>
              <p className="text-white/80">Guide students and share your knowledge with the community.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/chatroom')}
                className="px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <MessageSquare size={18} /> Community
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
          <StatCard icon={Users} value={SAMPLE_MENTEES.length} label="Total Mentees" color="from-blue-500 to-cyan-500" delay={0} />
          <StatCard icon={Calendar} value={SAMPLE_SESSIONS.length} label="Upcoming Sessions" color="from-purple-500 to-pink-500" delay={0.1} />
          <StatCard icon={AlertCircle} value={SAMPLE_DOUBTS.filter(d => d.status === 'pending').length} label="Pending Doubts" color="from-orange-500 to-red-500" delay={0.2} />
          <StatCard icon={MessageCircle} value="12" label="Messages Today" color="from-green-500 to-emerald-500" delay={0.3} />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['overview', 'mentees', 'sessions', 'doubts'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users size={24} /> Recent Mentees
                  </h2>
                  <button onClick={() => setActiveTab('mentees')} className="text-purple-400 text-sm">View All</button>
                </div>
                <div className="space-y-3">
                  {SAMPLE_MENTEES.slice(0, 3).map(mentee => (
                    <MenteeCard key={mentee.id} mentee={mentee} compact />
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <AlertCircle size={24} /> Pending Doubts
                  </h2>
                  <button onClick={() => setActiveTab('doubts')} className="text-purple-400 text-sm">View All</button>
                </div>
                <div className="space-y-3">
                  {SAMPLE_DOUBTS.filter(d => d.status === 'pending').slice(0, 2).map(doubt => (
                    <DoubtCard key={doubt.id} doubt={doubt} />
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquare size={24} /> Community Groups
                  </h2>
                </div>
                <div className="space-y-3">
                  {COMMUNITY_GROUPS.map(group => (
                    <div
                      key={group.id}
                      onClick={() => navigate('/chatroom')}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{group.name}</h3>
                          <p className="text-white/50 text-xs">{group.members} members</p>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs">
                          Open Chat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar size={24} /> Upcoming Sessions
                  </h2>
                  <button
                    onClick={() => setShowSessionModal(true)}
                    className="px-3 py-1 rounded-lg bg-purple-500 text-white text-sm flex items-center gap-1"
                  >
                    <Plus size={14} /> New
                  </button>
                </div>
                <div className="space-y-3">
                  {SAMPLE_SESSIONS.slice(0, 2).map(session => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'mentees' && (
            <motion.div
              key="mentees"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users size={24} /> All Mentees
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAMPLE_MENTEES.map(mentee => (
                  <MenteeCard key={mentee.id} mentee={mentee} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'sessions' && (
            <motion.div
              key="sessions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar size={24} /> Session Management
                </h2>
                <button
                  onClick={() => setShowSessionModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white flex items-center gap-2"
                >
                  <Plus size={18} /> Create Session
                </button>
              </div>
              <div className="space-y-4">
                {SAMPLE_SESSIONS.map(session => (
                  <SessionCard key={session.id} session={session} showActions />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'doubts' && (
            <motion.div
              key="doubts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle size={24} /> Doubt Management
              </h2>
              <div className="space-y-4">
                {SAMPLE_DOUBTS.map(doubt => (
                  <DoubtCard key={doubt.id} doubt={doubt} showActions />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSessionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowSessionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-slate-900 rounded-3xl p-6 w-full max-w-md border border-white/20"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Create New Session</h3>
                  <button onClick={() => setShowSessionModal(false)} className="text-white/50 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Title</label>
                    <input
                      type="text"
                      value={newSession.title}
                      onChange={e => setNewSession({ ...newSession, title: e.target.value })}
                      placeholder="Session title"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Date</label>
                      <input
                        type="date"
                        value={newSession.date}
                        onChange={e => setNewSession({ ...newSession, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Time</label>
                      <input
                        type="time"
                        value={newSession.time}
                        onChange={e => setNewSession({ ...newSession, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Mode</label>
                    <div className="flex gap-3">
                      {['Online', 'Offline'].map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setNewSession({ ...newSession, mode })}
                          className={`flex-1 py-2 rounded-xl transition-all ${
                            newSession.mode === mode
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {newSession.mode === 'Online' && (
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Meeting Link</label>
                      <input
                        type="url"
                        value={newSession.link}
                        onChange={e => setNewSession({ ...newSession, link: e.target.value })}
                        placeholder="https://meet.google.com/..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  )}
                  
                  <button
                    onClick={handleCreateSession}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
                  >
                    Create Session
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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

const MenteeCard = ({ mentee, compact }) => (
  <div className={`bg-white/5 rounded-xl ${compact ? 'p-3' : 'p-4'} border border-white/10 hover:bg-white/10 transition-all`}>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
        {mentee.avatar}
      </div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-sm">{mentee.name}</h3>
        <p className="text-white/50 text-xs">{mentee.interest}</p>
        {!compact && <p className="text-white/40 text-xs">{mentee.email}</p>}
      </div>
      <div className="text-right">
        <span className="text-white/40 text-xs">{mentee.lastActive}</span>
        {!compact && (
          <div className="flex gap-2 mt-2">
            <button className="px-2 py-1 rounded bg-white/10 text-white/70 text-xs hover:bg-white/20">
              <Eye size={12} />
            </button>
            <button className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs hover:bg-purple-500/30">
              <MessageCircle size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const SessionCard = ({ session, showActions }) => (
  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-white font-semibold">{session.title}</h3>
        <p className="text-white/50 text-sm">with {session.student}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-white/60 text-xs flex items-center gap-1">
            <Calendar size={12} /> {session.date}
          </span>
          <span className="text-white/60 text-xs flex items-center gap-1">
            <Clock size={12} /> {session.time}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${session.mode === 'Online' ? 'bg-green-500/20 text-green-300' : 'bg-orange-500/20 text-orange-300'}`}>
            {session.mode}
          </span>
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20">
            <Video size={16} />
          </button>
          <button className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  </div>
);

const DoubtCard = ({ doubt, showActions }) => (
  <div className={`bg-white/5 rounded-xl p-4 border border-white/10 ${doubt.status === 'answered' ? 'opacity-60' : ''}`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-medium text-sm">{doubt.student}</span>
          <span className="text-white/40 text-xs">{doubt.time}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${doubt.status === 'pending' ? 'bg-orange-500/20 text-orange-300' : 'bg-green-500/20 text-green-300'}`}>
            {doubt.status}
          </span>
        </div>
        <p className="text-white/80 text-sm">{doubt.question}</p>
      </div>
      {showActions && doubt.status === 'pending' && (
        <button className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-sm flex items-center gap-1 ml-4">
          <Reply size={14} /> Reply
        </button>
      )}
    </div>
  </div>
);

export default MentorDashboardEnhanced;
