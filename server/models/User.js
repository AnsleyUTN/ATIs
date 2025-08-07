import mongoose, { modelNames } from "mongoose";

/**
 * @file User.js
 * @description This file defines the Mongoose schema and model for the User entity.
 * It outlines the structure, validation rules, and data types for user data
 * stored in the MongoDB database.
 */

/**
 * Mongoose schema for a User.
 *
 * This schema defines the following fields:
 * - `name`: The user's full name.
 * - `email`: A unique and required email address for the user, used for login.
 * - `password`: The hashed password for the user, which is a required field.
 * - `address`: The user's physical address.
 * - `role`: The user's role, restricted to a predefined list (`admin`, `customer`).
 *
 * The schema also includes validation rules to ensure data integrity.
 */
const userSchema = new mongoose.Schema({
  // The user's name. It is an optional string.
  name: {type: String},
   // The user's email. It is required and must be unique across all users.
  email: {type: String, require: true, unique: true},
   // The user's password. It is a required field and will be stored as a hashed string.
  password: {type: String, require: true},
  // The user's address. It is an optional string.
  address: {type: String},
   // The user's role. It is an enum with a default value of "customer".
  role: {type: String, enum:["admin", "customer"] ,default: "customer"}
})

/**
 * Mongoose model for the `User` schema.
 *
 * This model provides an interface for interacting with the "users" collection in the database.
 */
const User = mongoose.model("User", userSchema);
export default User;
