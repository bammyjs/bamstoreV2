import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import OrderSummary from "../../pages/orderDetails/OrderSummary";
import { Link } from "react-router-dom";
import { LoadingButton } from "../extras/LoadingButton";
import { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { IoCard, IoHome, IoStorefront } from "react-icons/io5";
import OnlinePaymentProcess from "./OnlinePaymentProcess";
import PayInStore from "./PayInStore";
import StoreSelection from "./StoreSelection";

export const CheckoutForm = ({
  handleBillingInputChange,
  handleContactInputChange,
  handleInputChange,
  handleCheckboxChange,
  handleCheckboxEmail,
  handleSubmit,
  contactDetails,
  shippingDetails,
  billingDetails,
  paymentMethod,
  handlePaymentChange,
  useShippingForBilling,
  saveInfo,
  setSaveInfo,
  setBillingDetails,
  handleStateChange,
  handleCountryChange,
  cart,
  shipRate,
  isLoading,
  cartItems,
}) => {
  const [activePaymentTab, setActivePaymentTab] = useState("payOnline");
  const [activeDeliveryTab, setActiveDeliveryTab] = useState("homeDelivery");

  const renderPaymentTabContent = () => {
    switch (activePaymentTab) {
      case "payOnline":
        return (
          <div>
            <OnlinePaymentProcess
              billingDetails={billingDetails}
              setBillingDetails={setBillingDetails}
              useShippingForBilling={useShippingForBilling}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        );
      case "payAtStore":
        return (
          <div>
            <PayInStore />
          </div>
        );
      default:
        return null;
    }
  };

  const renderDeliveryTabContent = () => {
    switch (activeDeliveryTab) {
      case "homeDelivery":
        return (
          <div className="flex w-full flex-wrap justify-between gap-4">
            <div className="relative  w-full">
              <CountryDropdown
                value={shippingDetails.country}
                onChange={(val) => handleCountryChange(val)}
                disabled={true}
                className="peer  relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-light disabled:text-slate-400"
              />
              <label
                htmlFor="firstName"
                className="absolute bg-light left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Country
              </label>
            </div>
            <div className="relative  w-full  md:w-[47%]">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                value={shippingDetails.firstName}
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="firstName"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                First name
              </label>
            </div>
            <div className="relative w-full  md:w-[47%]">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                value={shippingDetails.lastName}
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="lastName"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Last name
              </label>
            </div>
            <div className="relative  w-full">
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={shippingDetails.address}
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="address"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Address
              </label>
            </div>
            <div className="relative w-full md:w-[30%]">
              <input
                type="text"
                name="city"
                placeholder="city"
                required
                value={shippingDetails.city}
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="city"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                City
              </label>
            </div>
            <div className="relative  w-full  md:w-[30%]">
              <RegionDropdown
                country={shippingDetails.country}
                value={shippingDetails.state}
                required
                name="state"
                defaultOptionLabel="State"
                // value={region}
                onChange={(val) => handleStateChange(val)}
                className="peer  relative h-10 w-full rounded border border-gray px-4 text-sm text-gray bk-light placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-bg-light focus:border-emerald-500 focus:outline-none invalid:focus:bg-light focus:bg-light invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-light disabled:text-slate-400"
              />
              <label
                htmlFor="state"
                className="absolute bg-light left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                State
              </label>
            </div>

            <div className="relative w-full  md:w-[30%]">
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                required
                value={shippingDetails.zipCode}
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="zipCode"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Zip code
              </label>
            </div>
            <div className="relative  w-full">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                required
                value={shippingDetails.phone}
                className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                onChange={handleInputChange}
              />
              <label
                htmlFor="phone"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Phone
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
              />
              <label htmlFor="saveInfo">
                Save this information for next time
              </label>
            </div>
          </div>
        );
      case "inStorePickup":
        return (
          <div className="text-black flex flex-col gap-4 p-4 border w-full">
            <h3>Select Pickup Store</h3>
            {cartItems.map((item) => (
              <StoreSelection
                key={item._id}
                product={item}
                shippingDetails={shippingDetails}
                handleStateChange={handleStateChange}
                cart={cart} // Pass cart as a prop
                isLoading={isLoading} // Pass isLoading as a prop
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:max-w-xl  mb-4 px-4">
      <ShowOnLogout>
        <p className="text-center text-gray py-4 ">
          Have an account?{" "}
          <Link to={"/login"} className="text-dark">
            Log in
          </Link>
        </p>
      </ShowOnLogout>

      <div className=" py-4 ">
        <h2 className="text-2xl text-dark font-semibold mb-5">Contact</h2>

        <div className="relative my-6">
          <input
            type="text"
            name="contact"
            placeholder="Email Address"
            required
            value={contactDetails.contact}
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            onChange={handleContactInputChange}
          />
          <label
            htmlFor="contact"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Email Address or Phone
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input id="contact" type="checkbox" checked={handleCheckboxEmail} />
          <label htmlFor="">Email me with special offers</label>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-2xl text-dark font-semibold mb-5">Delivery</h2>
        <div className="tabs mb-4">
          <div
            className={`tab flex gap-1  ${
              activeDeliveryTab === "homeDelivery"
                ? "active text-light border rounded-md bg-sec-color "
                : "text-black"
            }`}
            onClick={() => setActiveDeliveryTab("homeDelivery")}
          >
            <IoHome />
            Home Delivery
          </div>
          <div
            className={`tab flex gap-1 ${
              activeDeliveryTab === "inStorePickup"
                ? "active text-light border rounded-md bg-sec-color "
                : "text-black"
            }`}
            onClick={() => setActiveDeliveryTab("inStorePickup")}
          >
            <IoStorefront />
            In-store Pickup
          </div>
        </div>
        <div className="tab-content">{renderDeliveryTabContent()}</div>
      </div>
      <div className="w-full  py-4 flex flex-col gap-4 text-dark">
        <h3 className="text-2xl text-dark font-semibold ">Payment</h3>
        <h4>Select Payment Method</h4>
        <div className="tabs w-full  ">
          <div
            className={`tab flex gap-1  ${
              activePaymentTab === "payOnline"
                ? "active text-light border rounded-md bg-sec-color "
                : "text-black"
            }`}
            onClick={() => setActivePaymentTab("payOnline")}
          >
            <IoCard />
            Pay Online
          </div>
          <div
            className={`tab flex gap-1 ${
              activePaymentTab === "payAtStore"
                ? "active text-light border rounded-md bg-sec-color "
                : "text-black"
            }`}
            onClick={() => setActivePaymentTab("payAtStore")}
          >
            <IoStorefront />
            Pay at Store
          </div>
        </div>
        <div className="tab-content">{renderPaymentTabContent()}</div>
      </div>
      <div className="bg-light p-4 flex flex-col md:hidden    text-dark">
        <h2 className="text-2xl text-dark font-semibold mb-5">Order Summary</h2>
        <div className="w-full mx-auto  max-w-7xl">
          <OrderSummary cart={cart} shipRate={shipRate} />
        </div>
      </div>

      {/* Repeat similar blocks for other fields like address, city, and zipCode */}
      <LoadingButton isLoading={isLoading}>Confirm Order</LoadingButton>
    </form>
  );
};
