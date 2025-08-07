import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";

/**
 * @file Root.js
 * @description This file contains the Root component, which handles the initial routing
 * logic for authenticated users based on their role.
 */

/**
 * A root-level component that handles automatic redirection after a user logs in.
 *
 * This component's primary purpose is to check the authentication status and the role
 * of the user immediately upon mounting. It uses the `useEffect` hook to navigate
 * the user to the appropriate dashboard (`/admin/dashboard` or `/employee/dashboard`)
 * or to the login page if they are not authenticated.
 *
 * It renders `null` because its only job is to perform a redirect; it doesn't have
 * any visual UI to display.
 *
 * @returns {null} This component does not render any visual elements.
 */
const Root = () => {
  // --- React Hooks ---
  /**
   * Accesses the current user from the authentication context.
   */
  const { user } = useAuth();
   /**
   * Hook for programmatic navigation.
   */
  const navigate  = useNavigate();

  // --- Side Effects ---
  /**
   * `useEffect` hook to handle the initial routing logic.
   *
   * The effect runs once when the component mounts and whenever the `user` or
   * `Maps` dependencies change. It checks the user's existence and role
   * to determine the correct redirection path.
   */
  useEffect(() => {
    if(user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }else if ( user.role === "customer") {
        navigate("/employee/dashboard");
      }else {
         // If the user's role is not recognized, redirect to login
        navigate("/login");
      }
    } else {
      // If no user is authenticated, redirect to the login page
      navigate("/login");
    }

  }, [user, navigate]);

  return null;
}
export default Root;
