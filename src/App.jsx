import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { LazyLoadComponent, LoadingSpinner } from './core/components';
import { AdminLayout, ClientLayout } from './core/layouts';

// Client pages
const Home = lazy(() => import('./pages/home'));

// Admin pages
const Dashboard = lazy(() => import('./pages/admin/dashboard'));

// Store
const Store = lazy(() => import('./pages/admin/store'));
const Statistics = lazy(() => import('./pages/admin/store/statistics'));
const BannerSettings = lazy(() => import('./pages/admin/store/banner-settings'));

// Users
const Users = lazy(() => import('./pages/admin/users'));
const ListUsers = lazy(() => import('./pages/admin/users/list-users'));
const CreateUser = lazy(() => import('./pages/admin/users/create-user'));
const UserDetail = lazy(() => import('./pages/admin/users/user-detail'));

// Products
const Products = lazy(() => import('./pages/admin/products'));
const ListProducts = lazy(() => import('./pages/admin/products/list-products'));
const CreateProduct = lazy(() => import('./pages/admin/products/create-product'));
const ProductTypes = lazy(() => import('./pages/admin/products/product-types'));
const Markers = lazy(() => import('./pages/admin/products/markers'));

// Orders
const Orders = lazy(() => import('./pages/admin/orders'));

// Promotions
const Promotions = lazy(() => import('./pages/admin/promotions'));
const ListPromotions = lazy(() => import('./pages/admin/promotions/list-promotions'));
const CreatePromotion = lazy(() => import('./pages/admin/promotions/create-promotion'));

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
            {
              path: 'chi-tiet-nguoi-dung/:userId',
              element: <LazyLoadComponent component={<UserDetail />} />,
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
          children: [
            {
              path: 'danh-sach-san-pham',
              element: <LazyLoadComponent component={<ListProducts />} />,
            },
            {
              path: 'them-san-pham',
              element: <LazyLoadComponent component={<CreateProduct />} />,
            },
            {
              path: 'loai-san-pham',
              element: <LazyLoadComponent component={<ProductTypes />} />,
            },
            {
              path: 'markers',
              element: <LazyLoadComponent component={<Markers />} />,
            },
          ],
        },
        {
          path: 'quan-ly-khuyen-mai',
          element: <LazyLoadComponent component={<Promotions />} />,
          children: [
            {
              path: 'danh-sach-khuyen-mai',
              element: <LazyLoadComponent component={<ListPromotions />} />,
            },
            {
              path: 'tao-khuyen-mai',
              element: <LazyLoadComponent component={<CreatePromotion />} />,
            },
          ],
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
