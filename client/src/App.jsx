import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Role from "./Components/role";
import AuthPage from "./Components/Login";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Components/Footer";
import RecruiterSignup from "./Components/RecruiterSignup";
import StudentProfile from "./Components/StudentProfile";
import RecruiterProfile from "./Components/RecruiterProfile";
import RecruiterBrowse from "./Components/RecruiterBrowse";
import StudentBrowse from "./Components/StudentBrowse";
import RecruiterDashboard from "./Components/RecruiterDashboard";
import Messages from "./Components/Messages";
import Community from "./Components/Community";
import ProtectedRoute from "./Components/ProtectedRoute";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Chatroom from "./Components/Chatroom";
import "slick-carousel/slick/slick.css";
import Features from "./Components/Features";

import StudentSignupEnhanced from "./Components/StudentSignupEnhanced";
import MentorSignupEnhanced from "./Components/MentorSignupEnhanced";
import StudentDashboardEnhanced from "./Components/StudentDashboardEnhanced";
import MentorDashboardEnhanced from "./Components/MentorDashboardEnhanced";
import AdminDashboard from "./Components/AdminDashboard";

const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/role" element={<Role />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/student-signup" element={<StudentSignupEnhanced />} />
        <Route path="/mentor-signup" element={<MentorSignupEnhanced />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatroom" element={<Chatroom />} />
        
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
        <Route path="/recruiter-profile" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterProfile /></ProtectedRoute>} />
        <Route path="/recruiter-browse" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterBrowse /></ProtectedRoute>} />
        <Route path="/recruiter-dashboard" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
        
        <Route path="/student-profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
        <Route path="/student-browse" element={<ProtectedRoute allowedRoles={['student']}><StudentBrowse /></ProtectedRoute>} />
        <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboardEnhanced /></ProtectedRoute>} />
        
        <Route path="/mentor-dashboard" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboardEnhanced /></ProtectedRoute>} />
        
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        
        <Route path="/messages/:userId" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
