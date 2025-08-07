import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'

/**
 * @file main.jsx
 * @description The entry point of the React application. This file is responsible for
 * mounting the root component into the DOM and wrapping the application
 * with necessary providers.
 */

/**
 * Renders the entire React application into the DOM.
 *
 * This is the first file to be executed when the application loads.
 *
 * It uses `ReactDOM.createRoot` to create a new root for the React application,
 * which is a modern and more efficient way of rendering in React 18+.
 * The root is attached to the HTML element with the id 'root'.
 *
 * The application is wrapped with the following components:
 * - `<React.StrictMode>`: A development tool that helps identify potential problems in the application.
 * It does not render any visible UI but activates additional checks and warnings for its descendants.
 * - `<AuthProvider>`: A custom provider that makes the authentication state and functions
 * available to all components within the application's component tree.
 * - `<App />`: The main component of the application, containing all the routing and UI logic.
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <App />
    </AuthProvider>
  
  </React.StrictMode>,
)
