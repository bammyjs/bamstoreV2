import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/features/product/productSlice";
import { useCreateProductMutation } from "../../redux/features/product/productsApi";

function CreateProduct() {
  const [createProduct, { isLoading, data, error }] =
    useCreateProductMutation();
  const [productDetails, setProductDetails] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    brand: "",
    price: "",
    description: "",
    image: "",
    regularPrice: "",
    color: "",
    // ... other product fields ...
  });
  console.log(productDetails);

  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, SetDescription] = useState("");
  const [image, setImage] = useState("");
  console.log(image);
  const [regularPrice, setRegularPrice] = useState("");
  const [color, setColor] = useState("");

  const handleProductImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setProductDetails({ ...productDetails, image: e.target.result });
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   createProduct(productDetails)
  //     .unwrap()
  //     .then((payload) => {
  //       console.log("Product created successfully", payload);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to create the product", error);
  //     });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await createProduct(productDetails).unwrap();
  //     console.log("Product created successfully", payload);
  //     // Handle success, e.g., showing a success message, clearing the form, etc.
  //   } catch (error) {
  //     console.error("Failed to create the product", error);
  //     // Handle error, e.g., showing an error message
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createProduct({
        name,
        sku,
        category,
        quantity,
        brand,
        regularPrice,
        color,
        description,
        price,
        image: image,
      })
    );
  };

  return (
    <div className=" w-full  flex flex-col  gap-6 my-2">
      <h3 className="text-xl text-dark text-center mb-4 md:text-3xl font-bold">
        Create New Product
      </h3>
      <div className="w-full  flex flex-col md:flex-row items-center justify-start gap-6 my-2">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full container   px-6  bg-light py-6 rounded-lg max-w-md gap-6 flex flex-col shadow-2xl "
        >
          <input
            max={4}
            multiple
            type="file"
            name=""
            id="imgUpload"
            accept="image/*"
            onChange={handleProductImageUpload}
            required
            // className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setProductDetails({ ...productDetails, name: e.target.value })
            }
            value={productDetails.name}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <input
            type="text"
            placeholder="sku"
            onChange={(e) =>
              setProductDetails({ ...productDetails, sku: e.target.value })
            }
            value={productDetails.sku}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <input
            type="text"
            placeholder="Category"
            onChange={(e) =>
              setProductDetails({ ...productDetails, category: e.target.value })
            }
            value={productDetails.category}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <input
            type="text"
            placeholder="Quantity"
            onChange={(e) =>
              setProductDetails({ ...productDetails, quantity: e.target.value })
            }
            value={productDetails.quantity}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <select
            name=""
            id=""
            required
            onChange={(e) =>
              setProductDetails({ ...productDetails, brand: e.target.value })
            }
            className="border py-3 text-dark"
          >
            <option value="">Select Brand</option>
            <option value="apple">Apple</option>
            <option value="orico">Orico</option>
            <option value="playstation">PlayStation</option>
            <option value="samsung">Samsung</option>
          </select>

          <input
            type="text"
            placeholder="Color"
            onChange={(e) =>
              setProductDetails({ ...productDetails, color: e.target.value })
            }
            value={productDetails.color}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <input
            type="number"
            placeholder="RegularPrice"
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                regularPrice: e.target.value,
              })
            }
            value={productDetails.regularPrice}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) =>
              setProductDetails({ ...productDetails, price: e.target.value })
            }
            value={productDetails.price}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                description: e.target.value,
              })
            }
            value={productDetails.description}
            required
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            Create Product
            {/* {createStatus === "pending" ? "Submitting" : "Submit"} */}
          </button>
          {error && <p>Error: {error.message}</p>}
        </form>
        <div className=" bg-black ">
          {productDetails.image ? (
            <>
              <img
                src={productDetails.image}
                alt="error!"
                className="w-full h-auto"
              />
            </>
          ) : (
            <p className="text-center">
              Product image uploaded preview will appear here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
