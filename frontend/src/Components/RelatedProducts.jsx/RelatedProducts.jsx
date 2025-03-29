import React from 'react';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const RelatedProducts = () => {
  return (
    <div className='flex flex-col items-center gap-4 px-4 sm:px-8 py-8'>
      {/* Section Title */}
      <h1 className='text-[#171717] text-lg sm:text-2xl font-bold text-center'>Related Products</h1>
      <hr className='bg-[#252525] h-1.5 rounded-lg w-[120px] sm:w-[200px]' />

      {/* Responsive Grid Layout */}
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-[1200px] justify-items-center'>
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
