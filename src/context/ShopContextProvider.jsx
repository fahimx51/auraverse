import { useState } from "react";
import { products } from "../data/products";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

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