import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setcartItems] = useState(getDefaultCart());
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://shopper-backend-f50i.onrender.com";

    useEffect(() => {
        fetch(`${BACKEND_URL}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));

        if (localStorage.getItem('auth-token')) {
            fetch(`${BACKEND_URL}/getcart`, {
                method: 'POST','GET'
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data && typeof data === "object") setcartItems(data);
            })
            .catch((error) => console.error("Error fetching cart data:", error));
        }
    }, []);

    const addToCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        if (localStorage.getItem("auth-token")) {
            fetch(`${BACKEND_URL}/addtocart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .catch((error) => console.error("Error adding to cart:", error));
        }
    };

    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));

        if (localStorage.getItem("auth-token")) {
            fetch(`${BACKEND_URL}/removefromcart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .catch((error) => console.error("Error removing from cart:", error));
        }
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    };

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
