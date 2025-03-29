import React from 'react';

const NewsLetter = () => {
  return (
    <div className="w-full max-w-[1200px] h-auto flex flex-col items-center justify-center m-auto px-5 sm:px-10 py-10 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] gap-5 rounded-lg">
      {/* Newsletter */}
      <h1 className="text-[#454545] text-2xl sm:text-3xl font-bold text-center">Get Exclusive Offers on Your Email!</h1>
      <p className="text-[#454545] text-sm sm:text-lg font-semibold text-center">Subscribe to our newsletter and stay updated</p>

      {/* Email Input Section */}
      <div className="bg-white w-full max-w-[730px] h-[55px] sm:h-[70px] rounded-full border border-solid flex items-center justify-between px-5 shadow-md">
        <input
          className="w-full flex-1 text-sm sm:text-base px-4 border-none outline-none text-[#616161] font-poppins"
          type="email"
          placeholder="Your Email id..."
        />
        <button className="w-[120px] sm:w-[180px] h-[45px] sm:h-[55px] rounded-full bg-black text-white text-sm sm:text-lg cursor-pointer transition-all duration-300 hover:bg-gray-800">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
