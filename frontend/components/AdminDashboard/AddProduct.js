"use client";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";


export default function AddProduct({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const token = getCookie("auth_token");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    size: "",
    images: [],
    description: "",
    price: "",
    category: "",
    brand: "",
    stock_quantity: "",
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showEditModal = (product) => {
    setSelectProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        size: product.size,
        images: product.images || [],
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        stock_quantity: product.stock_quantity,
      });
    }
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      toast.error("No images selected!");
      return;
    }

    const validFiles = Array.from(files).filter(
      (file) =>
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
    );

    if (validFiles.length === 0) {
      toast.error("No valid images selected!");
      return;
    }

    setImageUploading(true);

    const uploadPromises = validFiles.map((file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ekdanta-murti");
      data.append("cloud_name", "gaurav-1920");

      return fetch("https://api.cloudinary.com/v1_1/gaurav-1920/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...prevFormData.images, res.url],
          }));
          return res.url;
        })

        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image!");
          return null;
        });
    });

    Promise.all(uploadPromises)
      .then((uploadedUrls) => {
        const successfulUploads = uploadedUrls.filter((url) => url !== null);
        console.log("Successfully uploaded URLs:", successfulUploads);
        setImageUploading(false);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        toast.error("Failed to upload images!");
        setImageUploading(false);
      });
  };

  const removeImage = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.price ||
        !formData.description ||
        !formData.brand ||
        !formData.category ||
        !formData.size ||
        !formData.stock_quantity ||
        formData.images.length === 0
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const data = {
        name: formData.name,
        size: formData.size,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        brand: formData.brand,
        stock_quantity: formData.stock_quantity,
        images: formData.images, // Sending all images as an array
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (response.status === 200 && responseData.status) {
        toast.success("Product Added Successfully");
        // Optionally, reset the form fields after successful upload
        setFormData({
          name: "",
          size: "",
          images: [],
          description: "",
          price: "",
          category: "",
          brand: "",
          stock_quantity: "",
        });
      } else {
        throw new Error(responseData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Failed to add product!");
    }
  };

  const productsArray = products ? products.data : [];

  const handleEdit = async (productId) => {
    console.log("Fetching product details...");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/get-product/${productId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const product = await response.json();
      console.log("Product details fetched successfully:", product);
      if (product.status && product.data) {
        showEditModal(product.data);
      } else {
        throw new Error("Product data is invalid or missing");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      console.log("Starting handleEditProduct function");
      const data = {
        name: formData.name,
        size: formData.size,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        brand: formData.brand,
        stock_quantity: formData.stock_quantity,
        images: formData.images,
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(
        `${apiUrl}/edit-product/${selectProduct._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      console.log("Response:", response);
      const responseData = await response.json();

      console.log("Response Data:", responseData);
      if (response.status === 200 && responseData.status) {
        console.log("Product Updated Successfully");
        toast.success("Product Updated Successfully");
        // Optionally, reset the form fields after successful update
        setFormData({
          name: "",
          size: "",
          images: [],
          description: "",
          price: "",
          category: "",
          brand: "",
          stock_quantity: "",
        });
        setEditModal(false);
      } else {
        console.log(
          "Failed to update product:",
          responseData.message || "Unknown Error"
        );
        throw new Error(responseData.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product!");
    }
  };

  const handleDelete = (productId) => {
    console.log("Selected product for deletion:", productId);
    setSelectProduct(productId);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const token = getCookie("auth_token");

      const response = await fetch(
        `${apiUrl}/remove-product/${selectProduct}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();

      if (responseData.status) {
        toast.success("Product deleted successfully")
        console.log("Product deleted successfully:", selectProduct);
        setDeleteModal(false);
        router.push("/admin")
      } else {
        throw new Error(responseData.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error("Failed to delete product!");
    }
  };

  const cancelDelete = () => {
    setSelectProduct(null);
    setDeleteModal(false);
  };

  return (
    <div className=" relative mx-auto my-[5vh]">
      <h1 className="text-[3.6vh] font-semibold text-center text-[#2a2a2a]">
        EkdantaMurti - Products
      </h1>

      <button
        onClick={openModal}
        className="text-[2.7vh] active:bg-blue-800 px-[2vh] py-[1vh] text-white font-medium absolute top-0 right-0 bg-blue-600"
      >
        Add Product
      </button>

      <div className="my-[5vh]">
        {productsArray.map((product) => (
          <div
            key={product._id}
            className="flex flex-row justify-between my-[2vh] items-center bg-white shadow-md p-[2vh]"
          >
            <img
              src={product.images[0]}
              alt=""
              className="w-[15vh] h-[15vh] object-cover"
            />
            <div className="w-[60%]">
              <h1 className="text-[3vh] font-semibold text-[#2a2a2a]">
                {product.name}
              </h1>
              <p className="text-[2.4vh] text-gray-700">
                {product.description}
              </p>
            </div>
            <div>
              <p className="text-[3vh] text-green-600 font-semibold">
                Rs. {product.price}
              </p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(product._id)}
                className="text-white active:bg-blue-800 mr-[1vh] rounded-md bg-blue-600 px-[2vh] py-[1vh] text-[2.5vh] font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-white active:bg-red-700 rounded-md bg-red-600 px-[2vh] py-[1vh] text-[2.5vh] font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding a product */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative w-[60vw] h-auto p-[2vh] rounded-lg">
            <h2 className="text-[3.5vh] text-amber-950 text-center font-semibold mb-[2vh]">
              Add Product
            </h2>
            <h1
              onClick={closeModal}
              className="absolute right-[2vh] top-[2.5vh] text-red-600 cursor-pointer"
            >
              <CloseIcon className="text-[5vh]" />
            </h1>

            <form onSubmit={handleSubmit}>
              <div>
                <div className="relative">
                  <label
                    htmlFor="images"
                    className="cursor-pointer active:bg-blue-700 bg-blue-600 text-white py-[1vh] px-[2vh] rounded-md inline-block"
                  >
                    Select Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    multiple
                    onChange={handleImageChange}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                </div>

                <div className=" flex flex-row gap-[1vh] my-[2vh] ">
                  {formData.images.map((imageUrl, index) => (
                    <div key={index} className="relative inline-block mr-[1vh]">
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-[20vh] h-[20vh] object-cover mt-[1vh] overflow-x-scroll"
                      />
                      <CloseIcon
                        className="absolute bg-red-600 rounded-md text-white -top-[0.5vh] -right-[0.5vh] cursor-pointer"
                        onClick={() => removeImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-[1vh]">
                  <TextField
                    id="outline-basic"
                    name="name"
                    label="Enter Product Name"
                    variant="outlined"
                    className="w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="price"
                    label="Enter Product Price"
                    variant="outlined"
                    className="w-full"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <TextField
                  id="outline-basic"
                  name="description"
                  label="Enter Product Description"
                  variant="outlined"
                  className="w-full mt-[2vh]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outline-basic"
                    name="brand"
                    label="Enter Product Brand"
                    variant="outlined"
                    className="w-full"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="category"
                    label="Enter Product Category"
                    variant="outlined"
                    className="w-full"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outline-basic"
                    name="size"
                    label="Enter Product Size"
                    variant="outlined"
                    className="w-full"
                    value={formData.size}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="stock_quantity"
                    label="Enter Product Quantity"
                    variant="outlined"
                    className="w-full"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-center rounded-md text-[3vh] text-white px-[2vh] py-[1vh] bg-green-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for edit product */}
      {editModal && selectProduct && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative w-[60vw] h-auto p-[2vh] rounded-lg">
            <h2 className="text-[3.5vh] text-amber-950 text-center font-semibold mb-[2vh]">
              Edit Product
            </h2>
            <h1
              onClick={closeEditModal}
              className="absolute right-[2vh] top-[2.5vh] text-red-600 cursor-pointer"
            >
              <CloseIcon className="text-[5vh]" />
            </h1>

            <form onSubmit={handleEditProduct}>
              <div>
                <div className="relative">
                  <label
                    htmlFor="images"
                    className="cursor-pointer active:bg-blue-700 bg-blue-600 text-white py-[1vh] px-[2vh] rounded-md inline-block"
                  >
                    Select Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    multiple
                    onChange={handleImageChange}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                </div>

                <div className=" flex flex-row gap-[1vh] my-[2vh] ">
                  {formData.images.map((imageUrl, index) => (
                    <div key={index} className="relative inline-block mr-[1vh]">
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-[20vh] h-[20vh] object-cover mt-[1vh] overflow-x-scroll"
                      />
                      <CloseIcon
                        className="absolute bg-red-600 rounded-md text-white -top-[0.5vh] -right-[0.5vh] cursor-pointer"
                        onClick={() => removeImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* print data here */}

              <div>
                <div className="flex flex-row gap-[1vh]">
                  <TextField
                    id="outline-basic"
                    name="name"
                    label="Enter Product Name"
                    variant="outlined"
                    className="w-full"
                    value={formData.name || selectProduct.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="price"
                    label="Enter Product Price"
                    variant="outlined"
                    className="w-full"
                    value={formData.price || selectProduct.price}
                    onChange={(e) => handleEditChange("price", e.target.value)}
                    required
                  />
                </div>

                <TextField
                  id="outline-basic"
                  name="description"
                  label="Enter Product Description"
                  variant="outlined"
                  className="w-full mt-[2vh]"
                  value={formData.description || selectProduct.description}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                  required
                />

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outline-basic"
                    name="brand"
                    label="Enter Product Brand"
                    variant="outlined"
                    className="w-full"
                    value={formData.brand || selectProduct.brand}
                    onChange={(e) => handleEditChange("brand", e.target.value)}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="category"
                    label="Enter Product Category"
                    variant="outlined"
                    className="w-full"
                    value={formData.category || selectProduct.category}
                    onChange={(e) =>
                      handleEditChange("category", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outline-basic"
                    name="size"
                    label="Enter Product Size"
                    variant="outlined"
                    className="w-full"
                    value={formData.size || selectProduct.size}
                    onChange={(e) => handleEditChange("size", e.target.value)}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="stock_quantity"
                    label="Enter Product Quantity"
                    variant="outlined"
                    className="w-full"
                    value={
                      formData.stock_quantity || selectProduct.stock_quantity
                    }
                    onChange={(e) =>
                      handleEditChange("stock_quantity", e.target.value)
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-center rounded-md text-[3vh] text-white px-[2vh] py-[1vh] bg-green-600"
                >
                  Edit Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Confirmation of deleting product */}
      {deleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative w-[40vw] h-auto p-[2vh] rounded-lg px-[4vh] pb-[5vh]">
            <h2 className="text-[3.5vh] font-semibold my-[2.4vh]">
              Are you sure you want to delete this product?
            </h2>
            <button
              className="text-[2.7vh] rounded-lg text-white p-[1vh] px-[2vh] bg-red-500 active:bg-red-600"
              onClick={confirmDelete}
            >
              Yes
            </button>
            <button
              className="text-[2.7vh] rounded-lg ml-[1vh] text-white p-[1vh] px-[2vh] bg-amber-500 active:bg-amber-700"
              onClick={cancelDelete}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}