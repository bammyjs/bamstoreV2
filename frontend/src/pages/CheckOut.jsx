import React, { useEffect, useState } from "react";
import { getTotals } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "./orderDetails/OrderSummary";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../redux/features/auth/authSlice";
import { createOrder } from "../redux/features/product/orderSlice";
import { CheckoutForm } from "../componets/checkout/CheckoutForm";
import CheckoutSuccess from "./CheckOutSuccess";
import { formToJSON } from "axios";
import { Meta } from "../componets/Meta";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [expand, setExpand] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactDetails, setContactDetails] = useState({ contact: "" });

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "Nigeria", // Empty initial state
  });

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",

    country: "", // Empty initial state
  });

  const [useShippingForBilling, setUseShippingForBilling] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const shipRate = 5000;

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector((state) => state.orders);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    // Reset form or state on unmount or success
    return () => {
      // reset states if needed
    };
  }, [isSuccess, isError, message]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure cartItems are properly structured and not empty
    if (!cart.cartItems || cart.cartItems.length === 0) {
      console.error("No items in cart to create an order");
      return;
    }
    // Prepare order data
    const formData = {
      orderDate: new Date().toLocaleDateString(),
      orderTime: new Date().toLocaleTimeString(),
      orderAmount: cart.cartTotalAmount, // Implement this function based on your logic
      orderStatus: "pending", // Assuming you have user context
      cartItems: cart.cartItems, // Assuming you have cart context
      shippingAddress: shippingDetails,
      paymentMethod: "Direct Bank Transfer", // Example payment method
    };
    console.log(formData);

    const saveOrderDetailsToLocalStorage = (orderDetails) => {
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    };

    const totalCartAmount = cart.cartTotalAmount + shipRate; // Example calculation

    // Simulate order creation success and saving to localStorage
    const orderDetails = {
      // populate with actual order details
      contactDetails,
      shippingDetails,
      useShippingForBilling,
      totalCartAmount,
    };

    saveOrderDetailsToLocalStorage(orderDetails);

    setIsLoading(true); // Start loading
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true); // Update state to indicate submission
      window.history.replaceState(null, "", "/checkout-success");
    }, 2000); // Simulate a delay for the API call

    dispatch(createOrder(formData))
      .unwrap()
      .then(() => {
        setIsSubmitted(true);
        setContactDetails(contactDetails);
        setShippingDetails(shippingDetails);
        setUseShippingForBilling(useShippingForBilling);
        setIsLoading(false);
        // dispatch(clearCart());
      })
      .catch((error) => {
        console.error("Order creation failed:", error);
      });
    // Check if user wants to save information
    if (document.getElementById("saveInfo").checked) {
      localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));
      localStorage.setItem("billingDetails", JSON.stringify(billingDetails));
      localStorage.setItem("contactDetail", JSON.stringify(contactDetails));
    }
    // Submit or process data here
  };

  // const handleViewOrder = () => {
  //   navigate(`/order/${order._id}`);
  // };

  useEffect(() => {
    syncAddresses();

    const savedShippingDetails = localStorage.getItem("shippingDetails");
    const savedBillingDetails = localStorage.getItem("billingDetails");
    if (savedShippingDetails && savedBillingDetails) {
      setShippingDetails(JSON.parse(savedShippingDetails));
      setBillingDetails(JSON.parse(savedBillingDetails));
    }
  }, [useShippingForBilling]);

  const saveContactDetails = localStorage.getItem("contactDetails");

  const handleCheckboxEmail = (e) => {
    setContactDetails(e.target.checked);
    saveContactDetails();
  };

  const syncAddresses = () => {
    if (useShippingForBilling) {
      setBillingDetails(shippingDetails);
    } else {
      setBillingDetails({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        phone: "",
        email: "",
        country: "Nigeria", // Default country
        state: "", // Empty initial state
      });
    }
  };

  // Toggle the use of shipping address for billing
  const handleCheckboxChange = (e) => {
    setUseShippingForBilling(e.target.checked);
    syncAddresses();
  };

  const handleContactInputChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };
  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleBillingInputChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Specifically handle country and state changes
  const handleCountryChange = (country) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      country: country,
    }));
  };

  const handleStateChange = (state) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      state: state,
    }));
  };

  const onExpandView = () => {
    setExpand(!expand);
  };

  return (
    <>
      <Meta
        title="Checkout items - Bamstore.ng"
        description="Checkout your cart items "
        keywords="checkout, bamstore, welcome to bamstore ng"
        url="http://bamstore.ng/checkout"
      />
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
                  Hide Order Summary
                  <span className="cursor-pointer">
                    <IoChevronUp />
                  </span>
                </p>

                <p className="text-xl font-semibold text-gray-900">
                  <span className="text-xl font-semibold text-dark">
                    &#8358;
                  </span>
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
                  Show Order Summary
                  <span className="cursor-pointer">
                    <IoChevronDown />
                  </span>
                </p>

                <p className="text-xl font-semibold text-gray-900">
                  <span className="text-xl font-semibold text-dark">
                    &#8358;
                  </span>
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
          {!isSubmitted ? (
            <CheckoutForm
              handleBillingInputChange={handleBillingInputChange}
              handleContactInputChange={handleContactInputChange}
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
              handleSubmit={handleSubmit}
              contactDetails={contactDetails}
              shippingDetails={shippingDetails}
              billingDetails={billingDetails}
              useShippingForBilling={useShippingForBilling}
              saveInfo={saveInfo}
              setSaveInfo={setSaveInfo}
              setBillingDetails={setBillingDetails}
              handleStateChange={handleStateChange}
              handleCountryChange={handleCountryChange}
              cart={cart}
              shipRate={shipRate}
              isLoading={isLoading}
            />
          ) : (
            <CheckoutSuccess shipRate={shipRate} />
          )}

          {/* desktop order summary view */}
          <div className="bg-gray-bk w-full p-4 sticky  flex-col hidden  md:block  text-dark">
            <div className="  max-w-7xl">
              <OrderSummary cart={cart} shipRate={shipRate} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CheckOut;
