import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unavailable! No token provided!",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token!",
      });
    }

    const existingUser = await User.findById(decodedToken.userId).select(
      "-password"
    );
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }

    // Check if the user is an admin
    if (existingUser.role === "admin") {
      req.user = existingUser; // Attach the user to the request object
      return next(); // Allow the request to proceed
    }

    // If the user is not an admin, deny access
    return res.status(403).json({
      success: false,
      message: "Forbidden - Only admin is allowed!",
    });
  } catch (error) {
    console.log("Error in isAdmin middleware:", error.message);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};
