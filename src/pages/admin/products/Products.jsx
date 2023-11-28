import React from 'react';
import { Outlet } from 'react-router-dom';

const Products = () => {
  return (
    <>
      <h2 className='pt-3 pl-3 m-0 text-uppercase'>Quản lý sản phẩm</h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Products;
