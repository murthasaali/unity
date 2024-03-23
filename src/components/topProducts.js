import React, { useState, useEffect } from 'react';
import Chevron from './chevron';
import { FaHeart } from 'react-icons/fa6';
import ProductCard from './productCard';
import { addToCart, addToWishlist, fetchData } from '../utils/userServices';
function TopProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchData();
        const filtered=productsData.slice(0,4)
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    
    fetchProducts();
  }, []);
  return (
    <div className='p-2 w-full h-screen     flex flex-col justify-start items-center  z-30 rounded-t-3xl' style={{
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    }} >

      <Chevron />
      <h1 className=' text-center bg-stone-100 bg-opacity-60 font-thin sticky top-0   px-10 py-2 rounded-full'>
        top products
      </h1>
      {/* Render the fetched products */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-8 mt-5">
      {
        products.map((item, index) => (
          <ProductCard
            key={index}
            title={item.name}
            image={item.image}
            category={item.category}
            price={item.price}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            productId={item._id}
            isCart={true}
            icon={<FaHeart/>}
          />
        ))
      }
      </div>
      <div class="gcse-search"></div>

    </div>
  );
}

export default TopProducts;
