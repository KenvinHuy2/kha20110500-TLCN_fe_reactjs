import React from 'react';
import { Outlet } from 'react-router-dom';

const Store = () => {
  return (
    <>
      <h2 className='pt-3 pl-3 m-0 text-uppercase'>Quản lý cửa hàng</h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Store;
