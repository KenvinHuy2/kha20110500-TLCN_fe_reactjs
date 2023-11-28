import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { LazyLoadComponent, LoadingSpinner } from './core/components';
import { AdminLayout, ClientLayout } from './core/layouts';

// Client pages
const Home = lazy(() => import('./pages/home'));

// Admin pages
const Dashboard = lazy(() => import('./pages/admin/dashboard'));

const Store = lazy(() => import('./pages/admin/store'));
const Statistics = lazy(() => import('./pages/admin/store/statistics'));
const BannerSettings = lazy(() => import('./pages/admin/store/banner-settings'));

const Users = lazy(() => import('./pages/admin/users'));
const ListUsers = lazy(() => import('./pages/admin/users/list-users'));
const CreateUser = lazy(() => import('./pages/admin/users/create-user'));

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
          path: 'cua-hang',
          element: <LazyLoadComponent component={<Store />} />,
          children: [
            {
              path: 'thong-ke-doanh-thu',
              element: <LazyLoadComponent component={<Statistics />} />,
            },
            {
              path: 'thiet-lap-banner',
              element: <LazyLoadComponent component={<BannerSettings />} />,
            },
          ],
        },
        {
          path: 'quan-ly-nguoi-dung',
          element: <LazyLoadComponent component={<Users />} />,
          children: [
            {
              path: 'danh-sach-nguoi-dung',
              element: <LazyLoadComponent component={<ListUsers />} />,
            },
            {
              path: 'tao-tai-khoan',
              element: <LazyLoadComponent component={<CreateUser />} />,
            },
          ],
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
  return (
    <>
      {routes}
      <LoadingSpinner />
    </>
  );
};

export default App;
