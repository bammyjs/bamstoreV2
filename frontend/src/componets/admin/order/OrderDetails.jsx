import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getOrder,
  updateOrderStatus,
} from "../../../redux/features/product/orderSlice";
import { OrderPreview } from "../../../pages/orderDetails/OrderPreview";
import { useGetOrderQuery } from "../../../redux/features/order/ordersApi";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { data: order, error, isLoading } = useGetOrderQuery(id);
  console.log("current order:", order);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
    }
  }, [order]);

  const editOrder = (e) => {
    e.preventDefault();
    const formData = { orderStatus: status }; // Ensure this matches your backend expectation
    dispatch(updateOrderStatus({ id, formData }));
  };

  // if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <OrderPreview />

      <div className=" flex items-center justify-center ">
        <>
          {isLoading && (
            <div className="flex  justify-center ">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </div>
          )}

          <div className=" ">
            <div className="p-4 w-full border-2 border-dark flex flex-col gap-3">
              <h4 className="text-center text-dark">Update Status</h4>
              <form onSubmit={editOrder} className="flex gap-3">
                <select
                  className="select select-secondary"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    -- Choose one --
                  </option>
                  <option value="Order canceled">Canceled</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button type="submit" className="btn btn-primary ">
                  Update Status
                </button>
              </form>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default OrderDetails;
