import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
/**
 * @file authController.js
 * @description This file contains the controller function for handling user login and authentication.
 */

/**
 * Handles user login authentication.
 *
 * This function performs the following steps:
 * 1. Extracts email and password from the request body.
 * 2. Searches for a user with the provided email in the database.
 * 3. Compares the provided password with the stored hashed password using bcrypt.
 * 4. Generates a JSON Web Token (JWT) upon successful authentication.
 * 5. Sends a success response with the token and user data, or an error response.
 *
 * @param {object} req - The Express request object, containing the user's email and password in the body.
 * @param {object} res - The Express response object, used to send back the API response.
 * @returns {object} The Express response, which includes a success status, a message, and the JWT and user data if successful.
 */

const login = async (req, res) => {
  try {
     // Extract email and password from the request body.
    const {email, password} = req.body;

     // Find the user by their email in the database.
    const user = await User.findOne({email});

    // If no user is found with that email, return an error.
    if (!user) {
      return res.status(401).json({success:false, message: "User not found" });
    }

    // Compare the provided password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return an error.
    if (!isMatch) {
      return res.status(401).json({success:false, message: "Invalid credentials" });
    }

    // If login is successful, create a JSON Web Token (JWT).
    // The token payload includes the user's ID and role, and it's set to expire in 90 days.
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '90d' });

    // Return a success response with the token and selected user data.
    return res.status(200).json({success:true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});


  } catch (error) {
    return res.status(500).json({success:false, message: "Internal server error" });
  }
}

export {login};
