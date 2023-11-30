import React from 'react';
import './styles.scss';
import { Header } from '../../components';
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <>
      <div id='client-layout'>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default ClientLayout;
