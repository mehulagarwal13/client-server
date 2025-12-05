import express from 'express'
import { forgotPassword, login, register, resetPassword, browseMentors } from '../controllers/mentorController.js';

const router= express.Router();
router.post('/register',register);
router.post('/login',login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get('/browse', browseMentors); // Public endpoint - no auth required

export default router;