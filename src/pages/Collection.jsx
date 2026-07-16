import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../data/products';
import TitleSection from '../components/TitleSection';
import ProductItem from '../components/ProductItem';

function Collection() {

    const { products } = useContext(ShopContext);

    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [sortType, setSortType] = useState("relavant");

    useEffect(() => {
        const uniqueCategories = [...new Set(products.map((product) => product.category))];
        setCategories(uniqueCategories);
    }, [products]);


    const toggleCategory = (e) => {
        const value = e.target.value;

        if (selectedCategories.includes(value)) {
            setSelectedCategories((prev) => prev.filter((item) => item !== value));
        } else {
            setSelectedCategories((prev) => [...prev, value]);
        }
    };

    const filterAndSortProducts = () => {
        let productsCopy = products.slice();

        if (selectedCategories.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                selectedCategories.includes(item.category)
            );
        }


        switch (sortType) {
            case "low-high":
                productsCopy.sort((a, b) => a.price - b.price);
                break;
            case "high-low":
                productsCopy.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredProducts(productsCopy);
    };

    useEffect(() => {
        filterAndSortProducts();
    }, [products, selectedCategories, sortType]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            
            {/* Filter Options */}
            <div className="min-w-60">
                <div onClick={() => setShowFilter(!showFilter)} className='my-2 text-md md:text-xl flex items-center cursor-pointer gap-2'>
                    <p>FILTERS</p>
                    <img
                        src={assets.dropdown_icon}
                        alt=""
                        className={`h-3 my-1.5 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
                    />
                </div>

                {/* Category Filters */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        {
                            categories.map((category, index) => (
                                <p key={index} className='flex gap-2'>
                                    <input type="checkbox" value={category} onChange={toggleCategory} className='w-3' />
                                    {category}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <div className='max-sm:hidden'>
                        <TitleSection text1={'ALL '} text2={'COLLECTIONS'} />
                    </div>

                    {/* Product Sort */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        value={sortType}
                        className="border-2 border-gray-300 text-sm px-2"
                    >
                        <option value="relavant">Sort By : Relevant</option>
                        <option value="low-high">Sort By : Price Low to High</option>
                        <option value="high-low">Sort By : Price High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {
                        filteredProducts.map(product =>
                            <ProductItem key={product.id} product={product} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection;