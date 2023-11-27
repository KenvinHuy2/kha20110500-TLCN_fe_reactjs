import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { LazyLoadComponent } from './core/components';
import { AdminLayout, ClientLayout } from './core/layouts';

// Client pages
const Home = lazy(() => import('./pages/home'));

// Admin pages
const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Users = lazy(() => import('./pages/admin/users'));
const Orders = lazy(() => import('./pages/admin/orders'));
const Products = lazy(() => import('./pages/admin/products'));

const App = () => {
  const routes = useRoutes([
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <LazyLoadComponent component={<Dashboard />} />,
        },
        {
          path: 'quan-ly-tai-khoan',
          element: <LazyLoadComponent component={<Users />} />,
        },
        {
          path: 'quan-ly-don-hang',
          element: <LazyLoadComponent component={<Orders />} />,
        },
        {
          path: 'quan-ly-san-pham',
          element: <LazyLoadComponent component={<Products />} />,
        },
      ],
    },
    {
      path: '',
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <LazyLoadComponent component={<Home />} />,
        },
      ],
    },
  ]);
  return <>{routes}</>;
};

export default App;
