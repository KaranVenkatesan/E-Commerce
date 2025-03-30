import React, { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {

    const [image,setImage] = useState(false)
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category : "women",
        new_price:"",
        old_price:"",
    })

    const imageHandler = (e)=>{
                setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

 const Add_Product = async ()=>{
    console.log(productDetails);
    let responseData
    let product = productDetails

    let formData = new FormData()
    formData.append('product',image)

    // using try catch method  

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        });
        responseData = await response.json(); 

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);

                await fetch(`${process.env.REACT_APP_BACKEND_URL}/addproduct`,{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(product),
                }).then((resp)=>resp.json()).then((data)=>{
                    data.success?alert("Product Added"):alert("Failed")
                })
                
            }
    } catch (error) {
        console.log("Error");
        
    }

 }
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            {/* Product Title */}
            <div className="mb-4">
                <p className="font-semibold">Product Title</p>
                <input  
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text" 
                    name="name" 
                    placeholder="Type here..." 
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Price & Offer Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="font-semibold">Price</p>
                    <input 
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text" 
                        name="old_price" 
                        placeholder="Type here..." 
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <p className="font-semibold">Offer Price</p>
                    <input 
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text" 
                        name="new_price" 
                        placeholder="Type here..." 
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Product Category */}
            <div className="mb-4">
                <p className="font-semibold">Product Category</p>
                <select 
                value={productDetails.category}
                onChange={changeHandler}
                    name="category" 
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            {/* File Upload */}
            <div className="mb-4 flex flex-col items-center justify-center border border-dashed rounded-md p-4 cursor-pointer">
                <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
                    <img src={image?URL.createObjectURL(image):upload_area} alt="Upload" className="w-20 h-20 mb-2" />
                    <span className="text-gray-500">Click to Upload</span>
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>

            {/* Submit Button */}
            <button onClick={Add_Product} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
