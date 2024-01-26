import React, { useEffect, useState } from "react";

const UserForm = ({ user, handleInputChange, saveUser }) => {
  return (
    <div className=" w-full flex flex-col items-center ">
      <div className="w-full container   px-6  bg-neutral  rounded-lg  gap-6 flex flex-col shadow-2xl">
        <form onSubmit={saveUser} className="flex flex-col py-2 items-center">
          <div className="flex-wrap items-center justify-center flex gap-2  text-base text-dark">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name:</span>
              </div>
              <input
                placeholder="First Name"
                name="firstName"
                value={user?.firstName}
                onChange={handleInputChange}
                type="text"
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name:</span>
              </div>
              <input
                placeholder="Last Name"
                name="lastName"
                value={user?.lastName}
                onChange={handleInputChange}
                type="text"
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email:</span>
              </div>
              <input
                placeholder="Email"
                name="email"
                value={user?.email}
                onChange={handleInputChange}
                type="text"
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">User Role:</span>
              </div>
              <input
                placeholder="Role"
                name="role"
                value={user?.role}
                onChange={handleInputChange}
                type="text"
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">User Phone:</span>
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={user?.phone}
                onChange={handleInputChange}
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Address:</span>
              </div>
              <input
                type="text"
                placeholder="Address"
                name="regularPrice"
                value={user.address?.address}
                onChange={handleInputChange}
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: description }} /> */}

          <div className="my-4">
            <button type="submit" className="btn btn-primary">
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
