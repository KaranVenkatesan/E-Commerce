import React from 'react';
import exclusive_image from '../Assets/exclusive_image.png';

const Offers = () => {
  return (
    <div className="w-[90%] md:w-[75%] lg:w-[65%] h-auto md:h-[60vh] flex flex-col md:flex-row mx-auto px-6 sm:px-10 md:px-16 lg:px-[140px] mb-[80px] md:mb-[120px] lg:mb-[150px] bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] text-center md:text-left">
      {/* Offers Left */}
      <div className="flex flex-1 flex-col justify-center items-center md:items-start py-8 md:py-0">
        <h1 className="text-[#171717] text-2xl sm:text-3xl md:text-[40px] lg:text-[50px] font-bold">
          Exclusive
        </h1>
        <h1 className="text-[#171717] text-2xl sm:text-3xl md:text-[40px] lg:text-[50px] font-bold">
          Offers For You
        </h1>
        <p className="text-[#171717] text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
          ONLY ON BEST SELLERS PRODUCTS
        </p>
        <button className="w-40 sm:w-48 md:w-[220px] lg:w-[282px] h-10 sm:h-12 md:h-[60px] lg:h-[70px] rounded-full bg-[#ff4141] text-white text-xs sm:text-sm md:text-lg lg:text-[22px] font-medium mt-4 cursor-pointer transition-all duration-300 hover:bg-red-600">
          Check Now
        </button>
      </div>

      {/* Offers Right (Hidden on Small Screens) */}
      <div className="hidden sm:flex flex-1 items-center justify-center md:justify-end pt-4 md:pt-[50px]">
        <img className="w-32 sm:w-40 md:w-[250px] lg:w-[350px]" src={exclusive_image} alt="Exclusive Offer" />
      </div>
    </div>
  );
};

export default Offers;
