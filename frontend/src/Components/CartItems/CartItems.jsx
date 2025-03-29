import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

    // Calculate subtotal
    const subtotal = all_product.reduce((acc, e) => {
        return acc + (cartItems[e.id] > 0 ? e.new_price * cartItems[e.id] : 0);
    }, 0);

    return (
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-10">
            {/* Header Row - Shown on medium and larger screens */}
            <div className="hidden md:grid grid-cols-6 items-center gap-6 py-5 text-[#454545] text-lg font-semibold border-b border-gray-300">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>

            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div
                            key={e.id}
                            className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 py-5 text-[#454545] text-base md:text-lg border-b border-gray-300"
                        >
                            {/* Product Image */}
                            <div className="flex justify-center md:justify-start">
                                <img className="w-20 h-20 object-contain" src={e.image} alt={e.name} />
                            </div>

                            {/* Product Name */}
                            <p className="text-center md:text-left font-semibold">{e.name}</p>

                            {/* Price */}
                            <p className="text-center md:text-left font-medium">${e.new_price}</p>

                            {/* Quantity Buttons */}
                            <div className="flex justify-center md:justify-start items-center border border-gray-400 rounded-md w-28">
                                <button className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300">-</button>
                                <span className="px-4">{cartItems[e.id]}</span>
                                <button className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300">+</button>
                            </div>

                            {/* Total Price */}
                            <p className="text-center md:text-left font-semibold">${(e.new_price * cartItems[e.id]).toFixed(2)}</p>

                            {/* Remove Button */}
                            <div className="flex justify-center">
                                <button onClick={() => removeFromCart(e.id)}>
                                    <img className="w-6 cursor-pointer hover:scale-110 transition-transform" src={remove_icon} alt="Remove" />
                                </button>
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            {/* Cart Totals & Promo Code Section */}
            <div className="mt-10 flex flex-col lg:flex-row justify-between gap-8">
                {/* Cart Totals */}
                <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold border-b pb-3 mb-4">Cart Totals</h1>
                    
                    <div className="flex justify-between py-2 border-b">
                        <p className="text-lg">Subtotal</p>
                        <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between py-2 border-b">
                        <p className="text-lg">Shipping Fee</p>
                        <p className="text-lg font-semibold">Free</p>
                    </div>

                    <div className="flex justify-between py-2">
                        <h3 className="text-xl font-bold">Total</h3>
                        <h3 className="text-xl font-bold">${subtotal.toFixed(2)}</h3>
                    </div>

                    <button className="w-full mt-4 bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition">
                        PROCEED TO CHECKOUT
                    </button>
                </div>

                {/* Promo Code Section */}
                <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="text-lg font-semibold mb-4">If you have a promo code, enter it here:</p>

                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Promo code"
                            className="w-full p-3 border border-gray-400 rounded-l-lg outline-none"
                        />
                        <button className="bg-black text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-800 transition">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
