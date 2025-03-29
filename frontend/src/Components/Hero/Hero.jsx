import React from 'react';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_img from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-[#FAE8FE] to-[#FCECFF] flex flex-col md:flex-row h-screen px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      {/* Hero left */}
      <div className="flex flex-1 flex-col justify-center gap-3 text-center md:text-left">
        <h2 className="text-[#090909] text-base sm:text-lg md:text-xl font-semibold">
          NEW ARRIVALS ONLY
        </h2>

        <div className="flex justify-center md:justify-start items-center gap-2 sm:gap-3">
          <p className="text-[#171717] text-3xl sm:text-4xl md:text-5xl font-medium">
            new
          </p>
          <img className="w-10 sm:w-12 md:w-14 lg:w-16" src={hand_icon} alt="" />
        </div>
        <p className="text-[#171717] text-3xl sm:text-4xl md:text-5xl font-medium">
          collections
        </p>
        <p className="text-[#171717] text-3xl sm:text-4xl md:text-5xl font-medium">
          for everyone
        </p>

        {/* Centering Button on Small Screens */}
        <div className="flex justify-center md:justify-start mt-3">
          <button className="bg-red-500 text-white flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-4 rounded-full text-sm sm:text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-red-600">
            Latest Collection
            <img className="w-5 sm:w-6 md:w-7" src={arrow_icon} alt="Arrow" />
          </button>
        </div>
      </div>

      {/* Hero right (Hidden on `sm` and Below) */}
      <div className="hidden sm:flex flex-1 flex-col items-center justify-center mt-6 md:mt-0">
        <img className="w-48 sm:w-56 md:w-72 lg:w-[350px] xl:w-[450px]" src={hero_img} alt="" />
      </div>
    </div>
  );
};

export default Hero;
