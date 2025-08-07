import bcrypt from 'bcrypt';
import User from './models/User.js'
import connectDB from './db/connection.js';

/**
 * @file seed.js
 * @description A utility script for creating an initial admin user in the database.
 * This script connects to the database, hashes a default password, and saves a new
 * user record with an 'admin' role.
 */

/**
 * Registers a new admin user.
 *
 * This function performs the following steps:
 * 1. Establishes a connection to the MongoDB database.
 * 2. Hashes the default password "admin" using bcrypt for security.
 * 3. Creates a new `User` instance with predefined admin credentials.
 * 4. Saves the new user to the database.
 * 5. Logs a success message to the console, or an error if the process fails.
 */
const register = async () => {
  try{
    // Connect to the database.
    connectDB();

    // Hash the default password for the admin user.
    const hashPassword = await bcrypt.hash("admin", 10);

     // Create a new User instance with the hashed password.
    const newUser = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: hashPassword,
      address: "admin address",
      role: "admin"
    })

    // Save the new user to the database.
    await newUser.save();
    console.log("Admin user created successfully");
  } catch(error) {
    console.log(error);
  }
}

// Execute the register function.
register();
/**
 * --- Commented Out Code ---
 * This is a more flexible version of the `register` function.
 *
 * It is a template for adding multiple users to the database from a list.
 * To use this, you would uncomment the code and define an array of user objects.
 * This code iterates through the array, hashes each password, and saves each user
 * to the database, making it ideal for seeding a database with test data.
 */


//This is add more users to the database if required

/*
const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    address: "admin address",
    role: "admin"
  },
  {
    name: "customer1",
    email: "customer1@gmail.com",
    password: "customer1",
    address: "customer1 address",
    role: "customer"
  },
  // You can add more users here
];

const register = async () => {
  try {
    await connectDB();
    for (const userData of users) {
      const hashPassword = await bcrypt.hash(userData.password, 10);
      const newUser = new User({
        ...userData,
        password: hashPassword
      });
      await newUser.save();
      console.log(`customer ${userData.name} created successfully`);
    }
  } catch (error) {
    console.log(error);
  }
};
*/
