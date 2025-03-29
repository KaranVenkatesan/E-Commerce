import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const url = "https://shopper-backend-f50i.onrender.com"
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setcartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch(`${url}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));

        if (localStorage.getItem('auth-token')) {
            fetch(`${url}/getcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
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
            fetch(`${url}/addtocart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .catch((error) => console.error("Error adding to cart:", error));
        }
    };

    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));

        if (localStorage.getItem("auth-token")) {
            fetch(`${url}/removefromcart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .catch((error) => console.error("Error removing from cart:", error));
        }
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValuve = { all_product, cartItems, addToCart, removeFromCart, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValuve}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
