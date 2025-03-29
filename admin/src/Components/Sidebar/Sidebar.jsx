import React from 'react';
import { Link } from 'react-router-dom';
import add_product from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {
  return (
    <div className="flex flex-row md:flex-col items-center justify-center md:justify-start w-full md:w-[250px] h-auto md:h-screen bg-white shadow-md p-2 sm:p-4 gap-4">
      
      {/* Add Product */}
      <Link to={'/addproduct'} style={{textDecoration:"none"}} className="flex items-center gap-2 p-2 sm:p-3 hover:bg-gray-100 transition-all rounded-md">
        <img src={add_product} alt="Add Product" className="h-6 w-6" />
        <p className="text-gray-800 font-medium text-sm sm:text-base">Add Product</p>
      </Link>

      {/* Product List */}
      <Link to={'/listproduct'} style={{textDecoration:"none"}} className="flex items-center gap-2 p-2 sm:p-3 hover:bg-gray-100 transition-all rounded-md">
        <img src={list_product_icon} alt="Product List" className="h-6 w-6" />
        <p className="text-gray-800 font-medium text-sm sm:text-base">Product List</p>
      </Link>

    </div>
  );
}

export default Sidebar;
