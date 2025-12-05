import bcrypt from "bcryptjs";
import { generateToken } from "../../student-service/utils/jwtUtils.js";
import Mentor from "../models/mentor.js";
import { sendResetEmail } from "../utils/sendEmail.js";
import crypto from 'crypto';

const register = async (req, res) => {
  try {
    const { 
      email, password, expertise, bio, university, course, passingYear,
      fullName, phone, linkedinUrl, githubUrl, portfolioUrl,
      currentJobTitle, currentCompany, yearsOfExperience, languages,
      mentorshipAreas, availability, additionalNotes, hourlyRate
    } = req.body;

    const existingUser = await Mentor.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const newUser = new Mentor({
      email,
      password,
      expertise: expertise || '',
      bio: bio || '',
      university: university || currentCompany || '',
      course: course || currentJobTitle || '',
      passingYear: passingYear || '',
      fullName: fullName || '',
      phone: phone || '',
      linkedinUrl: linkedinUrl || '',
      githubUrl: githubUrl || '',
      portfolioUrl: portfolioUrl || '',
      currentJobTitle: currentJobTitle || '',
      currentCompany: currentCompany || '',
      yearsOfExperience: yearsOfExperience || 0,
      languages: languages || ['English'],
      mentorshipAreas: mentorshipAreas || [],
      availability: availability || {},
      additionalNotes: additionalNotes || '',
      hourlyRate: hourlyRate || '',
    });

    await newUser.save();
    console.log("Mentor registered Successfully");
    
    const token = generateToken(newUser);
    
    return res.status(201).json({ 
      msg: "Mentor created successfully",
      token: token,
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        expertise: newUser.expertise,
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Mentor.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = generateToken(user);

    console.log(`Token: ${token}`);
    res.status(200).json({
      status: "success",
      message: "Login Successful",
      token: token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName || user.email.split('@')[0],
        expertise: user.expertise,
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};

export const browseMentors = async (req, res) => {
  try {
    // Get all mentors (public info only, no sensitive data)
    const mentors = await Mentor.find({})
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .lean();
    
    return res.status(200).json(mentors);
  } catch (error) {
    console.error('[Browse Mentors] Error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export { register, login };


// ----- Forgot Password -----
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const mentor = await Mentor.findOne({ email });
    if (!mentor) return res.status(404).json({ msg: "Mentor not found" });

    const token = crypto.randomBytes(32).toString("hex");
    mentor.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    mentor.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await mentor.save({ validateBeforeSave: false });

    await sendResetEmail(mentor, token);
    res.status(200).json({ msg: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ----- Reset Password -----
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const mentor = await Mentor.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!mentor) return res.status(400).json({ msg: "Invalid or expired token" });

    mentor.password = password; // hashed by pre-save hook
    mentor.resetPasswordToken = undefined;
    mentor.resetPasswordExpires = undefined;

    await mentor.save();
    res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};