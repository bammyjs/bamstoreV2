
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";

const RequireEmailVerification = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user?.isVerified || user?.isVerified == false) {
    // Redirect them to the /verify-email page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them along to that
    // page after they verify their email, by storing the location in state
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireEmailVerification;
