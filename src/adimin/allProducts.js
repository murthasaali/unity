import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import AdminSidemenu from '../components/adminSidemenu';
import {useNavigate} from 'react-router-dom'
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const nav=useNavigate()
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/get');
      const productsWithImageData =await response.data;
      console.log('Products:', productsWithImageData);
      setProducts(productsWithImageData);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  

  const select = (event) => {
    setSelectedCategory(event.target.value);
    // Add logic to filter products based on the selected category if needed
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/admin/removeproduct/${productId}`);
      console.log(response.data);
      // Assuming the server sends a message upon successful deletion
      // You may want to update the products state or take other actions based on the response
      fetchData(); // Call the fetchData function to re-fetch data after deletion
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };
  

  return (
      <div className="w-full h-auto bg-white  flex items-center flex-col px-5">
        <AdminSidemenu/>
        <h1 className='font-thin backdrop-blur-lg w-full text-center py-2 fixed rounded-full px-11' style={
            { background: 'linear-gradient(to right, #ff8c00, #ff2d55)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',}
        }>All products</h1>

        
    <table className="min-w-full rounded-lg   p-10 mt-20">
        <thead className=' text-black   rounded-lg '>
            <tr className='rounded-lg  backdrop-blur-xl'>
               
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Product Image
                </th>
                <th className="mr-4 b  text-xs       tracking-wider">


                    <select


                        value={selectedCategory}
                        className="block w-full bg-cyan-800   border  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        // Set "all" as the default option
                        // Add an event handler to handle the selection change
                        onChange={select}
                    >
                        <option value="all">all</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>

                    </select>
                </th>



                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    qty
                </th>
            </tr>
        </thead>
            {
              products.map((product) => (
                  <tbody key={product._id} className=" bg-stone-300  divide-y rounded-full p-2 mt-2 divide-gray-200">
                    <tr  className='rounded-lg mt-2'>
                
                        <td className="px-6 py-4 whitespace-nowrap text-cyan-600">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-16 w-16 rounded-md"
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                        <td className="px-6 py-4 wrap">{product.description}...</td>
                        <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap  text-cyan-800"   ><MdDeleteOutline onClick={()=>handleDelete(product._id)}/></td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-800" ><MdEdit onClick={()=>nav(`/admin/edit/${product._id}`)}/></td>
                        
                    </tr>
        </tbody>

                ))}
    </table>
</div>
  )
}

export default AllProducts