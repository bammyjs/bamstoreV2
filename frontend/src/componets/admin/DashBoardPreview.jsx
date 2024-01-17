import React from "react";
import {
  IoAdd,
  IoAddOutline,
  IoBagCheckSharp,
  IoDocumentLockOutline,
  IoDocumentOutline,
  IoHomeOutline,
  IoInformationCircle,
  IoPersonAddOutline,
  IoPersonAddSharp,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoTrendingUpSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const DashBoardPreview = () => {
  return (
    <div className="">
      <div id="24h">
        <h1 className="font-bold py-4 uppercase">Last 24h Statistics</h1>
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
                  <span>+28</span>
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
                  <span>$2,873.88</span>
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
                  <span>+79</span>
                  <span>
                    <IoTrendingUpSharp style={{ fontSize: "20px" }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="last-incomes">
        <h1 className="font-bold py-4 uppercase">Last 24h incomes</h1>
        <div
          id="stats"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div className="bg-black/60 to-white/5 rounded-lg">
            <div className="flex flex-row items-center">
              <div className="text-xl p-2">💰</div>
              <div className="p-2">
                <p className="text-lg font-bold">
                  <span>&#8358;</span>348
                </p>
                <p className="text-gray-500 font-medium">Iphone 14 proMax</p>
                <p className="text-gray-500 text-sm">24 Nov 2022</p>
              </div>
            </div>
            <div className="border-t border-white/5 p-4">
              <Link className="inline-flex space-x-2 items-center text-center">
                <IoInformationCircle style={{ fontSize: "20px" }} />
                <span>Info</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="last-users">
        <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
        <div className="overflow-x-scroll">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-pry-deep">
              <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Group</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </thead>
            <tr className="border-b text-dark border-gray-700">
              <td className="py-3 px-2  font-bold">
                <div className="inline-flex space-x-3 items-center">
                  <span>
                    <img
                      className="rounded-full w-8 h-8"
                      src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                      alt=""
                    />
                  </span>
                  <span>Thai Mei</span>
                </div>
              </td>
              <td className="py-3 px-2">thai.mei@abc.com</td>
              <td className="py-3 px-2">User</td>
              <td className="py-3 px-2">Approved</td>
              <td className="py-3 px-2">
                <div className="inline-flex items-center space-x-3">
                  <Link to={"#"} title="Edit" className="hover:text-gray">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={"#"}
                    title="Edit password"
                    className="hover:text-gray"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={"#"}
                    title="Suspend user"
                    className="hover:text-gray"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPreview;
