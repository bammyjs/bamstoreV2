import React, { useEffect, useState } from "react";
import {
  IoBagCheckSharp,
  IoCreateOutline,
  IoDocumentLockOutline,
  IoEyeOutline,
  IoInformationCircle,
  IoPersonCircleOutline,
  IoTrashOutline,
  IoTrendingUpSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/features/order/ordersApi";
import { useGetAllUsersQuery } from "../../redux/features/user/usersApi";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";

import { url } from "../../redux/features/auth/api";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const DashBoardPreview = () => {
  const dispatch = useDispatch();
  const [statistics, setStatistics] = useState({
    totalIncome: 0,
    totalOrders: 0,
    totalNewUsers: 0,
  });

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const ordersUrl = `${BACKEND_URL}/api/order/orders7days`;
      const usersUrl = `${BACKEND_URL}/api/users/getUsers7days`;
      console.log(ordersUrl);
      try {
        const [ordersResponse, usersResponse] = await Promise.all([
          axios.get(ordersUrl),
          axios.get(usersUrl),
        ]);

        setStatistics({
          totalIncome: ordersResponse.data[0]?.totalIncome || 0,
          totalOrders: ordersResponse.data[0]?.totalOrders || 0,
          totalNewUsers: usersResponse.data.totalNewUsers,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
        // Consider setting an error state and displaying it
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users`);
        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
        // Optionally set an error state here
      }
    };

    fetchUsers();
  }, []);

  // Filter users registered in the last 7 days
  const last7Days = new Date(new Date().setDate(new Date().getDate() - 7));
  const recentUsers = users.filter(
    (user) => new Date(user.createdAt) >= last7Days
  );

  const delUser = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(getUsers());

    // Reload the page after successful deletion
    window.location.reload();
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete user",
      message: "Are you sure you want to delete this user.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delUser(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  return (
    <div className="">
      <div id="24h">
        <h1 className="font-bold py-4 uppercase">Last 7days Statistics</h1>
        <div
          id="stats"
          className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="bg-black/60 to-white/5 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <IoPersonCircleOutline style={{ fontSize: "40px" }} />
              </div>
              <div>
                <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                  Users
                </p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>+{statistics.totalNewUsers}</span>
                  <span>
                    <IoTrendingUpSharp style={{ fontSize: "20px" }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-black/60 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <IoBagCheckSharp style={{ fontSize: "40px" }} />
              </div>
              <div>
                <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                  Income
                </p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <p className="text-base font-bold ">
                    <span>&#8358;</span>
                    {new Intl.NumberFormat("en-NG").format(
                      statistics.totalIncome
                    )}
                  </p>
                  {/* <span>${statistics.totalIncome.toFixed(2)}</span> */}
                  <span>
                    <IoTrendingUpSharp style={{ fontSize: "20px" }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-black/60 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <IoDocumentLockOutline style={{ fontSize: "40px" }} />
              </div>
              <div>
                <p className="text-blue-300 text-sm font-medium uppercase leading-4">
                  Orders
                </p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>+{statistics.totalOrders}</span>
                  <span>
                    <IoTrendingUpSharp style={{ fontSize: "20px" }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <iframe
          style={{"background: #F1F5F4;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);width: 100vw;height: 100vh;"}}
          src="https://charts.mongodb.com/charts-project-0-gdwym/embed/dashboards?id=65ad1f6b-f981-40f2-8abb-91b2db8e7da6&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
        /> */}

      <div id="last-users">
        <h1 className="font-bold py-4 uppercase">Last 7days users</h1>
        <div className="overflow-x-scroll">
          <table className="table  w-full  whitespace-nowrap">
            <thead className="bg-pry-deep">
              <th className="text-left py-3 px-2 rounded-l-lg">s/n</th>
              <th className="text-left py-3 px-2 rounded-l-lg">FullName</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Role</th>
              <th className="text-left py-3 px-2">Phone</th>
              <th className="text-left py-3 px-2 rounded-r-lg">Action</th>
            </thead>
            {recentUsers?.map((user, i) => {
              return (
                <tbody key={i}>
                  <tr className=" border-b text-dark border-gray-700">
                    <td className="py-3 px-2">{i + 1}</td>
                    <td className="py-3 px-2  font-bold">
                      <div className="inline-flex space-x-3 items-center">
                        {/* <span>
                    <img
                      className="rounded-full w-8 h-8"
                      src={user.image?.[0]}
                    />
                  </span> */}
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">{user.email}</td>

                    <td className="py-3 px-2">{user.role}</td>
                    <td className="py-3 px-2">{user.phone}</td>
                    <td className="py-3 px-2">
                      <div className="inline-flex items-center space-x-3">
                        <Link
                          to={`/admin/updateUser/${user._id}`}
                          title="Edit"
                          className="hover:text-gray"
                        >
                          <IoCreateOutline
                            style={{ fontSize: "20px", color: "green" }}
                          />
                        </Link>
                        <Link
                          to={`/user/${user._id}`}
                          title="Edit password"
                          className="hover:text-gray"
                        >
                          <IoEyeOutline
                            style={{ fontSize: "20px", color: "blue" }}
                          />
                        </Link>

                        <IoTrashOutline
                          style={{ fontSize: "20px", color: "red" }}
                          onClick={() => confirmDelete(user._id)}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPreview;
