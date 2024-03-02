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
// import { TEInput, TERipple } from "tw-elements-react";

function Profile() {
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
    // password: user.password || "",
  };
  const [profile, setProfile] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.isVerified) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user?.role || "",
        // photo: user?.photo || "",
        address: user.address || {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [dispatch, user]);
  //   const [showPassword, setShowPassword] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,
      // photo: profile.photo,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };

    await dispatch(updateUser(userData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
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
        <h3 className="text-dark text-center text-lg md:text-3xl md:my-10  font-bold">
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
              className="w-full container   px-6  bg-light py-6 rounded-lg max-w-md gap-2 flex flex-col shadow-2xl"
            >
              {/*    <!-- Component: Rounded basic input  --> */}
              <label htmlFor="">FirstName</label>
              <input
                type="text"
                name="firstName"
                required
                value={profile?.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="">LastName</label>
              <input
                type="text"
                name="lastName"
                required
                value={profile?.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                required
                value={profile?.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                required
                value={profile?.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                disabled
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="">Address:</label>
              <input
                type="text"
                name="address"
                required
                value={profile?.address?.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="">State:</label>
              <input
                type="text"
                name="state"
                required
                value={profile?.address?.state}
                onChange={handleInputChange}
                placeholder="Your State"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label htmlFor="">Country:</label>
              <input
                type="text"
                name="country"
                required
                value={profile?.address?.country}
                onChange={handleInputChange}
                placeholder="country"
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />

              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
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
