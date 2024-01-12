import React, { useState, useEffect } from "react";
import {
  IoAddOutline,
  IoDocumentOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import DashBoardPreview from "../componets/admin/DashBoardPreview";
import CreateProduct from "../componets/admin/CreateProduct";
import DisplayUsers from "../componets/admin/DisplayUsers";
import AvailableProducts from "../componets/admin/AvailableProducts";
import { getUser } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const Admin = () => {
  const [select, setSelect] = useState(1);
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

  const renderSelect = () => {
    switch (select) {
      case 1:
        return <DashBoardPreview />;
      case 2:
        return <CreateProduct />;
      case 3:
        return <AvailableProducts />;
      case 4:
        return <DisplayUsers />;

      // Add cases for other steps...
      default:
        return <DashBoardPreview />;
    }
  };

  return (
    <main className="antialiased bg-gray-bk w-full min-h-screen text-slate-300 relative py-4 mt-10 md:mt-24 ">
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
                src="https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1800&t=st=1669749937~exp=1669750537~hmac=4c5ab249387d44d91df18065e1e33956daab805bee4638c7fdbf83c73d62f125"
                alt="bjbnlk"
              />
            </div>
            <div>
              <p className="font-medium group-hover:text-indigo-400 leading-4">
                {user?.firstName + " " + user.lastName}
              </p>
              <span className="text-xs text-slate-400">BamstoreNG</span>
            </div>
          </Link>
          <div id="menu" className="flex flex-col space-y-2 my-5">
            <Link
              to="#"
              onClick={() => setSelect(1)}
              className={` hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group ${
                select === 1 ? "bg-sec-color text-danger-900" : ""
              }`}
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
            </Link>
            <Link
              to="#"
              onClick={() => setSelect(2)}
              className={` hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group ${
                select === 2 ? "bg-sec-color text-danger-900" : ""
              }`}
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
            </Link>
            <Link
              to="#"
              onClick={() => setSelect(3)}
              className={` hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group ${
                select === 3 ? "bg-sec-color text-danger-900" : ""
              }`}
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoAddOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg  leading-4 group-hover:text-indigo-400">
                    Products
                  </p>
                  <p className=" text-sm hidden md:block">All products</p>
                </div>
              </div>
            </Link>
            <Link
              to="#"
              onClick={() => setSelect()}
              className={` hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group ${
                select === 0 ? "bg-sec-color text-danger-900" : ""
              }`}
            >
              <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <IoDocumentOutline style={{ fontSize: "20px" }} />
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg  leading-4 group-hover:text-indigo-400">
                    Invoices
                  </p>
                  <p className=" text-sm hidden md:block">Manage invoices</p>
                </div>
                <div className="absolute -top-3 -right-3 md:top-0 md:right-0 px-2 py-1.5 rounded-full bg-indigo-800 text-xs font-mono font-bold">
                  23
                </div>
              </div>
            </Link>
            <Link
              to="#"
              onClick={() => setSelect(4)}
              className={` hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group ${
                select === 4 ? "bg-sec-color text-danger-900" : ""
              }`}
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
            </Link>
            <Link
              to="#"
              onClick={() => setSelect(5)}
              className={` hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group ${
                select === 5 ? "bg-sec-color text-danger-900" : ""
              }`}
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
            </Link>
          </div>
          <p className="text-sm text-center text-gray-600  ">
            v2.0.0.3 | &copy; 2022 BamstoreNG
          </p>
        </div>
        <div
          id="content"
          className="bg-light col-span-9 rounded-lg p-6 border border-pry-deep"
        >
          {renderSelect()}
        </div>
      </div>
    </main>
  );
};
