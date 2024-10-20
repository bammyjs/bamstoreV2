import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { IoCardOutline } from "react-icons/io5";

const OnlinePaymentProcess = ({ cart, user, paymentOption }) => {
  const [useFlutterwave, setUseFutterwave] = useState(true);
  const fwConfig = {
    text: "Pay with Flutterwave!",
  };

  return (
    <div className="  rounded-b-lg">
      <div className="flex gap-2 items-center  border-2 border-black p-3 rounded-t-lg">
        <input
          type="checkbox"
          name="useFlutterwave"
          checked={useFlutterwave}
          // onChange={handleCheckboxChange}
          id="useShippingForBilling"
        />
        <label
          htmlFor="useShippingForBilling"
          className="w-full text-dark flex items-center justify-between"
        >
          <p>Pay with Flutterwave!</p>
          <span className="border-2 rounded-sm">
            <img
              className="w-28"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flutterwave_Logo.png/1024px-Flutterwave_Logo.png"
              alt="flutterwave"
            />
          </span>
        </label>
      </div>
      {useFlutterwave && (
        <div className="w-full flex flex-col gap-4 items-center transition-expand px-10 py-4 max-h-[2000px] ease-in-out bg-neutral border-b-2 border-x-2 border-gray  rounded-b-lg ">
        <div className="w-1/2 h-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-252.3 356.1 163 80.9"
            class="zjrzY"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="2"
              d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
            ></path>
            <circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle>
            <circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle>
            <circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle>
            <path
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="2"
              d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"
            ></path>
          </svg>
        </div>
          
          <p className="text-center">
            After clicking “Confirm Order”, you will be redirected to Flutterwave to
            complete your purchase securely.
          </p>
        </div>
      )}
    </div>
  );
};

export default OnlinePaymentProcess;
