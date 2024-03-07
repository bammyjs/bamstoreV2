import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, forgotPassword } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Dispatch the forgotPassword action
    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(() => {
        toast.success(
          "If an account with that email exists, we have sent a password reset link."
        );
        navigate("/login");
      })
      .catch((error) => {
        toast.error(
          error.message ||
            "Could not initiate password reset. Please try again."
        );
      });
  };

  return (
    <>
      <main className="w-full px-6 flex flex-col items-center justify-center gap-6 my-32 md:my-60">
        <form
          onSubmit={handleSubmit}
          className="w-full container px-6 bg-light py-6 rounded-lg max-w-md gap-6 flex flex-col shadow-2xl"
        >
          <h3 className="text-3xl text-dark text-center md:text-4xl font-bold">
            Reset Password
          </h3>
          <p className="text-center text-dark">
            Enter your email to reset password
          </p>
          <input
            type="email"
            placeholder="E-mail"
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
          {isSuccess && <p>Check your email for the reset link.</p>}
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

export default ForgotPassword;
