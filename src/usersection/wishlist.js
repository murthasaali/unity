import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ProductCard from '../components/productCard';
import { MdClose } from 'react-icons/md';
import { addToCart, addToWishlist } from '../utils/userServices';
import Navbar from '../components/navbar';
function UserWishlist() {
    const [product , setProduct]=useState([])
    const GetCartProduct = async () => {
        try {
            const userId = localStorage.getItem("userId");
            console.log(userId)
            const token = localStorage.getItem("token");
    
            if (!userId || !token) {
                console.log("User ID or token is missing from localStorage.");
                return;
            }
    
            const response = await axios.get(`https://ecommerce-api-shne.onrender.com/wishlist/getwishlist?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("response", response.data[0].productId);
            setProduct(response.data)
        } catch (error) {
            console.log("error",error);
        }
    };
    
    useEffect(() => {
      GetCartProduct()
    
    
    }, [])
    
  return (
    <div className='w-full flex justify-center items-center h-screen '
    style={{
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    }}>
      <Navbar/>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-8 mt-5">
        {
        product.map((item, index) => (
          <ProductCard
            key={item.productId._id}
            title={item.productId.name}
            image={item.productId.image}
            category={item.productId.category}
            price={item.productId.price}
            productId={item.productId._id}
            isCart={true}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            icon={<MdClose className='   hover:text-blue-500  hover:rotate-90 transition-all duration-300 ease-in-out rounded-full'/>}
          />
        ))
      }
            </div>

    </div>
  )
}

export default UserWishlist