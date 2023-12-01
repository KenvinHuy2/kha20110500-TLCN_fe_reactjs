import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const titleMap = {
  '/admin/quan-ly-san-pham/loai-san-pham': 'loại sản phẩm',
  '/admin/quan-ly-san-pham/markers': 'Markers',
  '/admin/quan-ly-san-pham/them-san-pham': 'thêm sản phẩm',
  '/admin/quan-ly-san-pham/danh-sach-san-pham': 'danh sách sản phẩm',
};

const Products = () => {
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

export default Products;
