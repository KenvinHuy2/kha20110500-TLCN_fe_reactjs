import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const titleMap = {
  '/admin/quan-ly-nguoi-dung/tao-tai-khoan': 'tạo tài khoản',
  '/admin/quan-ly-nguoi-dung/danh-sach-nguoi-dung': 'danh sách người dùng',
  '/admin/quan-ly-nguoi-dung/chi-tiet-nguoi-dung': 'chi tiết người dùng',
};

const Users = () => {
  const [title, setTitle] = useState('QUẢN LÝ NGƯỜI DÙNG');
  const location = useLocation();

  useEffect(() => {
    let keyMap = location.pathname;
    const segments = location.pathname.split('/');
    if (segments.length > 4) {
      keyMap = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
    }
    setTitle(titleMap[keyMap]);
  }, [location.pathname]);
  return (
    <>
      <h2 className='pt-3 pl-3 m-0 text-uppercase'>{title}</h2>
      <hr />
      <Outlet />
    </>
  );
};

export default Users;
