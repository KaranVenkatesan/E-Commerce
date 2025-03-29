import React from 'react';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const { product } = props;
  return (
    <div className='flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base font-medium m-4 sm:m-[30px_100px] md:m-[60px_170px] capitalize'>
      {/* Breadcrumb */}
      HOME <img className="w-3 sm:w-4" src={arrow_icon} alt="" /> SHOP <img className="w-3 sm:w-4" src={arrow_icon} alt="" /> {product.category} <img className="w-3 sm:w-4" src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum;
