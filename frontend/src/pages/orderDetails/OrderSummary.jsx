import React from "react";

const OrderSummary = ({ cart, shipRate }) => {
  console.log(cart);
  return (
    <div className="w-full  bg-gray-bk px-4 py-6 sm:px-8 sm:py-10">
      <div className="flow-root">
        <ul className="flex flex-col gap-2">
          {cart.cartItems?.map((cartHistory) => {
            return (
              <li
                key={cartHistory.id}
                className="w-full flex  space-y-3  text-left  sm:flex-row sm:space-x-5 sm:space-y-0"
              >
                <div className="shrink-0  relative border rounded-lg">
                  <img
                    className=" h-24 w-24 object-contain rounded-lg"
                    src={cartHistory.image?.[0]}
                    alt=""
                  />
                  <div className="sm:order-1  absolute top-0 right-0 ">
                    <span className=" flex w-4 h-5 items-center justify-center bg-dark rounded-full p-1 text-xs text-light uppercase transition">
                      {cartHistory.cartQuantity}
                    </span>
                  </div>
                </div>

                <div className=" p-2 relative flex flex-1 flex-col justify-between">
                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                    <div className="pr-8 sm:pr-5">
                      <p className="text-base font-semibold text-gray-900">
                        {cartHistory.name}
                      </p>
                      <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                        <span>&#8358;</span>
                        {new Intl.NumberFormat("en-NG").format(
                          cartHistory.price
                        )}
                      </p>
                    </div>

                    <div className=" flex items-center md:items-center  w-100 justify-between md:justify-between sm:mt-0 sm:items-start sm:justify-end">
                      <p className="shrink-0  text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                        <span>&#8358;</span>
                        {new Intl.NumberFormat("en-NG").format(
                          cartHistory.price * cartHistory.cartQuantity
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <span className="bg-black w-full h-1"></span> */}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Subtotal</p>
          <p className="text-lg font-semibold text-dark">
            <span className="text-lg font-semibold text-dark">&#8358;</span>
            {new Intl.NumberFormat("en-NG").format(cart.cartTotalAmount)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Shipping</p>
          <p className="text-lg font-semibold text-dark">
            <span className="text-lg font-semibold text-dark">&#8358;</span>
            {shipRate===null ? "0" : new Intl.NumberFormat("en-NG").format(shipRate)}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">
          <span className="text-2xl font-semibold text-dark">&#8358;</span>
          {new Intl.NumberFormat("en-NG").format(
            cart.cartTotalAmount + shipRate
          )}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
