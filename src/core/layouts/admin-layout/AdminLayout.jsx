import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <div className='vh-100 vw-100'>
        <Layout className='h-100 w-100'>
          <Layout.Sider></Layout.Sider>
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
