import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/features/cartSlice";
import { IoCheckmarkCircle } from "react-icons/io5";
import Confetti from "react-confetti";
import { Meta } from "../componets/Meta";
import { QRCodeSVG } from "qrcode.react";

const CheckoutSuccess = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth); // Get the current user state

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract the orderId from the URL query parameters
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          setError("Order ID not found in URL.");
          return;
        }

        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, // Pass JWT for authentication
            },
            withCredentials: true,
          }
        );

        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch order details.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, user?.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No order found</p>
      </div>
    );
  }

  return (
    <>
      <Meta
        title="Checkout successful - Bamstore.ng"
        description="Thank you for shopping from us @BamstoreNG No1 gadget store in Nigeria."
        keywords="checkout success, success, bamstore, welcome to bamstore ng"
        url="http://bamstore.ng/checkout-success"
      />
      <section className="w-full  bg-light h-fit flex flex-col items-center gap-6  ">
        <Confetti />
        <div className="md:max-w-xl mx-auto mb-4  p-4 bg-light ">
          <div className=" flex flex-col items-center gap-4  text-dark">
            <h2 className="text-dark text-3xl">Checkout Successful</h2>

            <div className="text-dark flex items-center gap-4">
              <IoCheckmarkCircle style={{ fontSize: "40px" }} />
              <div className="flex flex-col items-left justify-center">
                <h3 className="text-lg">
                  Thank you, {orderDetails.shippingAddress?.firstName}, for your purchase
                </h3>
                <p className="text-lg">
                  Your Order ID: <strong>{orderDetails._id}</strong>
                </p>
              </div>
            </div>

            {/* Display QR code for in-store payment */}
            {orderDetails.paymentMethod === "payAtStore" && (
              <div className="w-full flex flex-col items-center gap-4">
                <h3 className="text-lg text-center text-emerald-600">
                  Present this QR code at the store to complete your payment:
                </h3>
                <QRCodeSVG value={orderDetails._id} size={200} />
                <p className="mt-2 text-sm text-center text-gray-600">
                  Scan this code at the selected store to proceed with your
                  payment and pickup.
                </p>
              </div>
            )}

            <div className="bg-light border border-gray rounded-md p-4 flex flex-col gap-4  w-full   text-dark">
              {/* <h3 className="text text-dark font-semibold ">Order details</h3> */}
              <div className="w-full mx-auto  max-w-7xl flex flex-col  gap-2">
              <div className="flex flex-col  items-start gap-1">
                  <h4 className="text font-semibold">Order Status</h4>
                  <p className="text-warning  uppercase">{orderDetails.orderStatus}</p>
                </div>
                <div className="flex flex-col  items-start gap-1">
                  <h4 className="text font-semibold">Contact Information</h4>
                  <p>{orderDetails.shippingAddress?.phone || "N/A"}</p>
                </div>
                <div className="flex flex-col  items-start gap-1">
                  <h4 className="text font-semibold">Shipping Address</h4>
                  <p>
                    {orderDetails.shippingAddress?.firstName} {orderDetails.shippingAddress?.lastName}
                  </p>
                  <p>{orderDetails.shippingAddress?.address}</p>
                  <p>
                    {orderDetails.shippingAddress?.city}, {orderDetails.shippingAddress?.state}
                  </p>
                  <p>{orderDetails.shippingAddress?.zipCode}</p>
                  <p>{orderDetails.shippingAddress?.country}</p>
                  <p>{orderDetails.shippingAddress?.phone}</p>
                </div>
                <div className="flex flex-col  items-start gap-1">
                  <h4 className="text font-semibold">Delivery Method</h4>
                  <p>{orderDetails.deliveryMethod}</p>
                </div>
                <div className="flex flex-col  items-start gap-1">
                  <h4 className="text font-semibold">Payment Method</h4>
                  <div className="flex items-center gap-3">
                    <p>{orderDetails.paymentMethod} :</p>
                    <p className="text-lg font-semibold text-gray-900">
                      <span className="text-lg font-semibold text-dark">
                        &#8358;
                      </span>
                      {new Intl.NumberFormat("en-NG").format(orderDetails.orderAmount)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col  items-start gap-1">
                  <h4 className="text font-semibold">Payment Status</h4>
                  <p>{orderDetails.paymentStatus}</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full">
              <Link to={`/order-preview/${orderId}`}>View Order Status</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutSuccess;
