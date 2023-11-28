import {
  CoffeeOutlined,
  FormOutlined,
  GiftFilled,
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useMemo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles.scss';

const AdminLayout = () => {
  const menuItems = useMemo(() => {
    return [
      {
        key: 'cua-hang',
        label: 'Cửa hàng',
        icon: <HomeOutlined />,
        children: [
          {
            key: '/admin/cua-hang/thong-ke-doanh-thu',
            label: <NavLink to='cua-hang/thong-ke-doanh-thu'>Thống kê doanh thu</NavLink>,
          },
          {
            key: '/admin/cua-hang/thiet-lap-banner',
            label: <NavLink to='cua-hang/thiet-lap-banner'>Thiết lập banner</NavLink>,
          },
        ],
      },
      {
        key: 'users',
        label: 'Quản lý người dùng',
        icon: <TeamOutlined />,
        children: [
          {
            key: '/admin/quan-ly-nguoi-dung/danh-sach-nguoi-dung',
            label: (
              <NavLink to='quan-ly-nguoi-dung/danh-sach-nguoi-dung'>Danh sách người dùng</NavLink>
            ),
          },
          {
            key: '/admin/quan-ly-nguoi-dung/tao-tai-khoan',
            label: <NavLink to='quan-ly-nguoi-dung/tao-tai-khoan'>Tạo tài khoản</NavLink>,
          },
        ],
      },
      {
        key: 'products',
        label: 'Quản lý sản phẩm',
        icon: <CoffeeOutlined />,
        children: [
          {
            key: '/admin/quan-ly-san-pham/danh-sach-san-pham',
            label: <NavLink to='quan-ly-san-pham/danh-sach-san-pham'>Danh sách sản phẩm</NavLink>,
          },
          {
            key: '/admin/quan-ly-san-pham/them-san-pham',
            label: <NavLink to='quan-ly-san-pham/them-san-pham'>Thêm sản phẩm</NavLink>,
          },
          {
            key: '/admin/quan-ly-san-pham/loai-san-pham',
            label: <NavLink to='quan-ly-san-pham/loai-san-pham'>Loại sản phẩm</NavLink>,
          },
          {
            key: '/admin/quan-ly-san-pham/loai-san-pham/markers',
            label: <NavLink to='quan-ly-san-pham/markers'>Markers</NavLink>,
          },
        ],
      },
      {
        key: 'discounts',
        label: 'Quản lý khuyến mãi',
        icon: <GiftFilled />,
        children: [
          {
            key: '/admin/khuyen-mai/danh-sach-khuyen-mai',
            label: <NavLink to='khuyen-mai/danh-sach-khuyen-mai'>Danh sách khuyến mãi</NavLink>,
          },
          {
            key: '/admin/khuyen-mai/tao-khuyen-mai',
            label: <NavLink to='khuyen-mai/tao-khuyen-mai'>Tạo khuyến mãi</NavLink>,
          },
        ],
      },
      {
        key: '/admin/quan-ly-don-hang',
        label: <NavLink to='quan-ly-don-hang'>Quản lý đơn hàng</NavLink>,
        icon: <FormOutlined />,
      },
    ];
  }, []);

  return (
    <>
      <div className='vh-100 vw-100 bg-white'>
        <Layout className='h-100 w-100'>
          <Layout.Sider className='h-100 admin-sidebar'>
            <div className='h-100 d-flex flex-column justify-content-between align-items-start'>
              <div className='d-flex flex-column justify-content-start align-items-center pt-4 pl-3'>
                <h2 className='text-white'>LOGO</h2>
                <div className='pt-2'>
                  <Menu theme='dark' mode='inline' items={menuItems} />
                </div>
              </div>
              <div className='p-3 w-100'>
                <Button
                  icon={<LogoutOutlined />}
                  type='primary'
                  danger
                  size='large'
                  className='w-100'>
                  Đăng xuất
                </Button>
              </div>
            </div>
          </Layout.Sider>
          <Layout.Content>
            <div className='layout-content'>
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </div>
    </>
  );
};

export default AdminLayout;
