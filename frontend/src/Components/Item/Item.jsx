import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className="w-full max-w-[280px] sm:max-w-[240px] md:max-w-[200px] lg:max-w-[180px] xl:max-w-[160px] my-2 hover:scale-105 transition duration-500 cursor-pointer text-base sm:text-sm md:text-xs">
      {/* Item Image */}
      <Link to={`/product/${props.id}`}>
        <img 
          className="w-full h-auto object-cover rounded-lg"
          onClick={() => window.scrollTo(0, 0)}
          src={props.image} 
          alt={props.name} 
        />
      </Link>

      {/* Item Name */}
      <p className="mt-2 text-base sm:text-sm md:text-xs text-center">
        {props.name}
      </p>

      {/* Pricing Section */}
      <div className="flex justify-center gap-4 items-center">
        {/* New Price */}
        <div className="text-[#374151] font-semibold text-lg sm:text-base md:text-sm">
          ${props.new_price}
        </div>

        {/* Old Price (Strikethrough) */}
        <div className="text-[#8c8c8c] line-through text-lg sm:text-base md:text-sm">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
