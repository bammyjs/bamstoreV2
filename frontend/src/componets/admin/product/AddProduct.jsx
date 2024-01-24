import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import ProductForm from "./ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../../redux/features/product/productSlice";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categorySlice";
import Brand from "../brand/Brand";
import Category from "../category/Category";
import TabList from "../tabList";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [description, setDescription] = useState("");

  const isLoading = useSelector((state) => state.selectIsLoading);

  const { name, category, brand, price, quantity, color, regularPrice } =
    product;
  const { categories, brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.info("Please add an image");
    }

    const formData = {
      name: name,
      sku: generateKSKU(category),
      category: category,
      brand: brand,
      color: color,
      quantity: Number(quantity),
      regularPrice: regularPrice,
      price: price,
      description: description,
      image: files,
    };

    console.log(formData);

    await dispatch(createProduct(formData));

    navigate("/admin/products");
  };
  const [filteredBrands, setFilteredBrands] = useState([]);
  function filterBrands(selectedCategoryName) {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategoryName
    );
    setFilteredBrands(newBrands);
  }

  useEffect(() => {
    filterBrands(category);
    console.log(filteredBrands);
  }, [category]);

  return (
    <div className="item-center flex flex-col">
      <h3 className="text-xl text-dark text-center mb-4 md:text-3xl font-bold">
        Create New Product
      </h3>
      {isLoading && (
        <div className="flex  justify-center ">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      <TabList />

      {/* <Category />
      <Brand />

      <ProductForm
        files={files}
        setFiles={setFiles}
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
        categories={categories}
        filteredBrands={filteredBrands}
        isEditing={false}
      /> */}
    </div>
  );
};

export default AddProduct;
