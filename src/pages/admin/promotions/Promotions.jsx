import React from 'react';
import { Outlet } from 'react-router-dom';

const Promotions = () => {
  return (
    <>
      <h2 className='pt-3 pl-3 m-0 text-uppercase'>quản lý khuyến mãi</h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Promotions;
