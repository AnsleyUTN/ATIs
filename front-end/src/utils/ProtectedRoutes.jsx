import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

/**
 * @file ProtectedRoutes.js
 * @description This file contains the ProtectedRoutes component, which restricts access to routes
 * based on user authentication status and roles.
 */

/**
 * A wrapper component that protects its child routes.
 *
 * This component checks if a user is authenticated and if their role matches the
 * required roles. If the user is not authenticated, they are redirected to the login page.
 * If the user's role does not have the necessary permissions, they are redirected to
 * an unauthorized page.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components (routes) to be protected.
 * @param {string[]} props.requireRole - An array of roles that are allowed to access the route.
 * @returns {JSX.Element | null} The child components if the user is authorized, otherwise `null`.
 */
const ProtectedRoutes = ({ children, requireRole }) => {
  // --- React Hooks ---
  /**
   * Accesses the current user from the authentication context.
   */
  const { user } = useAuth();
  /**
   * Hook for programmatic navigation.
   */
  const navigate = useNavigate;
  // --- Side Effects ---
  /**
   * `useEffect` hook to handle redirection logic.
   *
   * This effect runs whenever the `user`, `Maps`, or `requireRole` dependencies change.
   * It checks for two main conditions:
   * 1. If `user` is not defined (not logged in), redirect to the login page.
   * 2. If the user's role is not included in the `requireRole` array, redirect to
   * an unauthorized page.
   */

  useEffect(() => {
    // Redirect if the user is not authenticated
    if(!user) {
      navigate('/login');
      return;
    }
    // Redirect if the user's role is not authorized
    if(!requireRole.includes(user.role)){

      navigate('unauthorized')
      return;
    }
  }, [user, navigate, requireRole]) 

  // --- Render Logic ---
  /**
   * Prevents the protected content from flickering before the useEffect runs.
   * If the user is not authorized, the component returns `null`, ensuring no content is rendered.
   */
  if(!user) return null;
  if(!requireRole.includes(user.role)) return null;
  // If all checks pass, render the child components (the protected route)
  return children;
}

export default ProtectedRoutes;
