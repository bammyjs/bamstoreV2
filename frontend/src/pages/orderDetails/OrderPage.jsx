import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  IoAddCircle,
  IoChevronDown,
  IoChevronUp,
  IoEyeOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../redux/features/cartSlice";
import OrderSummary from "./OrderSummary";
import {
  getOrder,
  getOrders,
  updateOrderStatus,
} from "../../redux/features/product/orderSlice";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/features/order/ordersApi";

export const OrderPage = () => {
  const navigate = useNavigate();
  const shipRate = 5000;
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  return (
    <main
      id="main-content"
      className="w-full  bg-light h-fit flex flex-col items-center gap-6  p-4   "
    >
      <section className="container text-dark w-full p-4 border-2 border-gray  rounded-lg flex flex-col  md:justify-between  max-w-7xl ">
        <h3 className="text-xl text-center mb-4 md:text-3xl font-bold">
          Your orders<span className="text-red-700">{}</span>
        </h3>
        <div className="overflow-x-scroll">
          <table className="table z-0 table-pin-rows   w-full  ">
            {isLoading ? (
              <div className="flex  justify-center ">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
              </div>
            ) : (
              <>
                <thead className="bg-gray-50 ">
                  <tr className="cursor-pointer ">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S/N
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      View order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders &&
                    orders.map((order, i) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.orderDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.orderAmount + shipRate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.orderStatus}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/order-preview/${order._id}`}
                            title="View Order Details"
                            className="hover:text-gray"
                          >
                            <IoEyeOutline
                              style={{ fontSize: "20px", color: "blue" }}
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </section>
    </main>
  );
};
