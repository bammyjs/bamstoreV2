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
    if (user) {
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
      <section className="mt-20 mb-20 flex flex-col gap-6 items-center md:mt-24">
        <BreadCrumb title="Profile" />
        <h3 className="text-dark text-center text-lg md:text-3xl md:my-10  font-bold">
          Profile
        </h3>
        {user ? (
          <div className="  top-16 right-10">
            <Link className="btn btn-primary" to={"/createProduct"}>
              Create New Products
            </Link>
          </div>
        ) : null}
        {!isLoading && user && (
          <>
            <form
              onSubmit={saveProfile}
              action=""
              className="w-full container   px-6  bg-light py-6 rounded-lg max-w-md gap-6 flex flex-col shadow-2xl"
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
              {/* <div className="relative ">
                <input
                  id=""
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={profile?.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="peer relative h-10 w-full rounded border  border-gray px-4 pr-12 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />

                {showPassword ? (
                  <svg
                    onClick={() => setShowPassword(!showPassword)}
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
                    onClick={() => setShowPassword(!showPassword)}
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
              </div> */}
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
            <ShowOnLogin className="">
              <Link
                to={"/"}
                className="md:text-sm text-sec-color lg:text-lg flex items-center gap-2"
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
