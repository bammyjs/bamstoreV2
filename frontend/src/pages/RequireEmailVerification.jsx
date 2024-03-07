import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireEmailVerification = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user?.isVerified || user?.isVerified == false) {
    // Redirect them to the /verify-email page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them along to that
    // page after they verify their email, by storing the location in state
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireEmailVerification;
