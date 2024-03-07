import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../redux/features/auth/authSlice";
import { Meta } from "../componets/Meta";

const ResetPassword = () => {
  const { id: userId, resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.auth);

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { newPassword, confirmPassword } = password;
  console.log(password);

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      // Here, ensure you're sending the new password correctly as `password`
      await dispatch(
        resetPassword({ userId, resetToken, password: newPassword })
      ).unwrap();
      toast.success(
        "Password reset successfully. You can now login with your new password."
      );
      navigate("/login"); // Redirect to login page after successful password reset
    } catch (error) {
      console.error(
        "Reset Password Error:",
        error.response ? error.response.data : error
      );
      toast.error(error.message || "Failed to reset password.");
    }
  };

  return (
    <>
      <Meta
        title="Reset Password - Bamstore.ng"
        description="Reset your password to continue using BamstoreNG No1 gadget store in Nigeria."
        keywords="reset password, bamstore, welcome to bamstore ng"
        url="http://bamstore.ng/reset-password"
      />
      <main className="bg-gray-bk w-full px-6 flex flex-col items-center justify-center gap-6 py-32 md:py-60">
        <form
          onSubmit={handleSubmit}
          className="w-full container px-6 bg-light py-6 rounded-lg max-w-md gap-6 flex flex-col shadow-2xl"
        >
          <h3 className="text-3xl text-dark text-center md:text-4xl font-bold">
            Reset Your Password
          </h3>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          {/* {isSuccess && <p>Password changed successfully</p>} */}
        </form>
        <p className="text-dark">
          Remembered your password?{" "}
          <Link to={"/login"} end className="text-sec-color">
            Login
          </Link>{" "}
        </p>
      </main>
    </>
  );
};

export default ResetPassword;
