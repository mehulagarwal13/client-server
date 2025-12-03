import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  getEnrollments,
  enrollInCourse,
  getCourseProgress,
  addToWishlist,
  getWishlist,
  postReview,
  login,
  register,
  getDashboard,
  forgotPassword,
  resetPassword,
} from "../controllers/studentController.js";
import { protect, getAuthUser } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.use(protect);

router.route("/dashboard").get(getDashboard);
router.route("/profile").get(getStudentProfile).put(updateStudentProfile);
router.route("/enrollments").get(getEnrollments);
router.route("/enroll").post(enrollInCourse);
router.route("/progress/:courseId").get(getCourseProgress);
router.route("/wishlist").get(getWishlist).post(addToWishlist);
router.route("/review").post(postReview);

export default router;
