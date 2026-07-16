import { Link } from "react-router";

function ProductItem({product}) {
    console.log(product);
    return (
        <Link to={`/product/${product.id}`} className="text-gray-700 cursor-pointer">
            <div className='overflow-hidden'>
                <img src={product.image[0]} alt="" className='hover:scale-110 transition ease-in-out' />
            </div>
            <p className='pt-3 pb-1 text-sm'>{product.name}</p>
            <p className='text-sm font-medium'>{product.price} $</p>
        </Link>
    )
}

export default ProductItem