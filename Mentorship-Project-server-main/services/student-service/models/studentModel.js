import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { _id: false }
);

const studentSchema = new Schema(
  {
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
    preferredLanguage: { type: String, default: 'English' },
    location: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    bio: { type: String, default: '' },
    university: { type: String, default: '' },
    course: { type: String, default: '' },
    graduationYear: { type: String, default: '' },
    currentStatus: { type: String, default: 'Student' },
    skills: { type: [String], default: [] },
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    goals: { type: String, default: '' },
    mentorshipArea: { type: String, default: '' },
    availability: { type: [String], default: [] },
    enrollments: [enrollmentSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
