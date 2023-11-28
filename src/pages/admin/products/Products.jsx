import React from 'react';
import { Outlet } from 'react-router-dom';

const Products = () => {
  return (
    <>
      <h2 className='p-3 m-0' style={{ fontWeight: 600 }}>
        Quản lý sản phẩm
      </h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Products;
