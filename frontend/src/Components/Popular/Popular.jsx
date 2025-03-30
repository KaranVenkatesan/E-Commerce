import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"; 

  useEffect(() => {
    fetch(`${url}/popularinwomen`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPopularProducts(data))
      .catch((error) => console.error("Error fetching popular products:", error));
  }, [url]); // Add `url` in dependency array to prevent stale values

  return (
    <div className="flex flex-col items-center gap-2.5 mt-7 mb-12 px-3 sm:px-8">
      <h1 className="text-[#171717] text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        POPULAR IN WOMEN
      </h1>
      <hr className="w-[120px] sm:w-[180px] h-[3px] sm:h-[5px] rounded-[10px] bg-[#252525]" />

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-5 sm:mt-[40px] w-full max-w-[1200px] place-items-center">
        {popularProducts.length > 0 ? (
          popularProducts.map((item, i) => (
            <div className="flex justify-center w-full" key={i}>
              <Item
                id={item.id}
                name={item.name} 
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading popular products...</p>
        )}
      </div>
    </div>
  );
};

export default Popular;
