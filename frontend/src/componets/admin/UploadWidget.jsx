import React, { useState } from "react";
// import Card from "../../card/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const UploadWidget = ({ files, setFiles }) => {
  // File upload start
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const addImages = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages((previousImages) => previousImages.concat(selectedFilesArray));
    // console.log(images);
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const removeImage = (image) => {
    const imageIndex = selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img) => img !== image));

    setImages(images.filter((img, index) => index !== imageIndex));
    URL.revokeObjectURL(image);
  };
  // File upload end

  const url = "https://api.cloudinary.com/v1_1/bamtech1/image/upload";

  const uploadImages = async () => {
    setUploading(true);
    console.log(images);
    let imageUrls = [];
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("file", file);
      formData.append("upload_preset", "bamstore");
      formData.append("folder", "bamstore");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          imageUrls.push(data.secure_url);
          setProgress(imageUrls.length);

          if (imageUrls.length === images.length) {
            setFiles((prevFiles) => prevFiles.concat(imageUrls));
            setUploading(false);
            console.log(files);
            toast.success("Image upload complete");
            setImages([]);
            setSelectedImages([]);
            setProgress(0);
          }
        })
        .catch((error) => {
          setUploading(false);
          toast.error(error.message);
          console.log(error);
        });
    }
  };

  return (
    <div className="">
      <label className="my-0 mx-auto px-10 flex flex-col justify-center items-center border-2 border-dashed w-full cursor-pointer h-40">
        <IoCloudUploadOutline size={35} />
        <br />

        <span className="text-sm pt-2">Click to upload Up to 4 images</span>
        <input
          className="hidden"
          type="file"
          name="images"
          onChange={addImages}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />
      {selectedImages.length > 0 &&
        (selectedImages.length > 5 ? (
          <p className="error">
            You can't upload more than 4 images! <br />
            <span>
              please remove <b> {selectedImages.length - 4} </b> of them.
            </span>
          </p>
        ) : (
          <>
            <div className="flex justify-center">
              <button
                className="btn btn-secondary"
                disabled={uploading}
                onClick={() => {
                  uploadImages();
                }}
              >
                {uploading
                  ? `Uploading... ${progress} of ${selectedImages.length}`
                  : `Upload ${selectedImages.length} Image${
                      selectedImages.length === 1 ? "" : "s"
                    }`}
              </button>
            </div>
          </>
        ))}

      <div
        className={
          selectedImages.length > 0
            ? "w-full max-w-3xl my-4 mx-auto flex  justify-center items-center overflow-x-hidden flex-wrap touch-auto border border-dark transition-all rounded-xl"
            : ""
        }
      >
        {selectedImages.length !== 0 &&
          selectedImages.map((image, index) => {
            return (
              <div
                key={image}
                className="card card-compact  m-1 bg-base-100 shadow-xl overflow-x-clip transform scale-95 hover:scale-100"
              >
                <figure className="w-36 h-36">
                  <img
                    className=" w-full h-auto aspect-square  object-contain"
                    src={image}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <IoTrashOutline
                      style={{ fontSize: "20px", color: "red" }}
                      onClick={() => removeImage(image)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* <div
                  key={image}
                  className="border rounded-md overflow-hidden bg-slate-700 mt-4"
                >
                  <img src={image} width="200" alt="productImage" />
                  <button
                    className="btn btn-secondary"
                    onClick={() => removeImage(image)}
                  >
                    <BsTrash size={25} />
                  </button>
                  <p>{index + 1}</p>
                </div> */}
    </div>
  );
};

export default UploadWidget;
