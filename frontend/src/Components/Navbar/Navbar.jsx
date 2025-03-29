import React, { useContext, useRef, useState } from 'react';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-2 shadow-md bg-white w-full sticky top-0 z-50'>
      {/* Main Navbar */}
      <div className='flex flex-row items-center gap-2 sm:gap-3'>
        {/* Logo and Title */}
        <img className='w-10 sm:w-12 md:w-14 lg:w-16' src={logo} alt="" />
        <p className='text-base sm:text-lg md:text-xl font-semibold font-poppins'>SHOPPER</p>
      </div>

      {/* Mobile Menu Toggle */}
      <img onClick={dropdown_toggle} src={nav_dropdown} alt="" className={`w-6 cursor-pointer md:hidden transition-transform duration-500 ${isDropdownOpen ? 'rotate-[-90deg]' : 'rotate-0'}`}
      />

      {/* Navigation Menu */}
      <ul
        ref={menuRef}
        className={`absolute md:static bg-white md:flex flex-row list-none gap-3 lg:gap-5 text-gray-700 text-xs sm:text-sm md:text-base font-normal shadow-md md:shadow-none 
          transition-all duration-500 ease-in-out 
          ${isDropdownOpen ? "top-[50px] left-0 w-full h-[80px] flex flex-row justify-center items-center" : "hidden md:flex"}`}

      >
        <li onClick={() => { setMenu("shop"); setIsDropdownOpen(false); }} className='flex flex-col items-center justify-center gap-1 cursor-pointer font-poppins'>
          <Link to='/'>Shop</Link>
          {menu === "shop" && <hr className='border-none w-4/5 h-0.5 bg-red-600 rounded-md' />}
        </li>
        <li onClick={() => { setMenu("men"); setIsDropdownOpen(false); }} className='flex flex-col items-center justify-center gap-1 cursor-pointer font-poppins'>
          <Link to='/men'>Men</Link>
          {menu === "men" && <hr className='border-none w-4/5 h-0.5 bg-red-600 rounded-md' />}
        </li>
        <li onClick={() => { setMenu("women"); setIsDropdownOpen(false); }} className='flex flex-col items-center justify-center gap-1 cursor-pointer font-poppins'>
          <Link to='/women'>Women</Link>
          {menu === "women" && <hr className='border-none w-4/5 h-0.5 bg-red-600 rounded-md' />}
        </li>
        <li onClick={() => { setMenu("kids"); setIsDropdownOpen(false); }} className='flex flex-col items-center justify-center gap-1 cursor-pointer font-poppins'>
          <Link to='/kids'>Kids</Link>
          {menu === "kids" && <hr className='border-none w-4/5 h-0.5 bg-red-600 rounded-md' />}
        </li>
      </ul>

      {/* Right Section: Login and Cart */}
      <div className='flex flex-row items-center gap-2 sm:gap-3 md:gap-4'>
        {localStorage.getItem('auth-token') ?
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/") }} className="w-16 sm:w-20 md:w-24 h-7 sm:h-8 md:h-9 border border-gray-300 rounded-3xl bg-red-500 text-white text-xs sm:text-sm font-normal cursor-pointer hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">Logout</button> : <Link to='/login'>
            <button className='w-16 sm:w-20 md:w-24 h-7 sm:h-8 md:h-9 border border-gray-300 rounded-3xl bg-gray-200 text-xs sm:text-sm text-black font-normal cursor-pointer hover:bg-red-300 active:bg-red-500 active:text-white focus:outline-none focus:ring focus:ring-black'>
              Login
            </button>
          </Link>}

        <Link to='/cart'>
          <div className='relative'>
            <img className='w-5 sm:w-6 md:w-7 lg:w-8' src={cart_icon} alt="Cart" />
            {/* Cart Count */}
            <div className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-600 w-4 sm:w-5 h-4 sm:h-5 flex justify-center items-center rounded-full text-xs text-white'>
              {getTotalCartItems()}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
