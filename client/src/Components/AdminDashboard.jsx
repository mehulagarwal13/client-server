import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, GraduationCap, Award, BarChart3, Settings, Bell, LogOut,
  UserCheck, UserX, Search, Filter, Plus, Edit, Trash2, MessageSquare,
  TrendingUp, Activity, Calendar, Eye, ChevronDown, CheckCircle, X
} from 'lucide-react';

const SAMPLE_USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'student', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'mentor', status: 'active', joined: '2024-02-20' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'student', status: 'active', joined: '2024-03-10' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'student', status: 'blocked', joined: '2024-01-05' },
  { id: 5, name: 'Emma Davis', email: 'emma@example.com', role: 'mentor', status: 'active', joined: '2024-04-12' },
  { id: 6, name: 'Frank Wilson', email: 'frank@example.com', role: 'recruiter', status: 'active', joined: '2024-05-08' },
];

const SAMPLE_COMMUNITIES = [
  { id: 1, name: 'Web Development', description: 'Learn modern web technologies', members: 156, mentor: 'Bob Smith' },
  { id: 2, name: 'Data Science', description: 'Explore data analysis and ML', members: 89, mentor: 'Emma Davis' },
  { id: 3, name: 'Career Guidance', description: 'Get career advice and tips', members: 234, mentor: 'Bob Smith' },
];

const SAMPLE_ANNOUNCEMENTS = [
  { id: 1, title: 'Platform Update', message: 'New features released this week!', target: 'all', date: '2024-12-01' },
  { id: 2, title: 'New Mentor Onboarding', message: 'Welcome our 5 new mentors.', target: 'students', date: '2024-11-28' },
  { id: 3, title: 'Session Guidelines', message: 'Updated guidelines for mentoring sessions.', target: 'mentors', date: '2024-11-25' },
];

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'communities', label: 'Communities', icon: MessageSquare },
  { id: 'announcements', label: 'Announcements', icon: Bell },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [communities, setCommunities] = useState(SAMPLE_COMMUNITIES);
  const [announcements, setAnnouncements] = useState(SAMPLE_ANNOUNCEMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ));
  };

  const changeUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    students: users.filter(u => u.role === 'student').length,
    mentors: users.filter(u => u.role === 'mentor').length,
    activeToday: Math.floor(users.length * 0.6),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900/80 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Award className="text-white" size={20} />
          </div>
          {sidebarOpen && <h1 className="text-white font-bold text-lg">Admin Panel</h1>}
        </div>

        <nav className="flex-1 space-y-2">
          {SIDEBAR_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </motion.div>

      <div className="flex-1 p-6 overflow-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Users} value={stats.totalUsers} label="Total Users" color="from-blue-500 to-cyan-500" />
                <StatCard icon={GraduationCap} value={stats.students} label="Students" color="from-purple-500 to-pink-500" />
                <StatCard icon={Award} value={stats.mentors} label="Mentors" color="from-green-500 to-emerald-500" />
                <StatCard icon={Activity} value={stats.activeToday} label="Active Today" color="from-orange-500 to-red-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">User Growth</h3>
                  <div className="h-48 flex items-end justify-around gap-2">
                    {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1 }}
                        className="w-8 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg"
                      />
                    ))}
                  </div>
                  <div className="flex justify-around mt-2 text-white/50 text-xs">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <ActivityItem text="New student registered" time="2 minutes ago" type="user" />
                    <ActivityItem text="Session completed: React Basics" time="15 minutes ago" type="session" />
                    <ActivityItem text="New mentor approved" time="1 hour ago" type="mentor" />
                    <ActivityItem text="Announcement published" time="3 hours ago" type="announcement" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <button
                  onClick={() => setShowModal('addAdmin')}
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white flex items-center gap-2"
                >
                  <Plus size={18} /> Add Admin
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Students</option>
                  <option value="mentor">Mentors</option>
                  <option value="recruiter">Recruiters</option>
                  <option value="admin">Admins</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-white/70 font-medium">Name</th>
                        <th className="text-left p-4 text-white/70 font-medium">Email</th>
                        <th className="text-left p-4 text-white/70 font-medium">Role</th>
                        <th className="text-left p-4 text-white/70 font-medium">Status</th>
                        <th className="text-left p-4 text-white/70 font-medium">Joined</th>
                        <th className="text-left p-4 text-white/70 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-4 text-white">{user.name}</td>
                          <td className="p-4 text-white/70">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-lg text-xs ${
                              user.role === 'mentor' ? 'bg-purple-500/20 text-purple-300' :
                              user.role === 'student' ? 'bg-blue-500/20 text-blue-300' :
                              user.role === 'recruiter' ? 'bg-green-500/20 text-green-300' :
                              'bg-orange-500/20 text-orange-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-lg text-xs ${
                              user.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-white/70">{user.joined}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => toggleUserStatus(user.id)}
                                className={`p-2 rounded-lg ${
                                  user.status === 'active'
                                    ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                                    : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                }`}
                              >
                                {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                              </button>
                              <select
                                value={user.role}
                                onChange={(e) => changeUserRole(user.id, e.target.value)}
                                className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs border border-white/20"
                              >
                                <option value="student">Student</option>
                                <option value="mentor">Mentor</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'communities' && (
            <motion.div
              key="communities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Community Management</h2>
                <button
                  onClick={() => setShowModal('addCommunity')}
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white flex items-center gap-2"
                >
                  <Plus size={18} /> Create Group
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communities.map(community => (
                  <div key={community.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white font-bold">{community.name}</h3>
                        <p className="text-white/60 text-sm">{community.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">{community.members} members</span>
                      <span className="text-purple-300">Mentor: {community.mentor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'announcements' && (
            <motion.div
              key="announcements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Announcements</h2>
                <button
                  onClick={() => setShowModal('addAnnouncement')}
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white flex items-center gap-2"
                >
                  <Plus size={18} /> New Announcement
                </button>
              </div>

              <div className="space-y-4">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-bold">{announcement.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            announcement.target === 'all' ? 'bg-blue-500/20 text-blue-300' :
                            announcement.target === 'students' ? 'bg-green-500/20 text-green-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {announcement.target}
                          </span>
                        </div>
                        <p className="text-white/70">{announcement.message}</p>
                        <span className="text-white/40 text-sm mt-2 block">{announcement.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Users} value="1,234" label="Total Users" color="from-blue-500 to-cyan-500" />
                <StatCard icon={Activity} value="892" label="Daily Active" color="from-green-500 to-emerald-500" />
                <StatCard icon={MessageSquare} value="3,456" label="Messages Sent" color="from-purple-500 to-pink-500" />
                <StatCard icon={Calendar} value="156" label="Sessions This Week" color="from-orange-500 to-red-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Daily Active Users</h3>
                  <div className="h-48 flex items-end justify-around gap-2">
                    {[60, 75, 55, 85, 70, 95, 80].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1 }}
                        className="w-8 bg-gradient-to-t from-green-500 to-emerald-500 rounded-t-lg"
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Most Active Communities</h3>
                  <div className="space-y-4">
                    <CommunityBar name="Web Development" value={85} />
                    <CommunityBar name="Data Science" value={72} />
                    <CommunityBar name="Career Guidance" value={68} />
                    <CommunityBar name="DSA Practice" value={55} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Platform Settings</h3>
                <div className="space-y-4">
                  <SettingToggle label="Allow new registrations" defaultChecked />
                  <SettingToggle label="Require email verification" defaultChecked />
                  <SettingToggle label="Enable community chat" defaultChecked />
                  <SettingToggle label="Allow file uploads" defaultChecked />
                  <SettingToggle label="Maintenance mode" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal onClose={() => setShowModal(null)} type={showModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
      <Icon className="text-white" size={24} />
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className="text-white/60">{label}</p>
  </div>
);

const ActivityItem = ({ text, time, type }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      type === 'user' ? 'bg-blue-500/20 text-blue-300' :
      type === 'session' ? 'bg-green-500/20 text-green-300' :
      type === 'mentor' ? 'bg-purple-500/20 text-purple-300' :
      'bg-orange-500/20 text-orange-300'
    }`}>
      {type === 'user' ? <Users size={14} /> :
       type === 'session' ? <Calendar size={14} /> :
       type === 'mentor' ? <Award size={14} /> :
       <Bell size={14} />}
    </div>
    <div className="flex-1">
      <p className="text-white text-sm">{text}</p>
      <span className="text-white/40 text-xs">{time}</span>
    </div>
  </div>
);

const CommunityBar = ({ name, value }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-white">{name}</span>
      <span className="text-white/60">{value}%</span>
    </div>
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
      />
    </div>
  </div>
);

const SettingToggle = ({ label, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
      <span className="text-white">{label}</span>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full transition-all ${checked ? 'bg-purple-500' : 'bg-white/20'}`}
      >
        <motion.div
          animate={{ x: checked ? 24 : 2 }}
          className="w-5 h-5 rounded-full bg-white"
        />
      </button>
    </div>
  );
};

const Modal = ({ onClose, type }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      onClick={e => e.stopPropagation()}
      className="bg-slate-900 rounded-3xl p-6 w-full max-w-md border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          {type === 'addAdmin' ? 'Add New Admin' :
           type === 'addCommunity' ? 'Create Community' :
           'Create Announcement'}
        </h3>
        <button onClick={onClose} className="text-white/50 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4">
        {type === 'addAdmin' && (
          <>
            <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white" />
          </>
        )}
        {type === 'addCommunity' && (
          <>
            <input type="text" placeholder="Group Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white" />
            <textarea placeholder="Description" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white resize-none" />
            <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white">
              <option>Select Mentor</option>
              <option>Bob Smith</option>
              <option>Emma Davis</option>
            </select>
          </>
        )}
        {type === 'addAnnouncement' && (
          <>
            <input type="text" placeholder="Title" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white" />
            <textarea placeholder="Message" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white resize-none" />
            <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white">
              <option value="all">All Users</option>
              <option value="students">Students Only</option>
              <option value="mentors">Mentors Only</option>
            </select>
          </>
        )}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
        >
          {type === 'addAdmin' ? 'Add Admin' :
           type === 'addCommunity' ? 'Create Group' :
           'Publish Announcement'}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default AdminDashboard;
