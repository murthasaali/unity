import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uploadToCloudinary from '../utils/cloudinaryUpload';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line
import AdminSidemenu from '../components/adminSidemenu';
import Round from '../styleComponents/round';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = id;
        const response = await axios.get(`http://localhost:3001/admin/getaproduct/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const [selectedFile, setSelectedFile] = useState(null);
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
  };

  const handle = async (e) => {
    e.preventDefault();

    try {
      const imageLink = await uploadToCloudinary(selectedFile);
      console.log("cloudinary link", imageLink);

      const updatedFormData = {
        ...product,
        image: imageLink,
      };

      const response = await axios.put(`http://localhost:3001/admin/update/${id}`, updatedFormData);
      console.log('Product updated successfully', response.data);
      alert("Product added successfully");

      setProduct({
        image: '',
        category: '',
        name: '',
        price: '',
        description: '',
      });

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product:', error.message);
    }
  };

  return (
    <div className='bg-white justify-start items-start  flex p-1    flex-col w-full h-screen focus:outline-none '>
      <nav className='w-full h-20 rounded-full flex justify-evenly'>
        <h1 className='font-thin backdrop-blur-lg w-full text-center py-2 fixed rounded-full px-11' style={{
          background: 'linear-gradient(to right, #ff8c00, #ff2d55)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>Add products</h1>
      </nav>
      <div className='w-full flex flex-wrap  justify-center items-center mt-24' style={{ zIndex: 999 }}>
        <form className=" flex flex-col items-center justify-center gap-4 md:w-1/2 w-full rounded-lg " onSubmit={handle}>
          <input
            type="text"
            name="name"
            value={product.name}
            placeholder="Product Name"
            className='bg-transparent border-red-800 border-spacing-x-px-[2] w-1/2 h-11 rounded-lg p-2'
            onChange={handleInputChange}
          />
          <input
            type="url"
            name="image"
            value={product.image}
            placeholder="Product Name"
            className='bg-transparent border-red-800 text-xs border-spacing-x-px-[2] w-1/2 h-11 rounded-lg p-2'
            onChange={handleInputChange}
          />
          <div className='flex justify-between flex-row items-center w-1/2'>
            <input
              type="tel"
              name="price"
              value={product.price}
              placeholder="Price"
              className='bg-transparent border-red-800 border border-spacing-x-px-[2px] w-[100px] h-11 rounded-lg p-2'
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              value={product.category}
              placeholder="category"
              className='bg-transparent border-red-800 border w-[100px] h-11 rounded-lg p-2'
              onChange={handleInputChange}
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            className='bg-transparent border-red-800 border border-spacing-x-px-[2] w-1/2 h-28 rounded-lg p-2'
            onChange={handleInputChange}
          />
          <div className="flex items-center justify-center w-1/2">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-white border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <input id="dropzone-file" name="imageURL" type="file" className="hidden" onChange={handleFileInputChange} />
            </label>
          </div>
          <div className='w-1/2 flex justify-evenly'>
            <button
              type="submit"
              className="border bg-stone-300 text-black rounded-full py-2 px-4 hover:bg-stone-400">
              Add Product
            </button>
            <button
              className="border text-black bg-stone-300 rounded-full py-2 px-4 hover:bg-stone-400">
              reset
            </button>
            <AdminSidemenu />
            <Round />
          </div>
        </form>
        <div className='w-[200px] h-[200px] bg-blue-400 absolute right-28 bottom-10 blur-3xl' style={{ zIndex: 1 }}></div>
      </div>
    </div>
  );
};

export default EditProduct;
