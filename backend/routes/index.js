import express from "express";
import authController from "../controller/authController.js";
import blogController from "../controller/blogController.js";
import auth from "../middlewares/auth.js";
import commentController from "../controller/commentController.js";
const router = express.Router();

//
// User Routes
//

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", auth, authController.logout);

// Refresh
router.get("/refresh", authController.refresh);

//
// Blog
//

// Create
router.post("/blog", auth, blogController.create);

// Get All Blogs
router.get("/blog/all", auth, blogController.getAll);

// Get Blog by ID
router.get("/blog/:id", auth, blogController.getById);

// Update
router.put("/blog", auth, blogController.update);

// Delete
router.delete("/blog/:id", auth, blogController.deleteBlog);

//
// Comment
//

// Create Comment
router.post("/comment", auth, commentController.create);

// Get Comments by blog ID
router.get("/comment/:id", auth, commentController.getById);

export default router;
