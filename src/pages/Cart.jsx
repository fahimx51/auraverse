import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Trash2, Plus, Minus, ShoppingBag, User, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

function Cart() {
    const { products, cartItems, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

   
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 1. Calculate and map items from ID array [55, 55, 23]
    const counts = {};
    cartItems.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
    });

    const cartData = [];
    let cartSubtotal = 0;

    for (const id in counts) {
        const productInfo = products.find((p) => p.id == id);
        if (productInfo) {
            const quantity = counts[id];
            const itemTotal = productInfo.price * quantity;
            cartSubtotal += itemTotal;

            cartData.push({
                id,
                quantity,
                ...productInfo
            });
        }
    }

    const updateQuantity = (id, action) => {
        if (action === 'increase') {
            setCartItems((prev) => [...prev, Number(id)]);
        }
        else if (action === 'decrease') {
            setCartItems((prev) => {
                const index = prev.indexOf(Number(id));
                if (index > -1) {
                    const updated = [...prev];
                    updated.splice(index, 1);
                    return updated;
                }
                return prev;
            });
        }
        else if (action === 'delete') {
            setCartItems((prev) => prev.filter((itemId) => itemId != id));
        }
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.address) {
            alert("Please fill in all shipping fields before checking out.");
            return;
        }

        // console.log("Order Placed:", { items: cartData, shipping: formData, total: cartSubtotal });
        alert(`Thank you, ${formData.name}! Your order has been placed successfully.`);
        setCartItems([]); // Clear cart
    };

    // Empty Cart View
    if (cartData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="bg-pink-50 p-6 rounded-full mb-4">
                    <ShoppingBag className="h-12 w-12 text-pink-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Your cart is feeling lonely</h2>
                <p className="text-gray-500 mb-6 max-w-xs text-sm">Add some amazing items to it and make it happy!</p>
                <button
                    onClick={() => navigate('/product')}
                    className="bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all active:scale-95 duration-150"
                >
                    Explore Shop
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-300">
            {/* Header */}
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-xl font-extrabold text-gray-700 tracking-tight">
                    Shopping <span className="bg-gradient-to-r from-pink-500 to-pink-200 bg-clip-text text-transparent">Cart</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">Review your items and enter shipping details below.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-gray-50 bg-gray-50/30">
                            <h2 className="font-bold text-slate-800 text-lg">Selected Products ({cartData.length})</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {cartData.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-all"
                                >
                                    
                                    <div className="flex gap-4 w-full sm:w-auto">
                                        <img
                                            src={item.image[0]}
                                            alt={item.name}
                                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-100 flex-shrink-0 bg-gray-50 group-hover:scale-[1.02] transition-transform duration-200"
                                        />
                                        <div className="flex flex-col justify-center min-w-0">
                                            <h3 className="font-bold text-slate-800 hover:text-pink-500 cursor-pointer transition-colors text-base line-clamp-1" onClick={() => navigate(`/product/${item.id}`)}>
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wide">{item.category}</p>
                                            <p className="mt-2 font-medium text-slate-900 text-base">${item.price}</p>
                                        </div>
                                    </div>

                                    
                                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-gray-50">

                                        
                                        <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, 'decrease')}
                                                className="p-2 hover:bg-gray-50 text-gray-500 active:scale-95 transition-all rounded-l-xl"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-10 text-center text-sm font-extrabold text-slate-800 select-none">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 'increase')}
                                                className="p-2 hover:bg-gray-50 text-gray-500 active:scale-95 transition-all rounded-r-xl"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        
                                        <button
                                            onClick={() => updateQuantity(item.id, 'delete')}
                                            className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50/50 rounded-xl transition-all duration-200 border border-transparent hover:border-rose-100"
                                            title="Remove Item"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Details Form */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="font-bold text-slate-800 text-lg sm:text-xl">Shipping Information</h2>
                            <p className="text-xs text-gray-400 mt-1">Please provide accurate info for quick doorstep delivery.</p>
                        </div>

                        <form onSubmit={handleCheckout} id="checkout-form" className="space-y-5">
                            {/* Full Name Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Fahim Ahmed"
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-100 focus:border-pink-500 text-slate-800 placeholder-gray-400 text-sm transition-all bg-gray-50/30 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Phone Number Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="e.g. +8801XXXXXXXXX"
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-100 focus:border-pink-500 text-slate-800 placeholder-gray-400 text-sm transition-all bg-gray-50/30 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Detailed Address Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Delivery Address</label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <textarea
                                        name="address"
                                        required
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="House #, Street name, Area, City"
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-100 focus:border-pink-500 text-slate-800 placeholder-gray-400 text-sm transition-all bg-gray-50/30 focus:bg-white resize-none"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
                    <div className="bg-gradient-to-b from-white to-gray-50/40 border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                        <h2 className="text-lg font-extrabold text-gray-700 border-b border-gray-100 pb-4 mb-5">Order Summary</h2>

                        <div className="flex flex-col gap-3.5 text-sm pb-5 border-b border-gray-100 text-slate-600">
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-gray-500">Cart Subtotal</p>
                                <p className="font-bold text-slate-800">${cartSubtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-gray-500">Estimated Shipping</p>
                                <p className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs border border-emerald-100">Free</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center my-6">
                            <p className="font-bold text-gray-700">Total Amount</p>
                            <p className="text-xl font-bold text-gray-700">${cartSubtotal.toFixed(2)}</p>
                        </div>

                        {/* Submit button binds to form */}
                        <button
                            type="submit"
                            form="checkout-form"
                            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white font-black py-4 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35 active:scale-[0.98] transition-all duration-150 tracking-wide text-sm"
                        >
                            PLACE ORDER
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-[11px] text-gray-400 font-medium">By placing order, you agree to our terms & policy conditions.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Cart;