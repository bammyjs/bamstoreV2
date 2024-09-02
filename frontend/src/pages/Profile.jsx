import React from "react";
import BreadCrumb from "../componets/BreadCrumb";
import { Meta } from "../componets/Meta";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_AUTH,
  getUser,
  logout,
  updateUser,
} from "../redux/features/auth/authSlice";
import Loader from "../componets/home/Loader";
import { useState, useEffect } from "react";
import ShowOnLogin from "../componets/hiddenLink/hiddenLink";
import { IoLogOutOutline } from "react-icons/io5";
import { AdminOnlyLink } from "../componets/admin/AdminAccessOnly";
import { LoadingButton } from "../componets/extras/LoadingButton";

function Profile() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    oldPassword: "",
    newPassword: "",
    photo: user?.photo || "",
    address: user?.address || "",
    state: user?.state || "",
    country: user?.country || "",
  };

  const [userData, setUserData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.isVerified) {
      setUserData({
        ...userData,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user?.role || "",
        // photo: user?.photo || "",
        address: user?.address || "",
        state: user?.state || "",
        country: user?.country || "",
      });
    }
  }, [dispatch, user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword, oldPassword } = userData;

    // Check if a password update is attempted
    const isPasswordChange = oldPassword || newPassword || confirmPassword;

    if (isPasswordChange && newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);

    try {
      const result = await dispatch(updateUser({ ...userData })).unwrap();
      toast.success("Profile updated successfully");

      // Conditionally log out the user if the password was changed successfully
      if (isPasswordChange) {
        dispatch(logout());
        dispatch(RESET_AUTH());
        navigate("/login");
        toast.info("Please log in with your new password");
      } else {
        // Refresh the profile to reflect changes without logging out
        setTimeout(() => {}, 3000);
        dispatch(getUser());
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || "Could not update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  return (
    <>
      <Meta title={"Profile"} />
      <section
        id="main-content"
        className="bg-gray-bk mt-10 flex flex-col gap-6 items-center md:mt-10"
      >
        {/* <BreadCrumb title="Profile" /> */}
        <h3 className="text-dark text-center text-lg md:text-3xl md:mt-10  font-bold">
          Profile
        </h3>
        {!user?.isVerified && (
          <div className="flex max-w-fit my-6 ">
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
              <span>
                Email address Not yet Verified!{" "}
                <Link
                  to={"/verify-email"}
                  className="text-danger-900 underline"
                >
                  Please verify your email
                </Link>
              </span>
            </div>
          </div>
        )}
        {user ? (
          <div className="   ">
            <AdminOnlyLink>
              <Link className="btn btn-primary" to={"/admin/dashboard"}>
                Admin
              </Link>
            </AdminOnlyLink>
          </div>
        ) : null}
        {!isLoading && user && (
          <>
            <form
              onSubmit={saveProfile}
              action=""
              className="w-full container text-dark  px-6  bg-light py-6 rounded-lg max-w-md gap-2 flex flex-col  shadow-2xl"
            >
              {/*    <!-- Component: Rounded basic input  --> */}
              <div className="flex flex-wrap justify-between gap-2">
                <div className="relative flex flex-col gap-2  w-full max-w-48  ">
                  <label htmlFor="firstName">FirstName</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={userData?.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="relative flex flex-col gap-2  w-full  max-w-48  ">
                  <label htmlFor="lastName">LastName</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={userData?.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                required
                value={userData?.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                disabled
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                required
                value={userData?.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <div className="relative flex flex-col gap-2 border border-gray p-4 mt-4">
                <p className="absolute bg-white text-lg p-2 text-dark -top-5">
                  Password change
                </p>
                <label htmlFor="oldPassword" className="mt-4">
                  Current password <br /> (leave it blank to leave unchanged)
                </label>
                <div className="relative ">
                  <input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Old Password"
                    value={userData?.oldPassword}
                    onChange={handleInputChange}
                    className="peer relative h-10 w-full rounded border  border-gray px-4 pr-12 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />

                  {showOldPassword ? (
                    <svg
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title-4 description-4"
                      role="graphics-symbol"
                    >
                      <title id="title-4">Check mark icon</title>
                      <desc id="description-4">Icon description here</desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title-4d description-4d"
                      role="graphics-symbol"
                    >
                      <title id="title-4d">Check mark icon</title>
                      <desc id="description-4d">Icon description here</desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </div>
                <label htmlFor="newPassword">
                  New password <br /> (leave it blank to leave unchanged)
                </label>
                <div className="relative ">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={userData?.newPassword}
                    onChange={handleInputChange}
                    className="peer relative h-10 w-full rounded border  border-gray px-4 pr-12 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />

                  {showNewPassword ? (
                    <svg
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title-4 description-4"
                      role="graphics-symbol"
                    >
                      <title id="title-4">Check mark icon</title>
                      <desc id="description-4">Icon description here</desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title-4d description-4d"
                      role="graphics-symbol"
                    >
                      <title id="title-4d">Check mark icon</title>
                      <desc id="description-4d">Icon description here</desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </div>
                <label htmlFor="confirmPassword">
                  Confirm New password <br /> (leave it blank to leave
                  unchanged)
                </label>
                <div className="relative ">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={userData?.confirmPassword}
                    onChange={handleInputChange}
                    className="peer relative h-10 w-full rounded border  border-gray px-4 pr-12 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />

                  {showConfirmPassword ? (
                    <svg
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title-4 description-4"
                      role="graphics-symbol"
                    >
                      <title id="title-4">Check mark icon</title>
                      <desc id="description-4">Icon description here</desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title-4d description-4d"
                      role="graphics-symbol"
                    >
                      <title id="title-4d">Check mark icon</title>
                      <desc id="description-4d">Icon description here</desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                // required
                value={userData?.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="state">State:</label>
              <input
                type="text"
                name="state"
                // required
                value={userData?.state}
                onChange={handleInputChange}
                placeholder="Your State"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                name="country"
                // required
                value={userData?.country}
                onChange={handleInputChange}
                placeholder="country"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />

              <LoadingButton type="submit" isLoading={isLoading}>
                Update Profile
              </LoadingButton>
            </form>
            <ShowOnLogin className="">
              <Link
                to={"/"}
                className="md:text-sm text-sec-color lg:text-lg flex items-center gap-2 mb-10"
                onClick={logoutUser}
              >
                Logout{" "}
                <span>
                  <IoLogOutOutline />
                </span>
              </Link>
            </ShowOnLogin>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;
