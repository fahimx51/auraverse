import { useEffect, useState } from "react";
import { products } from "../data/products";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [setCartItems, cartItems]);

    const value = {
        products,
        cartItems,
        setCartItems
    };

    return (
        <ShopContext value={value}>
            {children}
        </ShopContext>
    )
}

export default ShopContextProvider;