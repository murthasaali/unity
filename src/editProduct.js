import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import uploadToCloudinary from '../utils/cloudinaryUpload';
import { useParams  } from 'react-router-dom';

const AddProduct = () => {
    const [item,setItem]=useState([])
    const {id}=useParams ()
  const [formData, setFormData] = useState({
    imageURL: '',
    category: '',
    name: '',
    price: '',
    description: '',
  });
  useEffect(() => {
    const getaProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/getaproduct/${id}`);
        setItem(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    getaProduct();
  }, [id]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
  };
  
  const handle = async (e) => {
    e.preventDefault();
    const name=formData.name
    const catogery=formData.catogery
    const price=formData.price
    const description=formData.description
    console.log(formData)
   
  
  
    try {
      const image = await uploadToCloudinary(selectedFile);
      console.log("Cloudinary link:", image);
  
  
     
     

      
  
      const response = await Axios.put(`http://localhost:3001/admin/update/${id}`,{name,catogery,price,description,image},
      );
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  console.log(item,imageUrl)
  

  return (
    <div className='bg-black justify-start items-start  flex p-1    flex-col w-full h-screen focus:outline-none ' style={{ zIndex: 999 }}>
        <nav className='w-full h-20 rounded-full flex justify-evenly'>
        <h1 className='font-thin' style={
            { background: 'linear-gradient(to right, #ff8c00, #ff2d55)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',}
        }>add products</h1>

        </nav>
        <div className='w-full flex flex-wrap '  style={{ zIndex: 999 }}>

      <form 
 encType="multipart/form-data"      className=" flex flex-col items-center justify-center gap-4 w-full rounded-lg text-white" onSubmit={handle}>
      <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            className='bg-transparent border-red-800 border-spacing-x-px-[2] w-1/2 h-11 rounded-lg p-2'
            onChange={handleInputChange} // Attach handleInputChange to onChange
          />

          <div className='flex justify-between flex-row items-center w-1/2 text-white'>
            <input
              type="tel"
              name="price"
              placeholder="Price"
              value={formData.price}
              className='bg-transparent border-red-800 border border-spacing-x-px-[2px] w-[100px] h-11 rounded-lg p-2'
              onChange={handleInputChange} // Attach handleInputChange to onChange
            />
            <input
              type="text"
              name="catogery"
              value={formData.catogery}
              placeholder="catogery"
              className='bg-transparent border-red-800 border w-[100px] h-11 rounded-lg p-2'
              onChange={handleInputChange} // Attach handleInputChange to onChange
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            className='bg-transparent border-red-800 border border-spacing-x-px-[2] w-1/2 h-28 rounded-lg p-2'
            onChange={handleInputChange} // Attach handleInputChange to onChange
          />


<div className="flex items-center justify-center w-1/2">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-white border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              {/* ... Other label content ... */}
              <input id="dropzone-file" name="imageURL" type="file" className="hidden" onChange={handleFileInputChange} />
            </label>
          </div>
      <div className='w-1/2 flex justify-evenly'>

          <button
            type="submit"
            className="border bg-stone-300 text-black rounded-full py-2 px-4 hover:bg-stone-400"
          >

            Add Product
          </button>
          <button
            
            className="border text-black bg-stone-300 rounded-full py-2 px-4 hover:bg-stone-400"
          >

            reset
          </button>
      </div>
      </form>
      <div className='w-[100px] h-[100px] bg-blue-400 absolute right-28 bottom-96 blur-3xl' style={{ zIndex: 1 }}>
</div>
      <div className='w-[100px] h-[100px] bg-red-200 absolute left-0 top-4 blur-3xl' style={{ zIndex: 1 }}>
</div>
    
      </div>

    </div>
  );
};

export default AddProduct;
