import React, { useState, useEffect, useRef } from "react";
import {
  IoAddOutline,
  IoCloseOutline,
  IoDocumentOutline,
  IoHomeOutline,
  IoMenuOutline,
  IoOpen,
  IoPersonOutline,
  IoPhonePortraitOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import { getUser } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "../componets/extras/LoadingButton";
import { useGetOrdersQuery } from "../redux/features/order/ordersApi";
import { Meta } from "../componets/Meta";

export const Admin = () => {
  const dispatch = useDispatch();
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  console.log(orders);
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <>
      <Meta
        title="Admin page - Bamstore.ng"
        description="Hey Admin Welcome to the BamstoreNG No1 gadget store in Nigeria."
        keywords="admin, admin login, bamstore, welcome to bamstore ng"
        url="http://bamstore.ng/admin"
      />
      <main
        id="main-content"
        className="antialiased bg-gray-bk w-full min-h-screen text-slate-300 relative py-4   "
      >
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
          <div
            id="menu"
            className="bg-pry-deep hidden md:block col-span-3 rounded-lg p-4  flex-col "
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
                to="/admin/all-orders"
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
                    {orders?.length}
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
          <div className=" md:hidden block z-20 " onClick={toggleShow}>
            {show ? (
              <div className="cursor-pointer flex gap-1 border-2 text-dark w-48 p-4 rounded-full">
                <IoCloseOutline style={{ fontSize: "25px", color: "black" }} />
                <span className="text-xl">Close Dash</span>
              </div>
            ) : (
              <div className="cursor-pointer flex gap-1 border-2 text-dark w-48 p-4 rounded-full">
                <IoOpen style={{ fontSize: "25px", color: "black" }} />
                <span className="text-xl">Open Dash</span>
              </div>
            )}
          </div>

          {/*mobile view dashboard*/}

          <div
            id="menu"
            className={`
                md:hidden z-10 bg-pry-deep my-32 col-span-3 rounded-lg p-4   flex flex-col items-start pr-6 font-bold  absolute  w-[30%] h-full  bottom-0  pl-4 duration-500 ${
                  show ? "left-0 top-0" : "left-[-100%]"
                }
                `}
          >
            <div className="flex flex-col mt-10">
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
                    Hi, {user?.firstName}
                  </p>
                  <p className="capitalize font-medium group-hover:text-indigo-400 leading-4">
                    {user?.role}
                  </p>
                </div>
              </Link>
            </div>
            <div id="menu" className="flex flex-col space-y-2 ">
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
                to="/admin/all-orders"
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
                  <div className="absolute text-light -top-3 -right-3 md:top-0 md:right-0 px-2 py-1.5 rounded-full bg-indigo-800 text-xs font-mono font-bold">
                    {orders?.length}
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

          {/*mobile ends*/}

          <div
            id="content"
            className="bg-light w-full col-span-full md:col-span-9 rounded-lg p-6 border border-pry-deep"
          >
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};
