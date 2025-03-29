import React, { useContext } from 'react';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);
    
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-4 sm:p-6 lg:p-16">
            {/* Left Section - Images */}
            <div className="flex flex-col sm:flex-row lg:flex-row gap-4">
                <div className="flex sm:flex-col gap-2">
                    {/* Thumbnail Images */}
                    <img className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-cover cursor-pointer hover:opacity-80 transition-all" src={product.image} alt="" />
                    <img className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-cover cursor-pointer hover:opacity-80 transition-all" src={product.image} alt="" />
                    <img className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-cover cursor-pointer hover:opacity-80 transition-all" src={product.image} alt="" />
                    <img className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-cover cursor-pointer hover:opacity-80 transition-all" src={product.image} alt="" />
                </div>
                <div>
                    {/* Main Product Image */}
                    <img className="w-full sm:w-[350px] md:w-[400px] lg:w-[500px] h-auto object-cover rounded-md shadow-lg" src={product.image} alt={product.name} />
                </div>
            </div>

            {/* Right Section - Product Details */}
            <div className="flex flex-col gap-4 max-w-md sm:max-w-lg">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{product.name}</h1>

                {/* Ratings */}
                <div className="flex items-center gap-1 text-sm sm:text-lg">
                    <img src={star_icon} alt="star" className="w-5 sm:w-6" />
                    <img src={star_icon} alt="star" className="w-5 sm:w-6" />
                    <img src={star_icon} alt="star" className="w-5 sm:w-6" />
                    <img src={star_icon} alt="star" className="w-5 sm:w-6" />
                    <img src={star_dull_icon} alt="star" className="w-5 sm:w-6" />
                    <p className="text-gray-600">(133 Reviews)</p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-4 text-lg sm:text-xl font-bold">
                    <span className="text-gray-500 line-through">${product.old_price}</span>
                    <span className="text-red-500">${product.new_price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base">
                    A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
                </p>

                {/* Size Selection */}
                <div>
                    <h2 className="mt-4 text-base sm:text-lg font-semibold text-gray-700">Select Size</h2>
                    <div className="flex gap-2 mt-2">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <div key={size}
                                className="px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-md text-gray-800 cursor-pointer hover:bg-red-500 hover:text-white transition-all">
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button onClick={() => { addToCart(product.id) }} className="mt-4 sm:mt-6 w-full sm:w-52 px-5 sm:px-6 py-2 sm:py-3 bg-red-500 text-white text-base sm:text-lg font-semibold rounded-md shadow-md hover:bg-red-600 transition-all">
                    ADD TO CART
                </button>

                {/* Category and Tags */}
                <p className="text-gray-700 text-sm sm:text-base">
                    <span className="font-bold">Category:</span> Women, T-Shirt, Crop Top
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                    <span className="font-bold">Tags:</span> Modern, Latest
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
