import React, { useState, useEffect } from "react";
import {
  IoAddOutline,
  IoDocumentOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoPhonePortraitOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import { getUser } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const Admin = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  return (
    <main
      id="main-content"
      className="antialiased bg-gray-bk w-full min-h-screen text-slate-300 relative py-4 mt-10 md:mt-24 "
    >
      <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
        <div
          id="menu"
          className="bg-pry-deep col-span-3 rounded-lg p-4 flex flex-col "
        >
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
            Admin<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-slate-400 text-sm mb-2">Welcome back,</p>
          <Link
            to={"/profile"}
            className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
          >
            <div>
              <img
                className="rounded-full w-10 h-10 relative object-cover"
                src={user?.photo}
                alt="bjbnlk"
              />
            </div>
            <div>
              <p className="capitalize mb-2 font-medium group-hover:text-indigo-400 leading-4">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="capitalize font-medium group-hover:text-indigo-400 leading-4">
                {user?.role}@
                <span className="text-xs text-slate-400">BamstoreNG</span>
              </p>
            </div>
          </Link>
          <div id="menu" className="flex flex-col space-y-2 my-5">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-sec-color text-danger-900 hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                  : "hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              }
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoHomeOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg   leading-4 group-hover:text-indigo-400">
                    Dashboard
                  </p>
                  <p className="text-sm hidden md:block">Data overview</p>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/admin/createProduct"
              className={({ isActive }) =>
                isActive
                  ? "bg-sec-color text-danger-900 hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                  : "hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              }
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoAddOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg  leading-4 group-hover:text-indigo-400">
                    Create
                  </p>
                  <p className=" text-sm hidden md:block">New Product</p>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                isActive
                  ? "bg-sec-color text-danger-900 hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                  : "hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              }
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoPhonePortraitOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg  leading-4 group-hover:text-indigo-400">
                    Products
                  </p>
                  <p className=" text-sm hidden md:block">All products</p>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive
                  ? "bg-sec-color text-danger-900 hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                  : "hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              }
            >
              <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoDocumentOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg  leading-4 group-hover:text-indigo-400">
                    orders
                  </p>
                  <p className=" text-sm hidden md:block">Manage orders</p>
                </div>
                <div className="absolute -top-3 -right-3 md:top-0 md:right-0 px-2 py-1.5 rounded-full bg-indigo-800 text-xs font-mono font-bold">
                  23
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "bg-sec-color text-danger-900 hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                  : "hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              }
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoPersonOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg  leading-4 group-hover:text-indigo-400">
                    Users
                  </p>
                  <p className=" text-sm hidden md:block">Manage users</p>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                isActive
                  ? "bg-sec-color text-danger-900 hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                  : "hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              }
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoSettingsOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg leading-4 group-hover:text-indigo-400">
                    Settings
                  </p>
                  <p className=" text-sm hidden md:block">Edit settings</p>
                </div>
              </div>
            </NavLink>
          </div>
          <p className="text-sm text-center text-gray-600  ">
            v2.0.0.3 | &copy; 2022 BamstoreNG
          </p>
        </div>
        <div
          id="content"
          className="bg-light col-span-9 rounded-lg p-6 border border-pry-deep"
        >
          <Outlet />
        </div>
      </div>
    </main>
  );
};
