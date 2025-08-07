import express, { json } from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import authRoutes from './routes/auth.js';

/**
 * @file index.js
 * @description The main server file for the backend application. This file sets up the Express server,
 * configures middleware, connects to the database, and starts the server.
 */

// Initialize a new Express application.
const app = express();
// --- Middleware Configuration ---
// `cors()`: Enables Cross-Origin Resource Sharing for all origins.
// This allows your frontend application (on a different domain) to make requests to this API.
app.use(cors());
// `express.json()`: Middleware that parses incoming requests with JSON payloads.
// This makes it easy to access data sent in the request body (e.g., in a login request).
app.use(express.json());

// --- Routes Configuration ---
// Mounts the authentication routes on the `/api/auth` path.
// All routes defined in `authRoutes` will be prefixed with `/api/auth`.
app.use('/api/auth', authRoutes);

// --- Server Startup ---
// The server listens for connections on the port specified in the environment variables.
app.listen(process.env.PORT, () => {
  // Connect to the database as soon as the server starts listening.
  connectDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
