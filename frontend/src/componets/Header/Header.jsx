import logo from "../../assets/bammylogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@headlessui/react";
import { debounce } from "lodash";

import {
  IoBagOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoPerson,
  IoPhonePortraitOutline,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoNotificationsOutline,
} from "react-icons/io5";
import { TECollapse, TERipple } from "tw-elements-react";
import { useEffect, useRef, useState } from "react";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { NavList } from "./NavList";
import CartList from "../../pages/CartList";
import CartModal from "../product/CartModal";
import CardProducts from "../product/CardProducts";
import axios from "axios"; // or use fetch
// import { motion } from "framer-motion";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

function Header() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const toggleProfileOpen = () => setProfileOpen(!profileOpen);

  const toggleShow = () => setShow(!show);

  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const getNavLinkClassName = (isActive) =>
    isActive
      ? " text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
      : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group";

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  // Debounce input value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Fetch products based on debouncedValue
  useEffect(() => {
    if (debouncedValue.length > 2) {
      setIsLoading(true);
      axios
        .get(`${API_URL}?searchQuery=${debouncedValue}`)
        .then((response) => {
          setSearchResults(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (show || open) {
      // Apply the classes to disable scrolling and blur the background
      document.body.classList.add("no-scroll");
    } else {
      // Remove the classes when the menu is closed
      document.body.classList.remove("no-scroll");
    }
  }, [show, open]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
        setOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div
        id="main-content"
        className="border-b border-slate-200 bg-pry-deep px-4"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-4 gap-6 py-2 px-text-sec-light-color md:grid-cols-8 lg:max-w-5xl lg:grid-cols-12 xl:max-w-7xl ">
          <div className="col-span-2 items-center md:col-span-4 lg:col-span-6">
            <Link
              to=""
              className="flex items-center gap-2 transition-colors duration-300 hover:text-sec-light-color"
            >
              <IoPhonePortraitOutline />
              +2349063897173
            </Link>
          </div>
          <div className="col-span-2 items-center justify-end gap-6 md:col-span-4 lg:col-span-6">
            <div className="flex items-center justify-end gap-4">
              <Link
                to={""}
                className="transition-colors duration-300 hover:text-sec-light-color"
              >
                <IoLogoFacebook />
              </Link>
              <Link
                to={""}
                href="javascript:void(0)"
                className="transition-colors duration-300 hover:text-sec-light-color"
              >
                <IoLogoTwitter />
              </Link>
              <Link
                to={""}
                href="javascript:void(0)"
                className="transition-colors duration-300 hover:text-sec-light-color"
              >
                <IoLogoInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <header
        ref={dropdownRef}
        className="z-30 text-base-100 sticky top-0  bg-light w-full px-2 py-4 h-14 md:h-20 md:px-4 md:py-4 flex justify-center items-center    "
      >
        <nav className="container max-w-7xl  p-1 flex   font-medium justify-between  w-full  items-center">
          <div className="   md:w-auto w-full flex justify-between items-center">
            <div className=" md:hidden  z-50 " onClick={toggleOpen}>
              {open ? (
                <IoCloseOutline style={{ fontSize: "25px" }} />
              ) : (
                <IoMenuOutline style={{ fontSize: "25px" }} />
              )}
            </div>
            <Link onClick={() => closeMenu()} to="/" smooth>
              <img
                className="logo w-[100px] md:cursor-pointer"
                src={logo}
                alt="Bamstore Logo"
              />
            </Link>
            <div className="flex md:hidden items-base justify-center gap-4">
              <div className="flex-none gap-2 hidden md:block">
                <div className="dropdown dropdown-end">
                  <ShowOnLogout>
                    <Link to={"login"}>
                      <IoPersonOutline style={{ fontSize: "20px" }} />
                    </Link>
                  </ShowOnLogout>
                  <ShowOnLogin>
                    <Link>
                      <IoPerson style={{ fontSize: "20px" }} />
                    </Link>
                  </ShowOnLogin>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-4 flex flex-col gap-2 shadow menu menu-sm dropdown-content bg-light rounded-box w-52"
                  >
                    {[
                      { to: "/profile", label: "Profile" },
                      { to: "/orders", label: "Orders" },
                    ].map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={toggleProfileOpen}
                        className={({ isActive }) =>
                          getNavLinkClassName(isActive)
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}

                    <ShowOnLogin>
                      <NavLink
                        onClick={logoutUser}
                        className={({ isActive }) =>
                          `text-dark hover:text-sec-light-color transition duration-150 ease-linear  py-1  group
                        ${
                          isActive
                            ? "  text-dark hover:bg-white/10 "
                            : " hover:text-sec-light-color "
                        }`
                        }
                      >
                        Logout
                      </NavLink>
                    </ShowOnLogin>
                    <ShowOnLogout>
                      <NavLink
                        to={"/login"}
                        className={({ isActive }) =>
                          isActive
                            ? " text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                            : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
                        }
                      >
                        Login
                      </NavLink>
                    </ShowOnLogout>
                  </ul>
                </div>
              </div>

              <IoSearchOutline
                style={{ fontSize: "20px" }}
                onClick={toggleShow}
              />
              <div className="relative">
                <span className="absolute -right-2 -top-2">
                  {cartTotalQuantity}
                </span>
                <Link to={"/cart"}>
                  <IoBagOutline style={{ fontSize: "20px" }} />
                </Link>
              </div>
            </div>
          </div>
          <ul className="md:relative md:flex flex-wrap md:pl-2 w-full  md:ml-4 hidden justify-start items-center gap-2">
            <NavList dropdownRef={dropdownRef} />
            <div className="md:flex w-[40] h-[40] place-items-end place-content-end absolute right-0 items-center  gap-4  ">
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <ShowOnLogout>
                    <Link to={"login"}>
                      <IoPersonOutline style={{ fontSize: "20px" }} />
                    </Link>
                  </ShowOnLogout>
                  <ShowOnLogin>
                    <Link>
                      <IoPerson style={{ fontSize: "20px" }} />
                    </Link>
                  </ShowOnLogin>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[6] p-4 flex flex-col gap-2 shadow menu menu-sm dropdown-content bg-light rounded-box w-52"
                  >
                    {[
                      { to: "/profile", label: "Profile" },
                      { to: "/orders", label: "Orders" },
                    ].map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={toggleProfileOpen}
                        className={({ isActive }) =>
                          getNavLinkClassName(isActive)
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}

                    <ShowOnLogin>
                      <NavLink
                        onClick={logoutUser}
                        className={({ isActive }) =>
                          `text-dark hover:text-sec-light-color transition duration-150 ease-linear  py-1  group
                        ${
                          isActive
                            ? "  text-dark hover:bg-white/10 "
                            : " hover:text-sec-light-color "
                        }`
                        }
                      >
                        Logout
                      </NavLink>
                    </ShowOnLogin>
                    <ShowOnLogout>
                      <NavLink
                        to={"/login"}
                        className={({ isActive }) =>
                          isActive
                            ? " text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                            : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
                        }
                      >
                        Login
                      </NavLink>
                    </ShowOnLogout>
                  </ul>
                </div>
              </div>
              <IoSearchOutline
                style={{ fontSize: "20px" }}
                onClick={toggleShow}
              />
              <Popover className="relative">
                <Popover.Button>
                  <IoBagOutline style={{ fontSize: "20px" }} />
                  <span className="absolute -right-3 -top-2">
                    {cartTotalQuantity}
                  </span>
                </Popover.Button>

                <Popover.Panel className="absolute     right-0 z-10">
                  <div className=" bordered drop-shadow-2xl   border-pry-deep">
                    <CartModal />
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </ul>

          {/*mobile */}

          <ul
            className={`
                md:hidden  z-40 bg-light pt-24 flex flex-col justify-between  items-start pr-6 font-bold  absolute  w-[90%] h-screen  pl-4 duration-500 ${
                  open ? "left-0 -top-16 pb-20 " : "left-[-100%]"
                }
                `}
          >
            <NavList toggleOpen={toggleOpen} />
            <ShowOnLogin>
              <div className="flex flex-col font-normal">
                <span className={"flex items-center gap-2 "}>
                  <IoPerson style={{ fontSize: "20px" }} />
                  <NavLink
                    onClick={toggleOpen}
                    to={"/orders"}
                    className={({ isActive }) =>
                      `text-dark hover:text-sec-light-color transition duration-150 ease-linear  py-1  group
                        ${
                          isActive
                            ? "  text-dark hover:bg-white/10 "
                            : " hover:text-sec-light-color "
                        }`
                    }
                  >
                    Orders
                  </NavLink>
                </span>
                <span className="flex items-center gap-2 ">
                  <IoPerson style={{ fontSize: "20px" }} />
                  <NavLink
                    onClick={logoutUser}
                    className={({ isActive }) =>
                      `text-dark hover:text-sec-light-color transition duration-150 ease-linear  py-1  group
                        ${
                          isActive
                            ? "  text-dark hover:bg-white/10 "
                            : " hover:text-sec-light-color "
                        }`
                    }
                  >
                    Logout
                  </NavLink>
                </span>
              </div>
            </ShowOnLogin>
            <ShowOnLogout>
              <span className="flex items-center gap-2 font-normal">
                <IoPersonOutline style={{ fontSize: "20px" }} />
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive
                      ? " text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                      : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
                  }
                >
                  Login
                </NavLink>
              </span>
            </ShowOnLogout>
          </ul>
        </nav>
        <TECollapse show={show}>
          <div className="absolute  border-0  z-40 bg-light p-4 top-10 md:top-20  left-0 w-full   mx-auto">
            <div className=" input bg-light  container max-w-7xl relative  left-0 right-0 m-auto  flex w-full flex-wrap items-center">
              <span className="">
                <IoSearchOutline style={{ fontSize: "20px" }} />
              </span>
              <input
                type="search"
                className="input-ghost  m-0 -mr-0.5  block w-[1px]  flex-auto rounded-lg   bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-transparent focus:text-neutral-700  focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="button-addon3"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            {isLoading && (
              <div className="flex  justify-center ">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
              </div>
            )}
            {error && (
              <p className="text-center">Error loading search results.</p>
            )}

            {searchResults ? (
              <div className="w-full flex  text-gray-400  justify-between items-center   active:border-y  border-gray-200 ">
                <div className="w-full flex flex-col gap-4 items-center justify-center">
                  <ul className="flex w-full max-w-7xl  items-center  gap-2 overflow-x-scroll hide-scrollbar ">
                    {searchResults.map((result) => (
                      <div className="flex flex-col items-center  gap-10">
                        <li className=" px-4 py-8" key={result.id}>
                          <CardProducts product={result} />
                        </li>
                      </div>
                    ))}
                    {/* <h3 className="text-center text-xl md:text-2xl">
                      Product(s) found({searchResults.length})
                    </h3> */}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-dark text-center">0 product found</p>
            )}
          </div>
        </TECollapse>
      </header>
    </>
  );
}

export default Header;
