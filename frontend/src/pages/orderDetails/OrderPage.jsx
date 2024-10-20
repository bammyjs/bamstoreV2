import { IoEyeOutline } from "react-icons/io5";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/features/order/ordersApi";
import { Meta } from "../../componets/Meta";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/auth/authSlice";

export const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Check if the user is logged in
  useEffect(() => {
    if ( !user) {
      // Redirect to login page with the current path as the return URL
      navigate("/login?redirect=/orders");
    }
  }, [user,  navigate]);
  const shipRate = 5000;
  const { data: orders, error, isLoading: ordersLoading } = useGetOrdersQuery();

  

  return (
    <>
      <Meta
        title="Order Page - Bamstore.ng"
        description="Get all your orders history"
        keywords="order, bamstore order, welcome to bamstore ng"
        url="http://bamstore.ng/orders"
      />
      <main
        id="main-content"
        className="w-full  bg-light  h-screen flex flex-col items-center gap-6  p-4    "
      >
        <section className="container h-full text-dark w-full p-4 border-2 border-gray   rounded-lg flex flex-col  md:justify-between  max-w-7xl ">
          <h3 className="text-xl text-center mb-4 md:text-3xl font-bold">
            Your orders<span className="text-red-700">{}</span>
          </h3>
          <div className="overflow-x-scroll  mb-10">
            <table className="table z-0 table-pin-rows   w-full  ">
              {ordersLoading ? (
                <div className=" flex  justify-center ">
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            {i + 1}
                          </td>
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
    </>
  );
};
