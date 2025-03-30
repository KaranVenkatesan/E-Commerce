import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"; 

  useEffect(() => {
    fetch(`${url}/newcollection`)
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
      .catch((error) => console.error("Error fetching new collection:", error));
  }, [url]);

  return (
    <div className="flex flex-col items-center gap-2 mt-5 mb-[50px] sm:mb-[70px] px-3 sm:px-8">
      <h1 className="text-[#171717] text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        NEW COLLECTIONS
      </h1>
      <hr className="w-[120px] sm:w-[180px] h-[3px] sm:h-[5px] rounded-[10px] bg-[#252525]" />

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-5 sm:mt-[40px] w-full max-w-[1200px] place-items-center">
        {new_collection.map((item, i) => (
          <div className="flex justify-center w-full" key={i}>
            <Item
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              className="text-xs sm:text-sm md:text-base"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
