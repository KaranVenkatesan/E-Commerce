import React from 'react';

const DescriptionBox = () => {
    return (
        <div className='w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-16 my-10 sm:my-16 lg:my-20'>
            {/* descriptionbox */}
            <div className='flex flex-col sm:flex-row'>
                {/* descriptionbox-navigator */}
                <div className='flex items-center justify-center text-xs sm:text-sm md:text-base font-medium w-[50%] sm:w-[130px] h-[40px] border border-[#d0d0d0] border-solid'>
                    {/* descriptionbox-nav-box */}
                    Description
                </div>
                <div className='bg-[#FBFBFB] text-[#555] flex items-center justify-center text-xs sm:text-sm md:text-base font-medium w-[50%] sm:w-[130px] h-[40px] border border-[#d0d0d0] border-solid'>
                    {/* descriptionbox-nav-box-fade */}
                    Reviews (133)
                </div>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 border border-[#d0d0d0] border-solid p-4 sm:p-6 md:p-9 pb-8 sm:pb-12'>
                {/* descriptionbox-description */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-loose text-gray-700">
                    An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-loose text-gray-700">
                    E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                </p>
            </div>
        </div>
    );
};

export default DescriptionBox;
