import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, GraduationCap, School, Loader2,
  Building2, Phone, MapPin, Calendar, FileText, Briefcase, Target,
  Clock, Upload, Github, Linkedin, CheckCircle, ArrowRight, ArrowLeft,
  Globe, BookOpen, Award
} from 'lucide-react';
import axios from 'axios';

const API_URL = '/api';

const STEPS = [
  { id: 0, title: 'Basic Info', icon: User },
  { id: 1, title: 'Education', icon: GraduationCap },
  { id: 2, title: 'Career', icon: Briefcase },
  { id: 3, title: 'Review', icon: CheckCircle },
];

const SKILLS_OPTIONS = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'MongoDB',
  'TypeScript', 'HTML/CSS', 'Git', 'AWS', 'Docker', 'Machine Learning',
  'Data Science', 'UI/UX Design', 'Mobile Development', 'DevOps'
];

const MENTORSHIP_AREAS = [
  'Web Development', 'Data Science', 'Machine Learning', 'Mobile Development',
  'Cloud Computing', 'Cybersecurity', 'DevOps', 'UI/UX Design', 'Career Guidance',
  'Interview Preparation', 'Resume Building', 'Soft Skills'
];

const AVAILABILITY_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = ['Morning (9AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-9PM)'];

const StudentSignupEnhanced = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    preferredLanguage: 'English',
    profilePhoto: null,
    location: '',
    dateOfBirth: '',
    bio: '',
    course: '',
    collegeName: '',
    graduationYear: '',
    currentStatus: 'Student',
    skills: [],
    linkedinUrl: '',
    githubUrl: '',
    goals: '',
    mentorshipArea: '',
    availability: [],
    resume: null,
    terms: false,
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleAvailability = (slot) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter(s => s !== slot)
        : [...prev.availability, slot]
    }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    
    if (currentStep === 1) {
      if (!formData.course.trim()) newErrors.course = 'Course is required';
      if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
      if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
    }
    
    if (currentStep === 2) {
      if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
      if (!formData.goals.trim()) newErrors.goals = 'Please describe your goals';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(s => Math.min(STEPS.length - 1, s + 1));
    }
  };

  const handleBack = () => {
    setStep(s => Math.max(0, s - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== STEPS.length - 1) {
      handleNext();
      return;
    }

    if (!formData.terms) {
      setErrors({ terms: 'You must accept the terms and conditions' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        preferredLanguage: formData.preferredLanguage,
        location: formData.location,
        dateOfBirth: formData.dateOfBirth,
        bio: formData.bio,
        university: formData.collegeName,
        course: formData.course,
        graduationYear: formData.graduationYear,
        currentStatus: formData.currentStatus,
        skills: formData.skills,
        linkedinUrl: formData.linkedinUrl,
        githubUrl: formData.githubUrl,
        goals: formData.goals,
        mentorshipArea: formData.mentorshipArea,
        availability: formData.availability,
      };
      
      console.log('[StudentSignup] Sending payload:', payload);

      const response = await axios.post(`${API_URL}/student/register`, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });

      localStorage.setItem('token', response.data.token);
      // Save user data including skills and mentorshipArea for mentor recommendations
      const userData = {
        ...response.data.user,
        skills: formData.skills,
        mentorshipArea: formData.mentorshipArea
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', 'student');

      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/student-dashboard'), 1500);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.msg || 'Registration failed. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Student Registration</h1>
                <p className="text-white/70 mt-1">Create your account in a few simple steps</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-sm text-white/60">Step {step + 1}/{STEPS.length}</span>
                <div className="flex-1 md:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-2">
              {STEPS.map((stepConfig, index) => {
                const Icon = stepConfig.icon;
                const isActive = step >= stepConfig.id;
                const isCompleted = step > stepConfig.id;
                return (
                  <React.Fragment key={stepConfig.id}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <motion.div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/40 border-2 border-white/20'
                        }`}
                        animate={{ scale: step === stepConfig.id ? [1, 1.1, 1] : 1 }}
                      >
                        <Icon size={20} />
                      </motion.div>
                      <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/50'}`}>
                        {stepConfig.title}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={`w-8 md:w-12 h-0.5 ${isCompleted ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="text-purple-400" /> Basic Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      icon={User}
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="John Doe"
                      error={errors.fullName}
                    />
                    <InputField
                      label="Email Address"
                      icon={Mail}
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@example.com"
                      error={errors.email}
                    />
                    <InputField
                      label="Phone Number"
                      icon={Phone}
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 234 567 8900"
                      error={errors.phone}
                    />
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Preferred Language</label>
                      <select
                        value={formData.preferredLanguage}
                        onChange={(e) => updateField('preferredLanguage', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                    </div>
                    <PasswordField
                      label="Password"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      show={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                      error={errors.password}
                    />
                    <PasswordField
                      label="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      show={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                      error={errors.confirmPassword}
                    />
                    <InputField
                      label="Location / City"
                      icon={MapPin}
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      placeholder="New York, USA"
                    />
                    <InputField
                      label="Date of Birth"
                      icon={Calendar}
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Short Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      placeholder="Tell us a bit about yourself..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="text-purple-400" /> Education Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Course / Branch"
                      icon={BookOpen}
                      value={formData.course}
                      onChange={(e) => updateField('course', e.target.value)}
                      placeholder="Computer Science"
                      error={errors.course}
                    />
                    <InputField
                      label="College Name"
                      icon={Building2}
                      value={formData.collegeName}
                      onChange={(e) => updateField('collegeName', e.target.value)}
                      placeholder="MIT"
                      error={errors.collegeName}
                    />
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Graduation Year</label>
                      <select
                        value={formData.graduationYear}
                        onChange={(e) => updateField('graduationYear', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select Year</option>
                        {[2024, 2025, 2026, 2027, 2028, 2029].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.graduationYear && <p className="mt-1 text-xs text-red-400">{errors.graduationYear}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="text-purple-400" /> Career & Learning
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Current Status</label>
                    <div className="flex flex-wrap gap-3">
                      {['Student', 'Job Seeker', 'Working'].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateField('currentStatus', status)}
                          className={`px-4 py-2 rounded-xl transition-all ${
                            formData.currentStatus === status
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Skills (Select all that apply)</label>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS_OPTIONS.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            formData.skills.includes(skill)
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    {errors.skills && <p className="mt-1 text-xs text-red-400">{errors.skills}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="LinkedIn Profile"
                      icon={Linkedin}
                      value={formData.linkedinUrl}
                      onChange={(e) => updateField('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                    <InputField
                      label="GitHub Profile"
                      icon={Github}
                      value={formData.githubUrl}
                      onChange={(e) => updateField('githubUrl', e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Your Goals</label>
                    <textarea
                      value={formData.goals}
                      onChange={(e) => updateField('goals', e.target.value)}
                      placeholder="What are you looking to achieve? What kind of guidance do you need?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none resize-none"
                    />
                    {errors.goals && <p className="mt-1 text-xs text-red-400">{errors.goals}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Mentorship Area</label>
                    <select
                      value={formData.mentorshipArea}
                      onChange={(e) => updateField('mentorshipArea', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select Area</option>
                      {MENTORSHIP_AREAS.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Availability</label>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleAvailability(slot)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            formData.availability.includes(slot)
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="text-purple-400" /> Review Your Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReviewSection title="Personal Info">
                      <ReviewItem label="Name" value={formData.fullName} />
                      <ReviewItem label="Email" value={formData.email} />
                      <ReviewItem label="Phone" value={formData.phone} />
                      <ReviewItem label="Location" value={formData.location} />
                    </ReviewSection>
                    
                    <ReviewSection title="Education">
                      <ReviewItem label="Course" value={formData.course} />
                      <ReviewItem label="College" value={formData.collegeName} />
                      <ReviewItem label="Graduation" value={formData.graduationYear} />
                    </ReviewSection>
                    
                    <ReviewSection title="Career">
                      <ReviewItem label="Status" value={formData.currentStatus} />
                      <ReviewItem label="Skills" value={formData.skills.join(', ') || 'None selected'} />
                      <ReviewItem label="Mentorship" value={formData.mentorshipArea} />
                    </ReviewSection>
                    
                    <ReviewSection title="Goals">
                      <p className="text-white/70 text-sm">{formData.goals || 'Not specified'}</p>
                    </ReviewSection>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.terms}
                      onChange={(e) => updateField('terms', e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-purple-500"
                    />
                    <label htmlFor="terms" className="text-sm text-white/80">
                      I agree to the Terms & Conditions and Privacy Policy. I understand that my information will be used to provide mentorship services.
                    </label>
                  </div>
                  {errors.terms && <p className="text-xs text-red-400">{errors.terms}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 flex items-center gap-2"
              >
                <CheckCircle size={20} /> {successMessage}
              </motion.div>
            )}

            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300"
              >
                {errors.submit}
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={18} /> Back
                </button>
              ) : (
                <div />
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Creating Account...
                  </>
                ) : step === STEPS.length - 1 ? (
                  <>
                    Create Account <CheckCircle size={18} />
                  </>
                ) : (
                  <>
                    Next <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <p className="text-center text-white/60 mt-6">
          Already have an account? <a href="/login" className="text-purple-400 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, icon: Icon, type = 'text', value, onChange, placeholder, error }) => (
  <div>
    <label className="block text-sm font-medium text-white/90 mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 rounded-xl bg-white/5 border-2 ${
          error ? 'border-red-500/50' : 'border-white/20'
        } text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none transition-all`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

const PasswordField = ({ label, value, onChange, show, onToggle, error }) => (
  <div>
    <label className="block text-sm font-medium text-white/90 mb-2">{label}</label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border-2 ${
          error ? 'border-red-500/50' : 'border-white/20'
        } text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none transition-all`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

const ReviewSection = ({ title, children }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
    <h3 className="text-white font-semibold mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const ReviewItem = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-white/50">{label}</span>
    <span className="text-white">{value || '-'}</span>
  </div>
);

export default StudentSignupEnhanced;
