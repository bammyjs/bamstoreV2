import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createStore,
  deleteStore,
  getStores,
} from "../../../redux/features/pickupStore/pickUpStoreSlice";
import { shortenText } from "../../../utils";
import ReactPaginate from "react-paginate";
import { IoCreateOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ManageStore = () => {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState(null); // For editing purposes
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { stores, isLoading, isError } = useSelector((state) => state.stores);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  const saveStore = async (e) => {
    e.preventDefault();

    if (!storeName || !address || !phone || !email) {
      return toast.error("Please fill in all required fields");
    }

    const formData = {
      storeName,
      address,
      state,
      city,
      phone,
      email,
      contactPerson: {
        name: contactPersonName,
        phone: contactPersonPhone,
        email: contactPersonEmail,
      },
    };

    if (selectedStoreId) {
      await dispatch(updateStore({ id: selectedStoreId, formData }));
    } else {
      await dispatch(createStore(formData));
    }

    setStoreName("");
    setAddress("");
    setState("");
    setCity("");
    setPhone("");
    setEmail("");
    setContactPersonName("");
    setContactPersonPhone("");
    setContactPersonEmail("");
    setSelectedStoreId(null);
  };

  const handleEdit = (store) => {
    setSelectedStoreId(store._id);
    setStoreName(store.storeName);
    setAddress(store.address);
    setState(store.state);
    setCity(store.city);
    setPhone(store.phone);
    setEmail(store.email);
    setContactPersonName(store.contactPerson.name);
    setContactPersonPhone(store.contactPerson.phone);
    setContactPersonEmail(store.contactPerson.email);
  };

  const handleDelete = (id) => {
    dispatch(deleteStore(id));
  };

  return (
    // <div className="manage-stores">
    //   {/* Form to Create Store */}
    //   <form onSubmit={saveStore}>
    //     <label>Store Name:</label>
    //     <input
    //       type="text"
    //       placeholder="Store name"
    //       name="storeName"
    //       value={storeName}
    //       onChange={(e) => setStoreName(e.target.value)}
    //       required
    //     />

    //     <label>Address:</label>
    //     <input
    //       type="text"
    //       placeholder="Address"
    //       name="address"
    //       value={address}
    //       onChange={(e) => setAddress(e.target.value)}
    //       required
    //     />

    //     <label>Phone:</label>
    //     <input
    //       type="text"
    //       placeholder="Phone"
    //       name="phone"
    //       value={phone}
    //       onChange={(e) => setPhone(e.target.value)}
    //       required
    //     />

    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />

    //     <div className="my-2">
    //       <button type="submit" className="btn btn-primary">
    //         Save Store
    //       </button>
    //     </div>
    //   </form>

    //   {/* List of Stores */}
    //   <div className="store-list">
    //     {stores.map((store) => (
    //       <div key={store._id}>
    //         <h4>{store.storeName}</h4>
    //         <p>{store.address}</p>
    //         <p>{store.phone}</p>
    //         <p>{store.email}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="bg-light">
      <div className=" my-3 h-12 px-10 flex items-center justify-between w-full ">
        <h1 className="w-full font-bold text-dark text-center text-2xl">
          Manage Store
        </h1>
      </div>
      <div className="flex flex-col mx-3 mt-6 lg:flex-row">
        <div className="w-full lg:w-1/3 m-1">
          <form onSubmit={saveStore} className="w-full bg-white shadow-md p-6">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-8">
                <label
                  className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                  htmlFor="dropzone-file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                    Store Image
                  </h2>

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="category_image"
                    accept="image/png, image/jpeg, image/webp"
                  />
                </label>
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="store_name"
                >
                  Store Name
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Store name"
                  name="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="State"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="bordered bg-gray w-full flex flex-col gap-2 md:w-full p-3 mb-6">
                <h3 className="text-xl text-pry-deep">Contact Staff</h3>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Contact Person Name"
                  name="contactPersonName"
                  value={contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                  required
                />
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Contact Person Phone"
                  name="contactPersonPhone"
                  value={contactPersonPhone}
                  onChange={(e) => setContactPersonPhone(e.target.value)}
                  required
                />
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Contact Person Email"
                  name="contactPersonEmail"
                  value={contactPersonEmail}
                  onChange={(e) => setContactPersonEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <button className="btn btn-primary w-full">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="overflow-x-scroll w-full px-2">
          <table className="table  w-full  whitespace-nowrap">
            {loading ? (
              <div className="flex  justify-center ">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
              </div>
            ) : (
              <>
                <thead className="bg-pry-deep">
                  <th className="text-left py-3 px-2 rounded-l-lg">s/n</th>
                  <th className="text-left py-3 px-2 rounded-l-lg">Stores</th>
                  <th className="text-left py-3 px-2">Address</th>
                  <th className="text-left py-3 px-2">State</th>
                  <th className="text-left py-3 px-2">Phone</th>
                  <th className="text-left py-3 px-2">Email</th>
                  <th className="text-left py-3 px-2 rounded-r-lg">Action</th>
                </thead>
                {stores?.map((store, i) => {
                  return (
                    <tbody key={i}>
                      <tr className=" border-b text-dark border-gray-700">
                        <td className="py-3 px-2">{i + 1}</td>
                        <td className="py-3 px-2  font-bold">
                          <div className="inline-flex space-x-3 items-center">
                            {/* <span>
                    <img
                      className="rounded-full w-8 h-8"
                      src={store.image?.[0]}
                    />
                  </span> */}
                            <span>{shortenText(store.storeName, 10)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">{store.address}</td>
                        <td className="py-3 px-2">{store.state}</td>
                        <td className="py-3 px-2">{store.phone}</td>
                        <td className="py-3 px-2">{store.email}</td>
                        <td className="py-3 px-2">
                          <div className="inline-flex items-center space-x-3">
                            <Link
                              to={`/admin/editStore/${store._id}`}
                              title="Edit"
                              className="hover:text-gray"
                            >
                              <IoCreateOutline
                                style={{ fontSize: "20px", color: "green" }}
                              />
                            </Link>
                            <Link
                              to={`/store/${store._id}`}
                              title="Edit password"
                              className="hover:text-gray"
                            >
                              <IoEyeOutline
                                style={{ fontSize: "20px", color: "blue" }}
                              />
                            </Link>

                            <IoTrashOutline
                              style={{ fontSize: "20px", color: "red" }}
                              onClick={() => handleDelete(store._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </>
            )}
          </table>
          {/* <motion.div
          variants={paginationVariants}
          initial="hidden"
          animate="visible"
        >
          <ReactPaginate
            breakLabel="..."
            previousLabel={
              showPrevBtn ? (
                <span>
                  <IoChevronBack style={{ fontSize: "15px" }} />
                </span>
              ) : null
            }
            nextLabel={
              showNextBtn ? (
                <span>
                  <IoChevronForward style={{ fontSize: "15px" }} />
                </span>
              ) : null
            }
            pageRangeDisplayed={5}
            pageCount={stores?.pages || 1}
            onPageChange={handlePageClick}
            containerClassName="join gap-4 flex items-center justify-center mt-8 mb-4"
            pageClassName="btn btn-secondary"
            activeClassName="btn-active "
          />
        </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default ManageStore;
