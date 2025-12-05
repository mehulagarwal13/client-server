import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { hashPasswordHook } from "../hooks/mentorHooks.js";

const { Schema } = mongoose;

const mentorSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  fullName: { type: String, default: '' },
  phone: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  portfolioUrl: { type: String, default: '' },
  expertise: { type: String, default: '' },
  bio: { type: String, default: '' },
  university: { type: String, default: '' },
  course: { type: String, default: '' },
  passingYear: { type: Number, default: 2024 },
  currentJobTitle: { type: String, default: '' },
  currentCompany: { type: String, default: '' },
  yearsOfExperience: { type: Number, default: 0 },
  languages: { type: [String], default: ['English'] },
  mentorshipAreas: { type: [String], default: [] },
  availability: { type: Schema.Types.Mixed, default: {} },
  additionalNotes: { type: String, default: '' },
  hourlyRate: { type: String, default: '' },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

mentorSchema.pre('save', hashPasswordHook);

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
