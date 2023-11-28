import React from 'react';
import { Outlet } from 'react-router-dom';

const Users = () => {
  return (
    <>
      <h2>Quản lý người dùng</h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Users;
