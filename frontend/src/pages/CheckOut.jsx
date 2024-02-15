import React, { useEffect, useState } from "react";
import { getTotals } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "./orderDetails/OrderSummary";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const CheckOut = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [expand, setExpand] = useState(false);

  const shipRate = 5000;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     dispatch(
  //       createProduct({
  //         name,
  //         sku,
  //         category,
  //         quantity,
  //         brand,
  //         regularPrice,
  //         color,
  //         description,
  //         price,
  //         image: image,
  //       })
  //     );
  //   };

  const handleInputChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process checkout here
    console.log(billingDetails);
  };
  const onExpandView = () => {
    setExpand(!expand);
  };

  return (
    <main
      id="main-content"
      className="w-full  bg-light h-fit flex flex-col items-center gap-6   "
    >
      {/* <h2 className="text-2xl text-dark text-center font-bold mb-5">
        Checkout
      </h2> */}
      <section className="container w-full   flex flex-col md:flex-row md:justify-between  max-w-7xl ">
        <div className=" md:hidden">
          {expand ? (
            <div
              onClick={() => onExpandView()}
              className=" cursor-pointer px-4 py-6 bg-light border-b border-dark  flex items-center justify-between gap-2 text-sec-light-color hover:text-sec-color "
            >
              <p className="flex items-center gap-2 text-sec-light-color hover:text-sec-color">
                Show Order Summary
                <span className="cursor-pointer">
                  <IoChevronUp />
                </span>
              </p>

              <p className="text-xl font-semibold text-gray-900">
                <span className="text-xl font-semibold text-dark">&#8358;</span>
                {new Intl.NumberFormat("en-NG").format(
                  cart.cartTotalAmount + shipRate
                )}
              </p>
            </div>
          ) : (
            <div
              onClick={() => onExpandView()}
              className="cursor-pointer px-4 py-6 bg-light flex items-center justify-between gap-2 text-sec-light-color hover:text-sec-color "
            >
              <p className="flex items-center gap-2 text-sec-light-color hover:text-sec-color">
                Hide Order Summary
                <span className="cursor-pointer">
                  <IoChevronDown />
                </span>
              </p>

              <p className="text-xl font-semibold text-gray-900">
                <span className="text-xl font-semibold text-dark">&#8358;</span>
                {new Intl.NumberFormat("en-NG").format(
                  cart.cartTotalAmount + shipRate
                )}
              </p>
            </div>
          )}
          <div
            className={`transition-expand ${
              expand
                ? "max-h-[1000px] opacity-100"
                : "collapse max-h-0 opacity-50"
            }`}
          >
            <OrderSummary cart={cart} shipRate={shipRate} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" md:max-w-md mx-auto mb-4 px-4"
        >
          <div className=" py-4 ">
            <h2 className="text-2xl text-dark font-semibold mb-5">Contact</h2>

            <div className="relative my-6">
              <input
                type="text"
                name="phone"
                placeholder="Email Address or Phone"
                required
                value={billingDetails.phone}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="phone"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Email Address or Phone
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label htmlFor="">Email me with special offers</label>
            </div>
          </div>
          <div className="">
            <h2 className="text-2xl text-dark font-semibold mb-5">Delivery</h2>
            <div className="relative my-6">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                value={billingDetails.firstName}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="firstName"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                First name
              </label>
            </div>
            <div className="relative my-6">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                value={billingDetails.lastName}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="lastName"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Last name
              </label>
            </div>
            <div className="relative my-6">
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={billingDetails.address}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="address"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Address
              </label>
            </div>
            <div className="relative my-6">
              <input
                type="text"
                name="city"
                placeholder="city"
                required
                value={billingDetails.city}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="city"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                City
              </label>
            </div>
            <div className="relative my-6">
              <input
                type="text"
                name="state"
                placeholder="State"
                required
                value={billingDetails.state}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="state"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                State
              </label>
            </div>
            <div className="relative my-6">
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                required
                value={billingDetails.zipCode}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="zipCode"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Zip code
              </label>
            </div>
            <div className="relative my-6">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                required
                value={billingDetails.phone}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="phone"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Phone
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label htmlFor="">Save this information for next time</label>
            </div>
            <div className="mt-4">
              <h3 className="text-xl text-dark  mb-5">Shipping method</h3>
              <div className="text-dark flex items-center justify-between p-6 border-2 border-dark rounded-xl">
                <p>GIG Logistics (Weight of item Determines Shipping price)</p>
                <p className="mx-0 mt-1 mb-0 text-xl text-dark">
                  <span>&#8358;</span>
                  {new Intl.NumberFormat("en-NG").format(5000)}
                </p>
              </div>
            </div>
          </div>
          <div className=" py-4 flex flex-col gap-4 text-dark">
            <h2 className="text-2xl text-dark font-semibold ">Payment</h2>
            <p>All transaction is secure and encrypted</p>

            <div className="bg-gray-bk  text-dark flex flex-col  rounded-t-2xl">
              <h3 className="text-lg font-semibold p-4  bg-light border-2 border-primary rounded-t-2xl">
                Direct Bank Transfer
              </h3>
              <p className="p-4 border-x-2 border-b-2 border-gray">
                Please pay the total amount into the bank details below UNITED
                BANK FOR AFRICA 1026303429 BAMSTORENG Please save your payment
                receipt and share it with our sales rep on Instagram:
                @bamstore.ng or on WhatsApp through this link:
                https://wa.link/h1q6wy ALSO PLEASE NOTE THAT ALL SHIPPING AND
                DELIVERY FEES ARE CALCULATED & DETERMINED BY ITEM WEIGHT AND
                DISTANCE.
              </p>
            </div>
          </div>
          <div className="bg-light p-4 flex flex-col md:hidden    text-dark">
            <h2 className="text-2xl text-dark font-semibold mb-5">
              Order Summary
            </h2>
            <div className="w-full mx-auto  max-w-7xl">
              <OrderSummary cart={cart} shipRate={shipRate} />
            </div>
          </div>

          {/* Repeat similar blocks for other fields like address, city, and zipCode */}
          <button type="submit" className="btn btn-accent w-full ">
            Confirm Order
          </button>
        </form>
        {/* desktop order summary view */}
        <div className="bg-gray-bk w-full p-4 sticky  flex-col hidden  md:block  text-dark">
          <div className="  max-w-7xl">
            <OrderSummary cart={cart} shipRate={shipRate} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckOut;
