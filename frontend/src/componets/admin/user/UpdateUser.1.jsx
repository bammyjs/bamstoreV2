import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./UserForm";
import {
  getUser,
  selectUser,
  selectIsLoading,
} from "../../../redux/features/auth/authSlice";

export const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const updateUser = useSelector(selectUser);
  const [user, setUser] = useState(updateUser);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    setUser(selectUser);
  }, [updateUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: "",
      role: user?.role,
      phone: user?.phone,
      photo: files,
    };

    console.log(formData);

    await dispatch(updateUser({ id, formData }));
    // await dispatch(getProducts());
    navigate("/admin/users");
  };

  return (
    <div className="item-center flex flex-col justify-center">
      <h3 className="text-xl text-dark text-center mb-4 md:text-3xl font-bold">
        Edit users<span className="text-red-700"></span>
      </h3>
      {isLoading && (
        <div className="flex  justify-center ">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      <UserForm
        user={user}
        handleInputChange={handleInputChange}
        saveUser={saveUser}
        isEditing={true}
      />
    </div>
  );
};
