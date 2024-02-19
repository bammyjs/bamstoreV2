import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, itemTotalQuantity } from "../redux/features/cartSlice";
import { IoCheckmarkCircle } from "react-icons/io5";
import Confetti from "react-confetti";

const CheckoutSuccess = () => {
  // Define state variables for the order details
  const [contactDetails, setContactDetails] = useState({});
  const [shippingDetails, setShippingDetails] = useState({});
  const [useShippingForBilling, setUseShippingForBilling] = useState({});
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      const orderDetails = JSON.parse(storedOrderDetails);
      // Now you can use orderDetails as needed, for example:
      setContactDetails(orderDetails.contactDetails);
      setShippingDetails(orderDetails.shippingDetails);
      setUseShippingForBilling(orderDetails.useShippingForBilling);
      setTotalCartAmount(orderDetails.totalCartAmount);
    }
  }, []);
  // Component logic...

  // Optionally, clear cart and item total quantity if needed
  // useEffect(() => {
  //   dispatch(clearCart());
  //   dispatch(itemTotalQuantity());
  // }, [dispatch]);

  return (
    <>
      <Confetti />

      <div className="md:max-w-xl mx-auto mb-4  p-4 bg-light ">
        <div className=" flex flex-col items-center gap-4  text-dark">
          <h2 className="text-dark text-3xl">Checkout Successful</h2>

          <div className="text-dark flex items-center gap-4">
            <IoCheckmarkCircle style={{ fontSize: "40px" }} />
            <div className="flex flex-col items-left justify-center">
              {/* <p>Order #{formData._id}</p> */}
              <h3 className="text-2xl">
                Thank you, {shippingDetails?.firstName} for your purchase
              </h3>
            </div>
          </div>
          <div className="flex flex-col  border border-gray rounded-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.913911960699!2d5.1871185758496665!3d7.250638364284851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478f9c061d7827%3A0xc550ed134a7985a1!2sST%20THOMAS&#39;%20ANGLICAN%20CHURCH%2C%20340110%2C%20Akure%2C%20Ondo!5e0!3m2!1sen!2sng!4v1693995367901!5m2!1sen!2sng"
              width="100%"
              height="250"
              className="border-b rounded-t-2xl max-w-7xl"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              frameborder="0"
            ></iframe>
            <div className="flex flex-col p-4 ">
              <h3 className="text-lg text-dark font-semibold ">
                Your Order as been placed
              </h3>
              <p className="text-black">
                Please save your payment receipt and share it with our sales rep
                on Instagram: @neftechnologies or on WhatsApp through this link:
                https://wa.link/h1q6wy ALSO PLEASE NOTE THAT ALL SHIPPING AND
                DELIVERY FEES ARE CALCULATED & DETERMINED BY ITEM WEIGHT AND
                DISTANCE.
              </p>
            </div>
          </div>
          <div className="bg-light border border-gray rounded-md p-4 flex flex-col gap-4  w-full   text-dark">
            <h3 className="text text-dark font-semibold ">Order details</h3>

            <div className="w-full mx-auto  max-w-7xl flex flex-col  gap-2">
              <div className="flex flex-col  items-start gap-1">
                <h4 className="text font-semibold">Contact Information</h4>
                <p>{contactDetails?.contact}</p>
              </div>
              <div className="flex flex-col  items-start gap-1">
                <h4 className="text font-semibold">Shipping Address</h4>
                <p>
                  {shippingDetails?.firstName} {""} {shippingDetails?.lastName}
                </p>

                <p>{shippingDetails?.address}</p>

                <p>
                  {shippingDetails?.city} {","} {shippingDetails?.state}
                </p>

                <p>{shippingDetails?.zipCode}</p>

                <p>{shippingDetails?.country}</p>

                <p>{shippingDetails?.phone}</p>
              </div>
              <div className="flex flex-col  items-start gap-1">
                <h4 className="text font-semibold">Shipping Method</h4>
                <p>GIG logistics</p>
              </div>
              <div className="flex flex-col  items-start gap-1">
                <h4 className="text font-semibold">Payment Method</h4>
                <div className="flex items-center gap-3">
                  <p>Direct Bank Transfer :</p>
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="text-lg font-semibold text-dark">
                      &#8358;
                    </span>
                    {new Intl.NumberFormat("en-NG").format(totalCartAmount)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  items-start gap-1">
                <h4 className="text font-semibold">Billing Address</h4>
                <p>
                  {useShippingForBilling?.firstName} {""}{" "}
                  {useShippingForBilling?.lastName}
                </p>

                <p>{useShippingForBilling?.address}</p>

                <p>
                  {useShippingForBilling?.city} {","}{" "}
                  {useShippingForBilling?.state}
                </p>

                <p>{useShippingForBilling?.zipCode}</p>

                <p>{useShippingForBilling?.country}</p>

                <p>{useShippingForBilling?.phone}</p>
              </div>
            </div>
          </div>

          <button className="btn btn-primary w-full">
            <Link to="/orders">View Order Status</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccess;
