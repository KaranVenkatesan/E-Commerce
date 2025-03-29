import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="px-5 sm:px-10">
      {/* Shop Category Banner */}
      <img className="block w-[90%] sm:w-[82%] my-5 mx-auto" src={props.banner} alt="" />

      {/* Sorting and Product Count */}
      <div className="flex w-full max-w-[1200px] mx-auto items-center justify-between px-3 sm:px-5">
        <p className="font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base">
          <span className="font-bold">Showing 1-12</span> out of 36 products
        </p>

        {/* Sort Dropdown */}
        <div className="p-.5 sm:p-1 md:p-2 rounded-full border border-gray-400 flex items-center gap-1 sm:gap-2 cursor-pointer text-xs sm:text-sm md:text-base">
          Sort by
          <img className="w-2 sm:w-3 md:w-4" src={dropdown_icon} alt="" />
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 mt-4 sm:mt-8 mx-auto max-w-[1200px]">
  {all_product.map((item, i) => {
    if (props.category === item.category) {
      return (
        <Item
          key={i}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}
          className="text-[10px] sm:text-sm md:text-base"
        />
      );
    }
    return null;
  })}
</div>



      {/* Load More Button */}
      <div className="flex justify-center items-center mx-auto my-12 sm:my-20 w-[160px] sm:w-[210px] h-[45px] sm:h-[50px] rounded-full bg-gray-200 text-gray-600 text-sm sm:text-lg font-medium cursor-pointer hover:bg-gray-300 transition-all duration-300">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
