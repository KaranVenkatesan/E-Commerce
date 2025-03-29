import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';

const Admin = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen'>
      {/* Sidebar (Left on large screens, Top on smaller screens) */}
      <div className="w-full md:w-[250px]">
        <Sidebar />
      </div>

      {/* Page Content */}
      <div className='flex-1 p-4 overflow-auto'>
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
