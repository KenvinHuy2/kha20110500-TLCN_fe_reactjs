import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const titleMap = {
  '/admin/quan-ly-san-pham/loai-san-pham': 'loại sản phẩm',
  '/admin/quan-ly-san-pham/markers': 'Markers',
  '/admin/quan-ly-san-pham/them-san-pham': 'thêm sản phẩm',
  '/admin/quan-ly-san-pham/danh-sach-san-pham': 'danh sách sản phẩm',
  '/admin/quan-ly-san-pham/cap-nhat-san-pham': (
    <>
      <div className='d-flex align-items-center justify-content-between pr-3'>
        cập nhật sản phẩm
        <NavLink to='/admin/quan-ly-san-pham/danh-sach-san-pham'>
          <Button icon={<ArrowLeftOutlined />}>Trở lại danh sách</Button>
        </NavLink>
      </div>
    </>
  ),
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
