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
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://shopper-backend-f50i.onrender.com";

    useEffect(() => {
        // Fetch all products
        fetch(`${BACKEND_URL}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));

        // Fetch cart items if user is authenticated
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
            fetch(`${BACKEND_URL}/getcart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data && typeof data === "object") setCartItems(data);
            })
            .catch((error) => console.error("Error fetching cart data:", error));
        }
    }, [BACKEND_URL]);

    // Function to add items to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
            fetch(`${BACKEND_URL}/addtocart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .catch((error) => console.error("Error adding to cart:", error));
        }
    };

    // Function to remove items from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            updatedCart[itemId] = Math.max(0, prev[itemId] - 1);
            return updatedCart;
        });

        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
            fetch(`${BACKEND_URL}/removefromcart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .catch((error) => console.error("Error removing from cart:", error));
        }
    };

    // Function to get total items in cart
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
