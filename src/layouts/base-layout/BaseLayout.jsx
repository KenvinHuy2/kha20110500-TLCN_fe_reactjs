import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { ConfigProvider } from 'antd';
import Footer from '../../components/footer/Footer';
import TabMenu from '../../components/tab-menu/TabMenu';
import CarouselHome from '../../pages/home/components/CarouselHome/CarouselHome';

const BaseLayout = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0C713D',
        },
      }}>
      <Header />
      <TabMenu />
      <CarouselHome />
      <Outlet />
      <Footer />
    </ConfigProvider>
  );
};

export default BaseLayout;
