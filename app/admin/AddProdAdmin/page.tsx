"use client"
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/page";
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProd = () => {
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: "",
    Quantity: "",
    Color: "",
    Size: "",
    Availability: "In stock",
    Discount: "",
    ProductImage: [],
  });
  const notify = () => toast.success('Your Product has been added successful !', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const [previewImage, setPreviewImage] = useState<string>("");

  const addProd = () => {
    axios.post("http://localhost:3000/api/products/addProd", product)
      .then((res) => {
        notify()
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'pa4ezjqw');

      axios.post("http://api.cloudinary.com/v1_1/dfsyqvvim/image/upload", formData)
        .then((res) => {
          console.log('secure', res.data.secure_url);
          setProduct({
            ...product,
            ProductImage: [res.data.secure_url],
          });
          setPreviewImage(res.data.secure_url);
        })
        .catch((err) => {
          console.log(formData);
          console.log(err);
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4 ml-[500px] grid grid-col-2">
        <Typography variant="h2" fontWeight="bold" style={{ color: '#000080' }}>
          Add A New Product !
        </Typography>
      </div>
      <ToastContainer/>
      <div className="flex-1 border rounded w-[600px] ml-[500px] h-[600px] p-4 "style={{ backgroundColor: '#F0F0F0' }}>
        <div className="mb-4 rounded border">
          <input
            type="text"
            placeholder="Product Name"
            name="Name"
            value={product.Name}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 rounded border">
          <input
            type="text"
            placeholder="Description"
            name="Description"
            value={product.Description}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 rounded border">
          <input
            type="number"
            placeholder="Price"
            name="Price"
            value={product.Price}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 rounded border">
          <input
            type="number"
            placeholder="Quantity"
            name="Quantity"
            value={product.Quantity}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 rounded border">
          <input
            type="text"
            placeholder="Color"
            name="Color"
            value={product.Color}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 rounded border">
          <input
            type="text"
            placeholder="Size"
            name="Size"
            value={product.Size}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 rounded border">
          <input
            type="number"
            placeholder="Discount"
            name="Discount"
            value={product.Discount}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 ">
          <input
            type="file"
            onChange={addPicture}
            className="border p-2"
          />
        </div>
        <button
          onClick={addProd}
          className="bg-black text-white p-2 rounded"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProd;
