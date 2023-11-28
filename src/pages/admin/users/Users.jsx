import React from 'react';
import { Outlet } from 'react-router-dom';

const Users = () => {
  return (
    <>
      <h2 className='pt-3 pl-3 m-0' style={{ fontWeight: 600 }}>
        Quản lý người dùng
      </h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Users;
