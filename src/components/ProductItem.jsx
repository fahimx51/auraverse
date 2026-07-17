import { Link } from "react-router";
import { Star } from "lucide-react"; 

function ProductItem({ product }) {
    // console.log("product : ", product);
    return (
        <Link
            to={`/product/${product.id}`}
            className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-pink-200 overflow-hidden hover:shadow-lg hover:shadow-pink-500/5 transition-all duration-300"
        >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                />

                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="bg-white/95 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full shadow-sm tracking-wide">
                            OUT OF STOCK
                        </span>
                    </div>
                )}
            </div>

            {/* Product Details Section */}
            <div className="p-4 flex flex-col flex-1">
                <p className="text-[10px] font-bold text-pink-500 uppercase tracking-wider mb-1">
                    {product.category}
                </p>
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-pink-500 transition-colors line-clamp-1">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                    <p className="text-base font-bold text-gray-700">
                        $ {product.price}
                    </p>
                    {product.rating && (
                        <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-bold text-amber-500">
                                {product.rating}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;