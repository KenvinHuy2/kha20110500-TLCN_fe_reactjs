import React from 'react';
import { Outlet } from 'react-router-dom';

const Store = () => {
  return (
    <>
      <h2>Quản lý cửa hàng</h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Store;
