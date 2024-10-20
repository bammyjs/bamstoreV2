import React, { useEffect, useState } from "react";
import { clearCart, getTotals, updateCartItems } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "./orderDetails/OrderSummary";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../redux/features/auth/authSlice";
import { createOrder } from "../redux/features/product/orderSlice";
import { CheckoutForm } from "../componets/checkout/CheckoutForm";
import { formToJSON } from "axios";
import { Meta } from "../componets/Meta";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);

  console.log("current User:", user);

  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [expand, setExpand] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactDetails, setContactDetails] = useState({ contact: "" });
  const [paymentMethod, setPaymentMethod] = useState("pay_online");
  const [paymentOption, setPaymentOption] = useState("");
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
  console.log("shipping info:", shippingDetails);

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
  const [selectedState, setSelectedState] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null); // Store selection state
  const [activeDeliveryTab, setActiveDeliveryTab] = useState("homeDelivery"); // Set initial state for delivery tab
  const [activePaymentTab, setActivePaymentTab] = useState("payOnline");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const shipRate = null;

  const { isSuccess, isError, message } = useSelector((state) => state.orders);

  const handleStoreSelect = (store) => {
    setSelectedStore(store); // Store selected store details in the state
    // Update cart items with the selected store ID
    // Log the selected store to verify
    console.log("Selected Store:", store);
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      storeId: store._id, // Assign the selected store ID to each cart item
    }));

    // Dispatch an action to update the cart with the storeId for each item
    dispatch(updateCartItems(updatedCartItems));

    // Log the selected store to verify
    console.log("Selected Store:", store);

    // useEffect(() => {
    //   console.log("Updated Cart Items with StoreId:", cartItems); // Verify that storeId is set for each item
    // }, [cartItems]);

    setShippingDetails({
      ...shippingDetails,
      storeName: store.storeName,
      address: store.address,
      city: store.city,
      state: store.state,
    });
  };
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentOption(e.target.value);
  };

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

  const confirmOrder = async () => {
    const formData = {
      orderDate: new Date().toLocaleDateString(),
      orderTime: new Date().toLocaleTimeString(),
      orderAmount: cart.cartTotalAmount,
      orderStatus: "reserved", // For store pickup
      paymentMethod: "payAtStore", // Pay at store option
      cartItems: cart.cartItems,
      deliveryMethod:
        activeDeliveryTab === "inStorePickup"
          ? "inStorePickup"
          : "homeDelivery",
      shippingAddress:
        activeDeliveryTab === "inStorePickup" ? selectedStore : shippingDetails,
    };

    setIsLoading(true);

    try {
      const orderResponse = await dispatch(createOrder(formData)).unwrap();
      if (orderResponse && orderResponse.order) {
        // Capture Order Details
        setOrderDetails(orderResponse.order);
        setOrderConfirmed(true);
        setOrderId(orderResponse.order._id);
        localStorage.setItem(
          "orderDetails",
          JSON.stringify(orderResponse.order)
        );
        alert("Order created and reserved for store pickup.");

        // Navigate to the checkout success page with the orderId as query parameter
        navigate(`/checkout-success?orderId=${orderResponse.order._id}`);
        dispatch(clearCart());
      } else {
        console.error("Order creation failed:", orderResponse);
        alert("Error creating order for store pickup. Please try again.");
      }
    } catch (error) {
      console.error("Order Creation Error:", error.message);
      alert("An error occurred while confirming your order.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Detailed logging of cart items
  //   console.log("Cart items before order creation:", cart.cartItems);
  //   cart.cartItems.forEach((item, index) => {
  //     console.log(`Item ${index + 1}:`, item);
  //     console.log(`Item ${index + 1} storeId:`, item.storeId); // Verify storeId
  //   });

  //   // Make sure cartItems are properly structured and not empty
  //   if (!cart.cartItems || cart.cartItems.length === 0) {
  //     console.error("No items in cart to create an order");
  //     return;
  //   }

  //   // Prepare order data based on the schema
  //   const formData = {
  //     orderDate: new Date().toLocaleDateString(),
  //     orderTime: new Date().toLocaleTimeString(),
  //     orderAmount: cart.cartTotalAmount,
  //     orderStatus: paymentMethod === "pay_online" ? "pending" : "reserved",
  //     paymentMethod: paymentMethod,
  //     cartItems: cart.cartItems, // Ensure cartItems are correctly structured
  //     deliveryMethod:
  //       activeDeliveryTab === "inStorePickup"
  //         ? "inStorePickup"
  //         : "homeDelivery",
  //     shippingAddress:
  //       activeDeliveryTab === "inStorePickup" ? selectedStore : shippingDetails,
  //   };

  //   console.log("Form data sent", formData); // Debugging: See what data is being sent

  //   setIsLoading(true); // Start loading

  //   try {
  //     // Step 1: Create order
  //     const createOrderResponse = await dispatch(
  //       createOrder(formData)
  //     ).unwrap();
  //     console.log("createOrderResponse:", createOrderResponse);

  //     // Step 2: Initiate Flutterwave Payment
  //     const tx_ref = createOrderResponse.tx_ref;
  //     if (!tx_ref) {
  //       throw new Error("Transaction reference (tx_ref) is missing from the response.");
  //     }
  //     console.log("tx_ref from created order:", tx_ref);

  //     const userID = user?.user?._id?.toString();
  //     console.log("User ID:", userID);
  //     if (!userID) {
  //       console.error("User ID is undefined. Cannot proceed with payment.");
  //       return;
  //     }

  //     const paymentResponse = await fetch(
  //       "http://localhost:5000/api/order/payWithFlutterwave",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userID: userID,
  //           items: cart.cartItems,
  //           // tx_ref: tx_ref,
  //         }),
  //       }
  //     );

  //     const paymentData = await paymentResponse.json();
  //     console.log("Payment Response Data:", paymentData);
  //     if (paymentResponse.ok && paymentData?.data?.link) {
  //       console.log("Payment Response Data:", paymentData);
  //       window.open(paymentData.data.link, "_blank");
  //       // window.location.href = paymentData.data?.link;
  //     } else {
  //       console.error("Payment initialization failed", paymentData.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Detailed logging of cart items
    console.log("Cart items before order creation:", cart.cartItems);
    cart.cartItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);
    });

    // Prepare order data
    const formData = {
      orderDate: new Date().toLocaleDateString(),
      orderTime: new Date().toLocaleTimeString(),
      orderAmount: cart.cartTotalAmount,
      orderStatus: paymentMethod === "pay_online" ? "pending" : "reserved",
      paymentMethod: paymentMethod,
      cartItems: cart.cartItems,
      deliveryMethod:
        activeDeliveryTab === "inStorePickup"
          ? "inStorePickup"
          : "homeDelivery",
      shippingAddress:
        activeDeliveryTab === "inStorePickup" ? selectedStore : shippingDetails,
    };

    setIsLoading(true); // Start loading

    try {
      // Step 1: Create the order
      const createOrderResponse = await dispatch(
        createOrder(formData)
      ).unwrap();
      console.log("createOrderResponse:", createOrderResponse);

      // Save order details to localStorage after order is created
      localStorage.setItem(
        "orderDetails",
        JSON.stringify(createOrderResponse.order)
      );

      // Step 2: Check the structure of the response
      if (
        createOrderResponse &&
        createOrderResponse.payment_link &&
        createOrderResponse.tx_ref
      ) {
        console.log("Payment Link Found:", createOrderResponse.payment_link);
        console.log("txRef", createOrderResponse.tx_ref);
        // Redirect to the payment link
        window.location.href = createOrderResponse.payment_link;
      } else {
        console.error(
          "Payment link missing in the response:",
          createOrderResponse
        );
        // Display error to the user
        alert("Payment link not found. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while processing your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderDetails) {
      console.log("Order Details after creation:", orderDetails); // Verify that order details are being set
    } else {
      console.log("Order Details is null or undefined.");
    }
  }, [orderDetails]);

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
    setSelectedState(state);
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
          <CheckoutForm
            handleBillingInputChange={handleBillingInputChange}
            handleContactInputChange={handleContactInputChange}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleCheckboxEmail={handleCheckboxEmail}
            handleSubmit={handleSubmit}
            contactDetails={contactDetails}
            shippingDetails={shippingDetails}
            billingDetails={billingDetails}
            useShippingForBilling={useShippingForBilling}
            saveInfo={saveInfo}
            setSaveInfo={setSaveInfo}
            setBillingDetails={setBillingDetails}
            handleStateChange={handleStateChange}
            selectedState={selectedState}
            handleCountryChange={handleCountryChange}
            handlePaymentChange={handlePaymentChange}
            paymentMethod={paymentMethod}
            cart={cart}
            shipRate={shipRate}
            isLoading={isLoading}
            cartItems={cartItems}
            setOrderDetails={setOrderDetails} // Capture order details
            orderDetails={orderDetails}
            handleStoreSelect={handleStoreSelect}
            activeDeliveryTab={activeDeliveryTab}
            setActiveDeliveryTab={setActiveDeliveryTab}
            activePaymentTab={activePaymentTab}
            setActivePaymentTab={setActivePaymentTab}
            user={user}
            paymentOption={paymentOption}
            confirmOrder={confirmOrder}
            orderConfirmed={orderConfirmed}
            setOrderId={setOrderId}
          />

          {/* desktop order summary view */}
          <div className=" w-full p-4 sticky  flex-col hidden  md:block  text-dark">
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
