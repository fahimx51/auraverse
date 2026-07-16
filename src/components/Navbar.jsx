import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import { ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

function Navbar() {

    const { cartItems } = useContext(ShopContext);

    const navLinkBase = "relative px-1 mx-2 bg-transparent font-bold tracking-wider transition-colors duration-200 ease-in-out py-1";

    const activeStyles = "bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-pink-500 after:to-pink-400";

    const notActiveStyles = "text-gray-400 hover:text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gray-300 after:transition-all after:duration-200";

    const navItems = (
        <>
            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) => `${navLinkBase} ${isActive ? activeStyles : notActiveStyles}`}
                >
                    HOME
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/product'
                    className={({ isActive }) => `${navLinkBase} ${isActive ? activeStyles : notActiveStyles}`}
                >
                    PRODUCTS
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            navItems
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">
                    <Logo />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn relative flex items-center justify-center p-2">
                    {/* Shopping Cart Icon */}
                    <ShoppingCart className="h-6 w-6 text-gray-700" />

                    {/* Cart Item Count Badge */}
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white ring-2 ring-white">
                        {cartItems.length}
                    </span>
                </a>
            </div>
        </div>
    )
}

export default Navbar