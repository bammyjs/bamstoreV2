import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import {
  getBrands,
  getCategories,
} from "../../redux/features/categoryAndBrand/categorySlice";
import Brand from "./brand/Brand";
import Category from "./category/Category";
import ProductForm from "./product/ProductForm";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
};

const TabList = () => {
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

  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <div className="">
      <ul
        className=" flex  justify-center gap-3 items-center "
        role="tablist"
        ref={wrapperRef}
      >
        <li className="" role="presentation">
          <button
            className={`btn btn-accent text-neutral  rounded-3xl px-7 ${
              tabSelected.currentTab === 1
                ? "btn-success bordered border-neutral text-white hover:btn-neutral focus:btn-primary disabled:bg-emerald-300"
                : "w-full justify-self-center "
            }`}
            id="tab-label-1e"
            role="tab"
            aria-setsize="3"
            aria-posinset="1"
            tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
            aria-controls="tab-panel-1e"
            aria-selected={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
          >
            <span>Add Product</span>
          </button>
        </li>
        <li className="" role="presentation">
          <button
            className={`btn  btn-accent text-neutral rounded-3xl px-7 ${
              tabSelected.currentTab === 2
                ? "btn-success bordered border-neutral text-white hover:btn-neutral focus:btn-primary disabled:bg-emerald-300"
                : "w-full justify-self-center"
            }`}
            id="tab-label-2e"
            role="tab"
            aria-setsize="3"
            aria-posinset="2"
            tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
            aria-controls="tab-panel-2e"
            aria-selected={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
            onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
          >
            <span>Create Category</span>
          </button>
        </li>
        <li className="" role="presentation">
          <button
            className={`btn  btn-accent text-neutral rounded-3xl px-7 ${
              tabSelected.currentTab === 3
                ? "btn-success bordered border-neutral text-white hover:btn-neutral focus:btn-primary disabled:bg-emerald-300"
                : "w-full justify-self-center"
            }`}
            id="tab-label-2e"
            role="tab"
            aria-setsize="3"
            aria-posinset="3"
            tabIndex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
            aria-controls="tab-panel-2e"
            aria-selected={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
            onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
          >
            <span>Create Brand</span>
          </button>
        </li>
      </ul>
      <div
        className={` py-4 ${tabSelected.currentTab === 1 ? "" : "hidden"}`} //changed padding
        id="tab-panel-1e"
        aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
        role="tabpanel"
        aria-labelledby="tab-label-1e"
        tabIndex="-1"
      >
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
        />
      </div>
      <div
        className={`py-4 ${tabSelected.currentTab === 2 ? "" : "hidden"}`}
        id="tab-panel-2e"
        aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
        role="tabpanel"
        aria-labelledby="tab-label-2e"
        tabIndex="-1"
      >
        <Category />
      </div>
      <div
        className={`py-4 ${tabSelected.currentTab === 3 ? "" : "hidden"}`}
        id="tab-panel-2e"
        aria-hidden={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
        role="tabpanel"
        aria-labelledby="tab-label-2e"
        tabIndex="-1"
      >
        <Brand />
      </div>
    </div>
  );
};

export default TabList;
