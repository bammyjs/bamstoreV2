import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";

const AdminAccessOnly = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  }
  return (
    <section className="bg-gray-bk w-full px-6 flex flex-col items-center justify-center gap-6 my-32  md:my-60">
      <div className="flex flex-col items-center gap-2 ">
        <h2>Permission Denied.</h2>
        <p>This page can only be viewed by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="btn btn-primary">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  }
  return null;
};

export default AdminAccessOnly;
