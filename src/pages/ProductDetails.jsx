import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShopContext } from "../context/ShopContext";
import BackButton from "../components/BackButton";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

function ProductDetails() {
    const { id } = useParams();

    const { products, setCartItems } = useContext(ShopContext);

    const [product, setProduct] = useState(null);

    // States for selections
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        const item = products.find((p) => p.id == id);
        setProduct(item);

        if (item) {
            if (item.image && item.image.length > 0) {
                setMainImage(item.image[0]);
            }
            if (item.sizes && item.sizes.length > 0) {
                setSelectedSize(item.sizes[0]);
            }
            if (item.colors && item.colors.length > 0) {
                setSelectedColor(item.colors[0]);
            }
        }
    }, [id, products]);

    const addToCart = () => {
        if (!product.inStock) {
            toast.error("Sorry, this product is currently out of stock.");
        }
        else {
            setCartItems(prevItems => [...prevItems, product.id]);
            toast.success("Product added on the cart");
        }
    }

    return (
        <>
            {
                !product ?
                    <Loader />
                    :
                    <div className="px-4 py-6 md:px-0 md:py-10 transition-opacity ease-in duration-500 opacity-100">

                        {/* Back Button */}
                        <BackButton text="Go Back" />

                        {/* Product Data Layout */}
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                            {/* 1. Left Side: Product Images */}
                            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

                                {/* Thumbnails List */}
                                <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-start sm:w-[18.7%] w-full gap-2 pr-1 max-h-[350px] sm:max-h-[500px]">
                                    {product.image.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            onClick={() => setMainImage(img)}
                                            className={`w-[20%] sm:w-full flex-shrink-0 cursor-pointer rounded-lg border transition-all duration-200 ${mainImage === img ? 'border-pink-500 ring-2 ring-pink-100' : 'border-gray-200 hover:border-pink-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Main Active Image Display */}
                                <div className="w-full sm:w-[80%]">
                                    <img
                                        src={mainImage}
                                        alt={product.name}
                                        className="w-full h-auto rounded-xl border border-gray-100 object-cover shadow-sm max-h-[500px]"
                                    />
                                </div>
                            </div>

                            {/* 2. Right Side: Product Details */}
                            <div className="flex-1">
                                {/* Stock Status Badge */}
                                <div className="mb-2">
                                    {product.inStock ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                {/* Product Name */}
                                <h1 className="font-bold text-2xl sm:text-3xl text-slate-800 mt-2 leading-tight">{product.name}</h1>

                                {/* Rating Stars */}
                                <div className="flex items-center gap-1 mt-2">
                                    <div className="flex text-pink-500 text-sm">
                                        {"★".repeat(Math.floor(product.rating))}
                                        {product.rating % 1 !== 0 ? "½" : ""}
                                    </div>
                                    <p className="pl-2 text-xs text-gray-500">({product.rating} Rating)</p>
                                </div>


                                <p className="mt-4 text-2xl sm:text-3xl font-black text-slate-900">$ {product.price}</p>


                                <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed md:w-4/5">{product.description}</p>

                                {/* Select Color Option */}
                                <div className="flex flex-col gap-3 my-6">
                                    <p className="font-semibold text-slate-700">Select Color</p>
                                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                                        {product.colors.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedColor(color)}
                                                title={color}
                                                className={`flex items-center justify-center font-medium transition-all duration-200 rounded-full sm:rounded-lg ${selectedColor === color
                                                    ? 'border-pink-500 text-pink-600 bg-pink-50/30 ring-2 ring-pink-100'
                                                    : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-700'
                                                    } 
                                    w-9 h-9 sm:w-auto sm:h-auto border sm:px-4 sm:py-2`}
                                            >
                                                <span
                                                    className={`rounded-full border border-gray-300 flex-shrink-0 ${selectedColor === color ? 'w-4 h-4 ring-2 ring-pink-400' : 'w-4 h-4'
                                                        }`}
                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                />
                                                <span className="hidden sm:inline ml-2">{color}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Select Size Option */}
                                <div className="flex flex-col gap-3 my-6">
                                    <p className="font-semibold text-slate-700">Select Size</p>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {product.sizes.map((size, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedSize(size)}
                                                className={`border min-w-[44px] py-2 px-3 sm:px-4 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm ${selectedSize === size
                                                    ? 'border-pink-500 text-pink-500 bg-pink-50/20 ring-2 ring-pink-100'
                                                    : 'border-gray-200 bg-gray-50 hover:bg-white text-slate-700'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={addToCart}
                                    disabled={!product.inStock}
                                    className={`w-full sm:w-auto font-bold px-8 py-3.5 rounded-lg transition-all duration-150 mt-4 ${product.inStock
                                        ? "bg-gradient-to-r from-pink-500 to-pink-400 text-white active:scale-95 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 cursor-pointer"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                                        }`}
                                >
                                    {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                                </button>

                                <hr className="mt-8 sm:w-4/5 border-gray-200" />

                                <div className="text-xs sm:text-sm text-gray-500 mt-5 flex flex-col gap-1">
                                    <p>✓ 100% Original product.</p>
                                    <p>✓ Cash on delivery is available on this product.</p>
                                    <p>✓ Easy return and exchange policy within 7 days.</p>
                                </div>
                            </div>

                        </div>
                    </div>
            }

        </>

    );
}

export default ProductDetails;