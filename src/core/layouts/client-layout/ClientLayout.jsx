import React from 'react';
import './styles.scss';
import { Footer, Header } from '../../components';
import { Outlet } from 'react-router-dom';

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
