import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../Context/AuthContextProvider';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import logo from '../../assets/images/logo.svg';

const Navbar = () => {
  const { token, setToken } = useContext(authContext);
  const { cartData } = useContext(CartContext);
  const { wishlistData } = useContext(WishlistContext);
  const [isOpen, setIsOpen] = useState(false);

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-green-600 font-semibold border-b-2 border-green-600 pb-1'
      : 'text-gray-700 hover:text-green-500 transition duration-200';

  const wishlistCount = wishlistData?.data?.length || 0;
  const cartCount = cartData?.numOfCartItems || 0;

  return (
    <nav className='bg-gray-100 shadow-sm fixed top-0 left-0 right-0 z-50 py-1'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>

        {/* Logo */}
        <NavLink to='/' className='flex items-center gap-2'>
          <img src={logo} alt='Logo' className='w-full' />
        </NavLink>

        {/* Mobile Toggle */}
        <button className='lg:hidden text-2xl text-gray-700' onClick={toggleMenu}>
          <i className='fas fa-bars' />
        </button>

        {/* Desktop Links */}
        <ul className='hidden lg:flex gap-6 text-sm md:text-lg'>
          {token && (
            <>
              <li><NavLink to='/' className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to='/products' className={navLinkClass}>Products</NavLink></li>
              <li><NavLink to='/categories' className={navLinkClass}>Categories</NavLink></li>
              <li><NavLink to='/brands' className={navLinkClass}>Brands</NavLink></li>
              <li><NavLink to='/allorders' className={navLinkClass}>Orders</NavLink></li>
            </>
          )}
        </ul>

        {/* Right Side Icons */}
        <ul className='hidden lg:flex items-center gap-4'>
          {token ? (
            <>
              {/* Wishlist */}
              <li className='relative'>
                <NavLink to='/wishlist'>
                  <i className='fas fa-heart text-2xl text-gray-700 hover:text-red-500' />
                  {wishlistCount > 0 && (
                    <div className='bg-red-500 text-white text-xs rounded-full size-5 flex justify-center items-center absolute -top-2 -left-2'>
                      {wishlistCount}
                    </div>
                  )}
                </NavLink>
              </li>

              {/* Cart */}
              <li className='relative'>
                <NavLink to='/cart'>
                  <i className='fas fa-cart-shopping text-2xl text-gray-700 hover:text-green-500' />
                  {cartCount > 0 && (
                    <div className='bg-green-500 text-white text-xs rounded-full size-5 flex justify-center items-center absolute -top-2 -left-2'>
                      {cartCount}
                    </div>
                  )}
                </NavLink>
              </li>

              {/* Logout */}
              <li className='cursor-pointer text-lg hover:text-red-500' onClick={signOut}>Logout</li>
            </>
          ) : (
            <>
              <li><NavLink to='/register' className={navLinkClass}>Register</NavLink></li>
              <li><NavLink to='/login' className={navLinkClass}>Login</NavLink></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='lg:hidden bg-gray-100 border-t'>
          <ul className='flex flex-col gap-4 px-6 py-4 text-md'>
            {token && (
              <>
                <li><NavLink to='/' className={navLinkClass} onClick={toggleMenu}>Home</NavLink></li>
                <li><NavLink to='/products' className={navLinkClass} onClick={toggleMenu}>Products</NavLink></li>
                <li><NavLink to='/categories' className={navLinkClass} onClick={toggleMenu}>Categories</NavLink></li>
                <li><NavLink to='/brands' className={navLinkClass} onClick={toggleMenu}>Brands</NavLink></li>
                <li><NavLink to='/wishlist' className={navLinkClass} onClick={toggleMenu}>Wishlist</NavLink></li>
                <li><NavLink to='/cart' className={navLinkClass} onClick={toggleMenu}>Cart</NavLink></li>
                <li><NavLink to='/allorders' className={navLinkClass} onClick={toggleMenu}>Orders</NavLink></li>
              </>
            )}
            {token ? (
              <li onClick={() => { signOut(); toggleMenu(); }} className='cursor-pointer text-red-600'>Logout</li>
            ) : (
              <>
                <li><NavLink to='/register' onClick={toggleMenu}>Register</NavLink></li>
                <li><NavLink to='/login' onClick={toggleMenu}>Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
