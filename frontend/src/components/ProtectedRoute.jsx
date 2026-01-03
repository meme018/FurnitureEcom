import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // If not logged in, redirect to registration
  if (!token) {
    return <Navigate to="/registration" replace />;
  }

  // If role is required and doesn't match, redirect based on user's actual role
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
