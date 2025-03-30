import React, { useEffect, useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    // Fetch data from the API
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/allproducts`);
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    },[]);

    const remove_product = async (id) => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/removeproduct`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})

        })
        await fetchInfo()
        
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* List Products */}
            <h1 className="text-2xl font-bold text-center mb-6">All Products List</h1>

            {/* Table Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 font-semibold text-gray-700 border-b pb-2">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>

            {/* Product List */}
            <div className="divide-y mt-4">
                {allproducts.length === 0 ? (
                    <p className="text-center text-gray-500">No products available</p>
                ) : (
                    allproducts.map((product, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center py-2">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                            <p className="truncate">{product.name}</p>
                            <p className="text-red-500">${product.old_price}</p>
                            <p className="text-green-500 font-semibold">${product.new_price}</p>
                            <p>{product.category}</p>
                            <button>
                                <img onClick={()=>remove_product(product.id)} src={cross_icon} alt="Remove" className="w-6 h-6 cursor-pointer hover:opacity-75" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListProduct;
