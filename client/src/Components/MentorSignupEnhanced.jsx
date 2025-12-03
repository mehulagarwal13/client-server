import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, Briefcase, Loader2, Camera,
  Building2, Phone, Linkedin, Github, CheckCircle, ArrowRight, ArrowLeft,
  Globe, Clock, Award, FileText, Tag, DollarSign, Calendar, Languages
} from 'lucide-react';
import axios from 'axios';

const API_URL = '/api';

const STEPS = [
  { id: 0, title: 'Basic Profile', icon: User },
  { id: 1, title: 'Professional', icon: Briefcase },
  { id: 2, title: 'Mentorship', icon: Award },
  { id: 3, title: 'Review', icon: CheckCircle },
];

const EXPERTISE_OPTIONS = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'MongoDB',
  'TypeScript', 'AWS', 'Docker', 'Machine Learning', 'Data Science',
  'System Design', 'DevOps', 'Kubernetes', 'GraphQL', 'Mobile Development'
];

const MENTORSHIP_AREAS = [
  'Web Development', 'Data Science', 'Machine Learning', 'Mobile Development',
  'Cloud Computing', 'Cybersecurity', 'DevOps', 'UI/UX Design', 'Career Guidance',
  'Interview Preparation', 'Resume Building', 'Startup Advice', 'Leadership'
];

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic'];

const AVAILABILITY_OPTIONS = [
  { day: 'Monday', slots: ['Morning', 'Afternoon', 'Evening'] },
  { day: 'Tuesday', slots: ['Morning', 'Afternoon', 'Evening'] },
  { day: 'Wednesday', slots: ['Morning', 'Afternoon', 'Evening'] },
  { day: 'Thursday', slots: ['Morning', 'Afternoon', 'Evening'] },
  { day: 'Friday', slots: ['Morning', 'Afternoon', 'Evening'] },
  { day: 'Saturday', slots: ['Morning', 'Afternoon', 'Evening'] },
  { day: 'Sunday', slots: ['Morning', 'Afternoon', 'Evening'] },
];

const MentorSignupEnhanced = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    profilePhoto: null,
    currentJobTitle: '',
    currentCompany: '',
    yearsOfExperience: '',
    expertise: [],
    languages: ['English'],
    mentorshipAreas: [],
    availability: {},
    bio: '',
    additionalNotes: '',
    hourlyRate: '',
    terms: false,
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const toggleExpertise = (skill) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter(s => s !== skill)
        : [...prev.expertise, skill]
    }));
  };

  const toggleMentorshipArea = (area) => {
    setFormData(prev => ({
      ...prev,
      mentorshipAreas: prev.mentorshipAreas.includes(area)
        ? prev.mentorshipAreas.filter(a => a !== area)
        : [...prev.mentorshipAreas, area]
    }));
  };

  const toggleLanguage = (lang) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const toggleAvailability = (day, slot) => {
    setFormData(prev => {
      const daySlots = prev.availability[day] || [];
      const newSlots = daySlots.includes(slot)
        ? daySlots.filter(s => s !== slot)
        : [...daySlots, slot];
      return {
        ...prev,
        availability: { ...prev.availability, [day]: newSlots }
      };
    });
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      updateField('profilePhoto', file);
    }
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
      if (!formData.currentJobTitle.trim()) newErrors.currentJobTitle = 'Job title is required';
      if (!formData.currentCompany.trim()) newErrors.currentCompany = 'Company name is required';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Experience is required';
      if (formData.expertise.length === 0) newErrors.expertise = 'Select at least one skill';
    }
    
    if (currentStep === 2) {
      if (formData.mentorshipAreas.length === 0) newErrors.mentorshipAreas = 'Select at least one mentorship area';
      if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
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
        linkedinUrl: formData.linkedinUrl,
        githubUrl: formData.githubUrl,
        portfolioUrl: formData.portfolioUrl,
        currentJobTitle: formData.currentJobTitle,
        currentCompany: formData.currentCompany,
        expertise: formData.expertise.join(', '),
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        languages: formData.languages,
        mentorshipAreas: formData.mentorshipAreas,
        availability: formData.availability,
        bio: formData.bio,
        additionalNotes: formData.additionalNotes,
        hourlyRate: formData.hourlyRate,
        university: formData.currentCompany,
        course: formData.currentJobTitle,
        passingYear: new Date().getFullYear() - parseInt(formData.yearsOfExperience),
      };

      const response = await axios.post(`${API_URL}/mentor/register`, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', 'mentor');

      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/mentor-dashboard'), 1500);
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
                <h1 className="text-2xl md:text-3xl font-bold text-white">Become a Mentor</h1>
                <p className="text-white/70 mt-1">Share your expertise and inspire the next generation</p>
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
                    <User className="text-purple-400" /> Basic Profile
                  </h2>
                  
                  <div className="flex justify-center mb-6">
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-all overflow-hidden"
                    >
                      {profilePreview ? (
                        <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="text-white/50" size={32} />
                      )}
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileUpload}
                      className="hidden"
                    />
                  </div>
                  
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
                    <InputField
                      label="LinkedIn Profile"
                      icon={Linkedin}
                      value={formData.linkedinUrl}
                      onChange={(e) => updateField('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
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
                      label="Portfolio / GitHub URL"
                      icon={Github}
                      value={formData.portfolioUrl}
                      onChange={(e) => updateField('portfolioUrl', e.target.value)}
                      placeholder="https://github.com/username"
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
                    <Briefcase className="text-purple-400" /> Professional Background
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Current Job Title"
                      icon={Briefcase}
                      value={formData.currentJobTitle}
                      onChange={(e) => updateField('currentJobTitle', e.target.value)}
                      placeholder="Senior Software Engineer"
                      error={errors.currentJobTitle}
                    />
                    <InputField
                      label="Current Company"
                      icon={Building2}
                      value={formData.currentCompany}
                      onChange={(e) => updateField('currentCompany', e.target.value)}
                      placeholder="Google"
                      error={errors.currentCompany}
                    />
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Years of Experience</label>
                      <select
                        value={formData.yearsOfExperience}
                        onChange={(e) => updateField('yearsOfExperience', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select Experience</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+', '15+', '20+'].map(year => (
                          <option key={year} value={year}>{year} years</option>
                        ))}
                      </select>
                      {errors.yearsOfExperience && <p className="mt-1 text-xs text-red-400">{errors.yearsOfExperience}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Skills / Expertise</label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERTISE_OPTIONS.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleExpertise(skill)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            formData.expertise.includes(skill)
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    {errors.expertise && <p className="mt-1 text-xs text-red-400">{errors.expertise}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Languages Spoken</label>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            formData.languages.includes(lang)
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
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
                    <Award className="text-purple-400" /> Mentorship Information
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Mentorship Areas</label>
                    <div className="flex flex-wrap gap-2">
                      {MENTORSHIP_AREAS.map(area => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleMentorshipArea(area)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            formData.mentorshipAreas.includes(area)
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                    {errors.mentorshipAreas && <p className="mt-1 text-xs text-red-400">{errors.mentorshipAreas}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Availability (Select time slots)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {AVAILABILITY_OPTIONS.slice(0, 6).map(({ day, slots }) => (
                        <div key={day} className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-white font-medium text-sm mb-2">{day}</p>
                          <div className="flex flex-wrap gap-1">
                            {slots.map(slot => (
                              <button
                                key={`${day}-${slot}`}
                                type="button"
                                onClick={() => toggleAvailability(day, slot)}
                                className={`px-2 py-1 rounded text-xs transition-all ${
                                  formData.availability[day]?.includes(slot)
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Short Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      placeholder="Describe your expertise, experience, and what makes you a great mentor..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none resize-none"
                    />
                    {errors.bio && <p className="mt-1 text-xs text-red-400">{errors.bio}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Additional Notes (Optional)</label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => updateField('additionalNotes', e.target.value)}
                      placeholder="Any additional information you'd like to share..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none resize-none"
                    />
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
                    <CheckCircle className="text-purple-400" /> Review Your Profile
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReviewSection title="Basic Profile">
                      <ReviewItem label="Name" value={formData.fullName} />
                      <ReviewItem label="Email" value={formData.email} />
                      <ReviewItem label="Phone" value={formData.phone} />
                      <ReviewItem label="LinkedIn" value={formData.linkedinUrl ? 'Provided' : 'Not provided'} />
                    </ReviewSection>
                    
                    <ReviewSection title="Professional">
                      <ReviewItem label="Job Title" value={formData.currentJobTitle} />
                      <ReviewItem label="Company" value={formData.currentCompany} />
                      <ReviewItem label="Experience" value={`${formData.yearsOfExperience} years`} />
                      <ReviewItem label="Skills" value={formData.expertise.slice(0, 3).join(', ') + (formData.expertise.length > 3 ? '...' : '')} />
                    </ReviewSection>
                    
                    <ReviewSection title="Mentorship">
                      <ReviewItem label="Areas" value={formData.mentorshipAreas.slice(0, 2).join(', ') + (formData.mentorshipAreas.length > 2 ? '...' : '')} />
                      <ReviewItem label="Languages" value={formData.languages.join(', ')} />
                    </ReviewSection>
                    
                    <ReviewSection title="Bio">
                      <p className="text-white/70 text-sm line-clamp-3">{formData.bio || 'Not provided'}</p>
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
                      I agree to the Terms & Conditions and Privacy Policy. I commit to providing quality mentorship to students.
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
                    <Loader2 className="animate-spin" size={18} /> Creating Profile...
                  </>
                ) : step === STEPS.length - 1 ? (
                  <>
                    Create Profile <CheckCircle size={18} />
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

export default MentorSignupEnhanced;
