import { products } from "../data/products";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = ({ children }) => {

    const value = {
        products
    };

    return (
        <ShopContext value={value}>
            {children}
        </ShopContext>
    )
}

export default ShopContextProvider;