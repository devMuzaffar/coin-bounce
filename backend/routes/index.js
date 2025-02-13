import express from 'express';
import authController from '../controller/authController.js';
const router = express.Router();

// 
// User Routes
// 

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
// Refresh

// 
// Blog
// 

// CRUD
// Create
// Read All Blogs
// Read Blog by ID
// Update
// Delete

// 
// Comment
// 

// Create Comment
// Read Comments by blog ID


export default router;