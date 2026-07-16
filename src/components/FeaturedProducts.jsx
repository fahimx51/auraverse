import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import TitleSection from "./TitleSection";
import ProductItem from "./ProductItem";

function FeaturedProducts() {
    const { products } = useContext(ShopContext);

    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        setFeaturedProducts(products.slice(0, 5));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <TitleSection text1="FEATURED " text2="PRODUCTS" />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>

            {/* Rendering featured products  */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    featuredProducts.map(product =>
                        <ProductItem key={product?.id} product={product} />
                    )
                }
            </div>

        </div>
    )
}

export default FeaturedProducts