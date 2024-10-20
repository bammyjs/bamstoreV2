import React, { useEffect, useRef, useState } from "react";
import { useGetOrderQuery } from "../../redux/features/order/ordersApi";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  IoCalendarNumber,
  IoCheckmarkCircle,
  IoChevronDown,
  IoChevronUp,
  IoTime,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import logo from "../../assets/bammylogo.png";
import ProductReview from "../../componets/product/ProductReview";
import { Meta } from "../../componets/Meta";
import { QRCodeSVG } from "qrcode.react";

export const OrderPreview = () => {
  const navigate = useNavigate();
  const pdfRef = useRef();
  const { id } = useParams();
  const shipRate = 5000;
  const [expand, setExpand] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { user } = useSelector((state) => state.auth);

  
  const { data: order, error, isLoading } = useGetOrderQuery(id);
  console.log("current order:", order);

   // Check if the user is logged in
   useEffect(() => {
    if (!user) {
      // Redirect to login page with the current path as the return URL
      navigate(`/login?redirect=/order-preview/${id}`);
    }
  }, [user, navigate, id]);


  const handleReviewClick = (productId) => {
    setSelectedProductId(productId);
    document.getElementById("my_modal_3").showModal();
  };

  const handleReviewBigClick = (productId) => {
    setSelectedProductId(productId);
    document.getElementById("my_modal_4").showModal();
  };

  const onExpandView = () => {
    setExpand(!expand);
  };

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0; // Initial vertical position

      // Add the image to PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Watermark text settings
      const watermark = "Bamstore Receipt";
      pdf.setFontSize(60);
      pdf.setTextColor(150);
      // pdf.setOpacity(0.1);
      pdf.text(watermark, 35, pdf.internal.pageSize.getHeight() / 2, {
        angle: -45,
      });

      // Reset opacity to fully opaque for any further text or elements
      // pdf.setOpacity(1);

      // Save the PDF
      pdf.save(`BamstoreNG.pdf`);
    });
  };

  return (
    <>
      <Meta
        title="Order preview  - Bamstore.ng"
        description="preview  your orders details"
        keywords="order,view order details, bamstore order, welcome to bamstore ng"
        url="http://bamstore.ng/order-details"
      />
      <main
        id="main-content"
        className="w-full  bg-light h-fit flex flex-col items-center gap-6   "
      >
        <section
          useCORS={true}
          ref={pdfRef}
          className="container w-full   flex flex-col md:flex-row md:justify-between  max-w-7xl "
        >
          <div data-html2canvas-ignore className=" md:hidden">
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
                    order?.orderAmount + shipRate
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
                    order?.orderAmount + shipRate
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
              <div className="bg-gray-bk w-full  sticky  flex-col md:hidden   text-dark">
                <div className="  max-w-7xl">
                  <div className="w-full  bg-gray-bk px-4 py-6 sm:px-8 sm:py-10">
                    <div className="flow-root">
                      <ul className="flex flex-col gap-2">
                        {order?.cartItems?.map((cartHistory) => {
                          return (
                            <li
                              key={cartHistory._id}
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
                                        cartHistory.price *
                                          cartHistory.cartQuantity
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <button
                                data-html2canvas-ignore
                                className="btn btn-secondary"
                                onClick={() =>
                                  handleReviewClick(cartHistory._id)
                                }
                              >
                                Review Product
                              </button>
                              <dialog id="my_modal_3" className="modal">
                                <div className="modal-box bg-neutral text-gray max-w-4xl">
                                  <form method="dialog" className="text-dark ">
                                    {/* if there is Link button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-4">
                                      ✕
                                    </button>
                                  </form>
                                  <h3 className=" text-center font-bold text-lg text-dark">
                                    Review: {""}{" "}
                                    <span className="font-bold text-lg text-pry-deep">
                                      {cartHistory.name}
                                    </span>
                                  </h3>
                                  {selectedProductId && (
                                    <ProductReview
                                      productId={selectedProductId}
                                    />
                                  )}
                                </div>
                              </dialog>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-b py-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-lg font-semibold text-dark">
                          <span className="text-lg font-semibold text-dark">
                            &#8358;
                          </span>
                          {new Intl.NumberFormat("en-NG").format(
                            order?.orderAmount
                          )}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Shipping</p>
                        <p className="text-lg font-semibold text-dark">
                          <span className="text-lg font-semibold text-dark">
                            &#8358;
                          </span>
                          {new Intl.NumberFormat("en-NG").format(shipRate)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Total</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        <span className="text-2xl font-semibold text-dark">
                          &#8358;
                        </span>
                        {new Intl.NumberFormat("en-NG").format(
                          order?.orderAmount + shipRate
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:max-w-xl mx-auto mb-4  p-4 bg-light ">
            <div className="w-full flex items-center  justify-center my-4  ">
              <img
                className="logo w-[100px] md:cursor-pointer"
                src={logo}
                alt="Bamstore Logo"
              />
            </div>
            <div className=" flex flex-col items-center gap-4  text-dark">
              <h2 className="text-dark text-3xl">Order Details</h2>
              <div className="w-full border-2 border-dark p-4 my-2 text-xl text-dark font-bold text-center ">
                <p>
                  Order Status:{" "}
                  <span className="text-success uppercase">
                    {order?.orderStatus}
                  </span>
                </p>
              </div>

              <div className="text-dark flex items-center gap-4">
                <IoCheckmarkCircle style={{ fontSize: "40px" }} />
                <div className="flex flex-col items-left justify-center">
                  <p>Order ID: #{order?._id}</p>
                  <p className=" flex items-center gap-2">
                    <IoCalendarNumber />
                    <span>{order?.orderDate}</span>
                    {""} <IoTime />
                    <span>{order?.orderTime}</span>
                  </p>
                </div>
              </div>
              {/* mobile order cart history */}

              {/* mobile order cart history ends */}

              <div
                data-html2canvas-ignore
                className="flex flex-col  border border-gray rounded-md"
              >
                <div className="flex flex-col p-4 ">
                  <h3 className="text-lg text-dark font-semibold ">
                    Your Order as been placed
                  </h3>
                  <p className="text-black">
                    Please save your payment receipt and share it with our sales
                    rep on Instagram: @bamstoreNG or on WhatsApp through this
                    link: https://wa.link/h1q6wy ALSO PLEASE NOTE THAT ALL
                    SHIPPING AND DELIVERY FEES ARE CALCULATED & DETERMINED BY
                    ITEM WEIGHT AND DISTANCE.
                  </p>
                </div>
              </div>
              {/* Display QR code for in-store payment */}
              {order?.paymentMethod === "payAtStore" && (
                <div className="w-full flex flex-col items-center gap-4">
                  <h3 className="text-lg text-center text-emerald-600">
                    Present this QR code at the store to complete your payment:
                  </h3>
                  <QRCodeSVG value={order?._id} size={200} />
                  <p className="mt-2  text-sm text-center text-gray-600">
                    Scan this code at the selected store to proceed with your
                    payment and pickup.
                  </p>
                </div>
              )}

              <div className="bg-light border border-gray rounded-md p-4 flex flex-col gap-4  w-full   text-dark">
                {/* <h3 className="text text-dark font-semibold ">Order details</h3> */}

                <div className="w-full mx-auto  max-w-7xl flex flex-col  gap-2">
                  <div className="flex flex-col  items-start gap-1">
                    <h4 className="text font-semibold">Contact Information</h4>
                    <p>{order?.shippingAddress?.phone || "N/A"}</p>
                  </div>
                  <div className="flex flex-col  items-start gap-1">
                    <h4 className="text font-semibold">Shipping Address</h4>
                    <p>
                      {order?.shippingAddress?.firstName}{" "}
                      {order?.shippingAddress?.lastName}
                    </p>
                    <p>{order?.shippingAddress?.address}</p>
                    <p>
                      {order?.shippingAddress?.city},{" "}
                      {order?.shippingAddress?.state}
                    </p>
                    <p>{order?.shippingAddress?.zipCode}</p>
                    <p>{order?.shippingAddress?.country}</p>
                    <p>{order?.shippingAddress?.phone}</p>
                  </div>
                  <div className="flex flex-col  items-start gap-1">
                    <h4 className="text font-semibold">Delivery Method</h4>
                    <p>{order?.deliveryMethod}</p>
                  </div>
                  <div className="flex flex-col  items-start gap-1">
                    <h4 className="text font-semibold">Payment Method</h4>
                    <div className="flex items-center gap-3">
                      <p>{order?.paymentMethod} :</p>
                      <p className="text-lg font-semibold text-gray-900">
                        <span className="text-lg font-semibold text-dark">
                          &#8358;
                        </span>
                        {new Intl.NumberFormat("en-NG").format(
                          order?.orderAmount
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col  items-start gap-1">
                    <h4 className="text font-semibold">Payment Status</h4>
                    <p>{order?.paymentStatus}</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-between gap-3">
                <button
                  data-html2canvas-ignore
                  className="btn btn-primary "
                  onClick={downloadPDF}
                >
                  Download as PDF
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-bk w-full p-4 sticky  flex-col hidden  md:block  text-dark">
            <div className="  max-w-7xl">
              <div className="w-full  bg-gray-bk px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="flex flex-col gap-2">
                    {order?.cartItems?.map((cartHistory) => {
                      return (
                        <li
                          key={cartHistory._id}
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
                          <button
                            data-html2canvas-ignore
                            className="btn btn-secondary"
                            onClick={() =>
                              handleReviewBigClick(cartHistory._id)
                            }
                          >
                            Review Product
                          </button>
                          <dialog id="my_modal_4" className="modal">
                            <div className="modal-box bg-neutral  text-gray max-w-4xl">
                              <form method="dialog" className="text-dark ">
                                {/* if there is Link button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-4">
                                  ✕
                                </button>
                              </form>
                              <h3 className=" text-center font-bold text-lg text-dark">
                                Review: {""}{" "}
                                <span className="font-bold text-lg text-pry-deep">
                                  {cartHistory.name}
                                </span>
                              </h3>
                              {selectedProductId && (
                                <ProductReview productId={selectedProductId} />
                              )}
                            </div>
                          </dialog>
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
                      <span className="text-lg font-semibold text-dark">
                        &#8358;
                      </span>
                      {new Intl.NumberFormat("en-NG").format(
                        order?.orderAmount
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-dark">
                      <span className="text-lg font-semibold text-dark">
                        &#8358;
                      </span>
                      {new Intl.NumberFormat("en-NG").format(shipRate)}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-2xl font-semibold text-dark">
                      &#8358;
                    </span>
                    {new Intl.NumberFormat("en-NG").format(
                      order?.orderAmount + shipRate
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
