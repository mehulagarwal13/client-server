import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";

// Protect routes that require a logged-in student
const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token using the shared secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // NOTE: our JWT payload is { id, email, role }, see utils/jwtUtils.js

      // 4. Find the student by the id from the token
      const studentProfile = await Student.findById(decoded.id);

      if (!studentProfile) {
        return res
          .status(401)
          .json({ message: "Not authorized, student profile not found" });
      }
      req.student = studentProfile;

      return next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error("[Student Auth] Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }
  return res.status(401).json({ message: "Not authorized, no token" });
};

export { protect };
