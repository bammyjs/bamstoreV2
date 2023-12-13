import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/features/productSlice";

function CreateProduct() {
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
  const [regularPrice, setRegularPrice] = useState("");
  const [color, setColor] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };
  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

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
    <main className=" w-full px-6 flex flex-col items-center justify-center gap-6 my-32  md:my-60">
      <h3 className="text-3xl text-dark text-center md:text-5xl font-bold">
        Create product
      </h3>
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full container   px-6  bg-light py-6 rounded-lg max-w-md gap-6 flex flex-col shadow-2xl "
      >
        <input
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
          onChange={(e) => setName(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="text"
          placeholder="sku"
          onChange={(e) => setSku(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="text"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="text"
          placeholder="Brand"
          onChange={(e) => setBrand(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="text"
          placeholder="Color"
          onChange={(e) => setColor(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="number"
          placeholder="RegularPrice"
          onChange={(e) => setRegularPrice(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => SetDescription(e.target.value)}
          required
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <button
          onSubmit={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </button>
        <div className="">
          {image ? (
            <>
              <img src={image} alt="error!" />
            </>
          ) : (
            <p>Product image uploaded preview will appear here!</p>
          )}
        </div>
      </form>
    </main>
  );
}

export default CreateProduct;
