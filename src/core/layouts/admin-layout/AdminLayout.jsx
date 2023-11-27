import {
  CoffeeOutlined,
  DashboardOutlined,
  FormOutlined,
  GiftFilled,
  LogoutOutlined,
  PlusOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles.scss';

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    key: 'users',
    label: 'Quản lý người dùng',
    icon: <TeamOutlined />,
  },
  {
    key: 'products',
    label: 'Quản lý sản phẩm',
    icon: <CoffeeOutlined />,
    children: [
      {
        type: 'group',
        key: 'products-list',
        label: 'Danh sách sản phẩm',
      },
      {
        type: 'group',
        key: 'products-add',
        label: 'Thêm sản phẩm',
      },
      {
        type: 'group',
        key: 'products-type',
        label: 'Loại sản phẩm',
      },
      {
        type: 'group',
        key: 'products-markers',
        label: 'Markers',
      },
    ],
  },
  {
    key: 'orders',
    label: 'Quản lý đơn hàng',
    icon: <FormOutlined />,
  },
  {
    key: 'discount',
    label: 'Quản lý khuyến mãi',
    icon: <GiftFilled />,
  },
];

const AdminLayout = () => {
  return (
    <>
      <div className='vh-100 vw-100'>
        <Layout className='h-100 w-100'>
          <Layout.Sider className='h-100 admin-sidebar'>
            <div className='h-100 d-flex flex-column justify-content-between align-items-start'>
              <div className='d-flex flex-column justify-content-start align-items-center pt-4 pl-3'>
                <h2 className='text-white'>LOGO</h2>
                <div className='pt-2'>
                  <Menu mode='inline' theme='dark' items={menuItems} />
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
            <div className='layout-content p-3'>
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </div>
    </>
  );
};

export default AdminLayout;
