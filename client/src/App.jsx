import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import StudentSignup from "./Components/StudentSignup";
import LandingPage from "./Pages/LandingPage";
import Role from "./Components/role";
import AuthPage from "./Components/Login";
import MentorSignup from "./Components/Mentorsignup";
import MentorDashboard from "./Components/MentorDashboard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Components/Footer";
import RecruiterSignup from "./Components/RecruiterSignup";
import StudentProfile from "./Components/StudentProfile";
import RecruiterProfile from "./Components/RecruiterProfile";
import RecruiterBrowse from "./Components/RecruiterBrowse";
import StudentBrowse from "./Components/StudentBrowse";
import StudentDashboard from "./Components/StudentDashboard";
import RecruiterDashboard from "./Components/RecruiterDashboard";
import Messages from "./Components/Messages";
import Community from "./Components/Community";
import ProtectedRoute from "./Components/ProtectedRoute";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Chatroom from "./Components/Chatroom";
import "slick-carousel/slick/slick.css";
import Features from "./Components/Features";

const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/role" element={<Role />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/mentor-signup" element={<MentorSignup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatroom" element={<Chatroom />} />
        {/* Recruiter Routes */}
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
        <Route path="/recruiter-profile" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterProfile /></ProtectedRoute>} />
        <Route path="/recruiter-browse" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterBrowse /></ProtectedRoute>} />
        <Route path="/recruiter-dashboard" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
        {/* Student Routes */}
        <Route path="/student-profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
        <Route path="/student-browse" element={<ProtectedRoute allowedRoles={['student']}><StudentBrowse /></ProtectedRoute>} />
        <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
        {/* Mentor Routes */}
        <Route path="/mentor-dashboard" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboard /></ProtectedRoute>} />
        {/* Messaging */}
        <Route path="/messages/:userId" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        {/* Community */}
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
