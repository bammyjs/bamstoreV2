import React, { useEffect } from "react";
import BreadCrumb from "../componets/BreadCrumb";
import { Helmet } from "react-helmet";
import { Meta } from "../componets/Meta";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  itemTotalQuantity,
} from "../redux/features/cartSlice";
import CheckOutWhatsAppButton from "../componets/extras/CheckOutWhatsAppButton";
import { IoArrowBackOutline } from "react-icons/io5";

const CartList = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  return (
    <>
      <Meta title={"Cart"} />
      <main id="main-content" className=" flex flex-col gap-6 ">
        {/* <BreadCrumb title="Cart" /> */}
        <section className=" bg-gray-100 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Your Cart
              </h1>
              {cart.cartItems.length === 0 ? (
                <div>
                  <p>Your cart is empty</p>
                  <div>
                    <Link to="/product">
                      <p>Shop ITEMS</p>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="w-full mx-auto mt-8 max-w-7xl md:mt-12">
                  <div className="">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                      <div className="flow-root">
                        <ul className="-my-8">
                          {cart.cartItems?.map((cartItem) => {
                            return (
                              <li
                                key={cartItem.id}
                                className="w-full flex flex-col space-y-3 py-6 text-left border-b sm:flex-row sm:space-x-5 sm:space-y-0"
                              >
                                <div className="shrink-0">
                                  <img
                                    className="h-24 w-24 max-w-full rounded-lg object-contain"
                                    src={cartItem.image?.[0]}
                                    alt=""
                                  />
                                </div>

                                <div className=" p-2 relative flex flex-1 flex-col justify-between">
                                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                    <div className="pr-8 sm:pr-5">
                                      <p className="text-base font-semibold text-gray-900">
                                        {cartItem.name}
                                      </p>
                                      <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                        <span>&#8358;</span>
                                        {new Intl.NumberFormat("en-NG").format(
                                          cartItem.price
                                        )}
                                      </p>
                                    </div>

                                    <div className=" flex items-center md:items-center b w-100 justify-between md:justify-between sm:mt-0 sm:items-start sm:justify-end">
                                      <p className="shrink-0  text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                        <span>&#8358;</span>
                                        {new Intl.NumberFormat("en-NG").format(
                                          cartItem.price * cartItem.cartQuantity
                                        )}
                                      </p>

                                      <div className="sm:order-1 ">
                                        <div className="mx-auto border flex h-10 items-stretch text-gray-600">
                                          <button
                                            onClick={() =>
                                              handleDecreaseCart(cartItem)
                                            }
                                            className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-primary hover:text-white"
                                          >
                                            -
                                          </button>
                                          <div className="flex w-full items-center justify-center bg-gray-400 px-4 text-xs uppercase transition">
                                            {cartItem.cartQuantity}
                                          </div>
                                          <button
                                            onClick={() =>
                                              handleIncreaseCart(cartItem)
                                            }
                                            className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-primary hover:text-white"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                    <button
                                      onClick={() =>
                                        handleRemoveFromCart(cartItem)
                                      }
                                      type="button"
                                      className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                    >
                                      <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"
                                          className=""
                                        ></path>
                                      </svg>
                                    </button>
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
                            <span>&#8358;</span>
                            {new Intl.NumberFormat("en-NG").format(
                              cart.cartTotalAmount
                            )}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">Shipping</p>
                          <p className="text-sm  text-gray-900">
                            Calculated at checkout
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          <span className="text-xs font-normal text-gray-400">
                            <span className="text-2xl text-dark">&#8358;</span>
                          </span>{" "}
                          {new Intl.NumberFormat("en-NG").format(
                            cart.cartTotalAmount
                          )}
                        </p>
                      </div>

                      <div className="mt-6 text-center">
                        <Link
                          to="/checkout"
                          type="button"
                          className="btn btn-primary w-full hover:btn-accent"
                        >
                          Checkout
                        </Link>
                      </div>
                      <Link
                        to="/products"
                        className="text-sec-color flex items-center gap-4 py-4 cursor-pointer hover:text-sec-light-color"
                      >
                        <IoArrowBackOutline />
                        <p className=" ">continue Shopping</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CartList;
