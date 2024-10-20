import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, logout, verifyEmail } from "../redux/features/auth/authSlice";
import { Meta } from "../componets/Meta";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser(user));
  }, []);

  useEffect(() => {
    // Extract the email token from the URL
    const emailToken = searchParams.get("emailToken");

    console.log("email:", emailToken);

    if (user?.isVerified) {
      setTimeout(() => {
        return navigate("/login");
      }, 3000);
    } else {
      if (!emailToken) {
        toast.error("Invalid verification link.");
        // navigate("/"); // Redirect to homepage or another appropriate page
        return;
      }

      // Dispatch the verifyEmail action, passing the email token
      dispatch(verifyEmail({ emailToken: emailToken }))
        .unwrap()
        .then((response) => {
          toast.success("Email verified successfully.");
          setTimeout(() => {
            // dispatch(logout()); // Ensure the user is logged out
            navigate("/login", { replace: true, key: Date.now() }); // Redirect to login page
          }, 3000); // Delay of 3 seconds
        })
        .catch((error) => {
          console.error;
          // Handle verification failure
          toast.error(error.message || "Email verification failed.");
        });
    }
  }, [dispatch, navigate, searchParams]);

  return (
    <>
      <Meta
        title="Verify email Page - Bamstore.ng"
        description="verify your email to continue with BamstoreNG No1 gadget store in Nigeria."
        keywords="verify email, get verified, bamstore, welcome to bamstore ng"
        url="http://bamstore.ng/verify-email"
      />
      <div
        id="main-content"
        className="bg-gray-bk w-full px-6 flex flex-col items-center justify-center gap-6 py-40  md:py-60"
      >
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-4xl font-bold text-zinc-800">
            Check your inbox
          </h2>
          <p className="mb-2 text-base text-zinc-500">
            We are glad, that you’re with us ? We’ve sent you a verification
            link to the email address{" "}
            <span className="font-medium text-indigo-500">{user?.email}</span>.
          </p>
          {user?.isVerified ? (
            <>
              <div role="alert" className="alert  alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Thank you for verifying your Email, Welcome on board!
                </span>
              </div>
              <p>
                wait a moment to redirect to login page or{" "}
                <Link onClick={navigate("/login")} className="text-sec-color">
                  click to login
                </Link>
              </p>
            </>
          ) : (
            <>
              <div role="alert" className="alert  flex   alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Email address Not yet Verified!</span>
              </div>
              <p className="text-dark my-4">
                no email received?{" "}
                <Link
                  // onClick={navigate("/verify-email")}
                  className="text-sec-color"
                >
                  Resend new mail
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
