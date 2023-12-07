import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';
import './styles.scss';

const ClientLayout = () => {
  return (
    <>
      <div id='client-layout'>
        <Header />
        <div id='client-content'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
