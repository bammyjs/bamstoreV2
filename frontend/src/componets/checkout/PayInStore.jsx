import React, { useState } from "react";

const PayInStore = ({
  contactDetails,
  shippingDetails,
  cart,
  setOrderDetails,
  confirmOrder,
  orderConfirmed,
  orderId,
  
}) => {

  if (orderConfirmed) {
    return (
      <div className="w-full flex flex-col gap-4 items-center transition-expand px-10 py-4 max-h-[2000px] ease-in-out bg-neutral border-2 border-gray  rounded-lg ">
        <h3 className="text-lg font-semibold text-emerald-600">
          Order Confirmed!
        </h3>
        <p>Your Order ID: {orderId}</p>
        <p className="mt-2">
          Please present this Order ID at the store to pick up and pay for your
          items.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Ensure you arrive at the selected store within the pickup window.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center transition-expand px-10 py-4 max-h-[2000px] ease-in-out bg-neutral border-2 border-gray  rounded-lg ">
      <p className="text-center">
        You have chosen to pay for your items at the store during pickup. Click
        the button below to confirm your order.
      </p>
      {/* <button
        onClick={confirmOrder}
        className="btn btn-primary mt-4"
        disabled={orderConfirmed}
      >
        Confirm store Pick up
      </button> */}
    </div>
  );
};

export default PayInStore;
