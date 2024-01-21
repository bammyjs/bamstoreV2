import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";

const ProductForm = ({
  files,
  setFiles,
  product,
  productImage,
  imagePreview,
  setImagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  categories,
  filteredBrands,
  isEditing,
}) => {
  const img =
    "https://res.cloudinary.com/bamtech1/image/upload/v1674999036/nhq5gqr1xecrkipneiup.jpg";

  const removeImage = (image) => {
    console.log(image);
    setFiles(files.filter((img, index) => img !== image));
  };

  return (
    <div className="my-20">
      <UploadWidget files={files} setFiles={setFiles} />

      <div className="w-full container   px-6  bg-light py-6 rounded-lg  gap-6 flex flex-col shadow-2xl">
        <br />
        <form onSubmit={saveProduct} className="flex flex-col items-center">
          <label className="block text-2xl text-dark font-medium">
            Product Images:
          </label>
          <div className="max-w-5xl flex items-center justify-center my-o mx-auto">
            <aside className="w-full my-0 mx-auto flex start justify-start items-center overflow-x-auto flex-nowrap touch-auto border border-dark transition-all bg-pry-color">
              {files.length > 0 &&
                files.map((image) => (
                  <div
                    key={image}
                    className="flex-initial object-cover m-1 overflow-hidden transform scale-95 hover:scale-100"
                  >
                    <img src={image} alt="productImage" height={100} />
                    <div>
                      <BsTrash
                        size={15}
                        className="cursor-pointer text-red-900"
                        onClick={() => removeImage(image)}
                      />
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="--m">No image set for this poduct.</p>
              )}
            </aside>
          </div>
          <br />
          <hr />
          <div className="flex-wrap flex gap-2 my-2 text-base text-dark">
            <label>Product Name:</label>
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Product name"
              name="name"
              value={product?.name}
              onChange={handleInputChange}
            />

            <label>Product Category:</label>
            {/* <select
              className="border py-3 text-gray rounded-md px-4 w-full"
              name="category"
              value={product?.category}
              onChange={handleInputChange}
            >
              {isEditing ? (
                <option>{product?.category}</option>
              ) : (
                <option>Select Category</option>
              )}
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._name}>
                    {cat.name}
                  </option>
                ))}
            </select> */}

            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Product Category"
              name="category"
              value={product?.category}
              onChange={handleInputChange}
            />

            <label>Product Brand:</label>
            {/* <select
              name="brand"
              value={product?.brand}
              className="border py-3 text-gray rounded-md px-4 w-full"
              onChange={handleInputChange}
            >
              {isEditing ? (
                <option>{product?.brand}</option>
              ) : (
                <option>Select Brand</option>
              )}

              {filteredBrands.length > 0 &&
                filteredBrands.map((brand) => (
                  <option key={brand._id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
            </select> */}
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Brand"
              name="brand"
              value={product?.brand}
              onChange={handleInputChange}
            />
            <label>Product Color:</label>
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Color"
              name="color"
              value={product?.color}
              onChange={handleInputChange}
            />

            <label>Regular Price:</label>
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Regular Price"
              name="regularPrice"
              value={product?.regularPrice}
              onChange={handleInputChange}
            />
            <label>Product Price:</label>
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Product Price"
              name="price"
              value={product?.price}
              onChange={handleInputChange}
            />

            <label>Product Quantity:</label>
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Product Quantity"
              name="quantity"
              value={product?.quantity}
              onChange={handleInputChange}
            />
          </div>
          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="my-4">
            <button type="submit" className="btn btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
