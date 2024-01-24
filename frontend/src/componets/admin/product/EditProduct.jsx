import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import Loader from "../../loader/Loader";
import ProductForm from "./ProductForm";
import {
  getProduct,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../../redux/features/product/productSlice";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categorySlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [description, setDescription] = useState("");
  const { categories, brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  const [filteredBrands, setFilteredBrands] = useState([]);
  function filterBrands(selectedCategoryName) {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategoryName
    );
    setFilteredBrands(newBrands);
  }
  useEffect(() => {
    filterBrands(product?.category);
    // console.log(filteredBrands);
  }, [product?.category]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    if (productEdit && productEdit.image) {
      setFiles(productEdit.image);
    }

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.info("Please add an image");
    }

    const formData = {
      name: product?.name,
      category: product?.category,
      brand: product?.brand,
      color: product?.color,
      quantity: Number(product?.quantity),
      regularPrice: product?.regularPrice,
      price: product?.price,
      description: description,
      image: files,
    };

    console.log(formData);

    await dispatch(updateProduct({ id, formData }));
    // await dispatch(getProducts());
    navigate("/admin/all-products");
  };

  return (
    <div className="item-center flex flex-col justify-center">
      <h3 className="text-xl text-dark text-center mb-4 md:text-3xl font-bold">
        Edit products<span className="text-red-700">{}</span>
      </h3>
      {isLoading && (
        <div className="flex  justify-center ">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
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
        isEditing={true}
      />
    </div>
  );
};

export default EditProduct;
