import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import './App.scss';
import { LazyLoadComponent, LoadingSpinner } from './core/components';
import { AdminLayout, ClientLayout } from './core/layouts';
import AdminGuard from './core/guards/AdminGuard';

// Client pages
const Home = lazy(() => import('./pages/home'));
const Cart = lazy(() => import('./pages/cart'));
const Teas = lazy(() => import('./pages/teas'));
const Login = lazy(() => import('./pages/login'));
const Drinks = lazy(() => import('./pages/drinks'));
const Coffees = lazy(() => import('./pages/coffees'));
const AboutUs = lazy(() => import('./pages/about-us'));
const Checkout = lazy(() => import('./pages/checkout'));
const Register = lazy(() => import('./pages/register'));
const MyProfile = lazy(() => import('./pages/my-profile'));
const OrderHistory = lazy(() => import('./pages/order-history'));
const MyPromotions = lazy(() => import('./pages/my-promotions'));
const ClientPromotions = lazy(() => import('./pages/promotions'));

// Admin pages
const Dashboard = lazy(() => import('./pages/admin/dashboard'));

// Store
const Store = lazy(() => import('./pages/admin/store'));
const Statistics = lazy(() => import('./pages/admin/store/statistics'));

// Users
const Users = lazy(() => import('./pages/admin/users'));
const ListUsers = lazy(() => import('./pages/admin/users/list-users'));
const CreateUser = lazy(() => import('./pages/admin/users/create-user'));
const UserDetail = lazy(() => import('./pages/admin/users/user-detail'));

// Products
const Products = lazy(() => import('./pages/admin/products'));
const Markers = lazy(() => import('./pages/admin/products/markers'));
const ProductTypes = lazy(() => import('./pages/admin/products/product-types'));
const ListProducts = lazy(() => import('./pages/admin/products/list-products'));
const CreateProduct = lazy(() => import('./pages/admin/products/create-product'));

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
        {
          path: 'ca-phe',
          element: <LazyLoadComponent component={<Coffees />} />,
        },
        {
          path: 'tra',
          element: <LazyLoadComponent component={<Teas />} />,
        },
        {
          path: 'thuc-uong',
          element: <LazyLoadComponent component={<Drinks />} />,
        },
        {
          path: 'khuyen-mai',
          element: <LazyLoadComponent component={<ClientPromotions />} />,
        },
        {
          path: 've-chung-toi',
          element: <LazyLoadComponent component={<AboutUs />} />,
        },
        {
          path: 'dang-nhap',
          element: <LazyLoadComponent component={<Login />} />,
        },
        {
          path: 'dang-ky',
          element: <LazyLoadComponent component={<Register />} />,
        },
        {
          path: 'gio-hang',
          element: <LazyLoadComponent component={<Cart />} />,
        },
        {
          path: 'thanh-toan',
          element: <LazyLoadComponent component={<Checkout />} />,
        },
        {
          path: 'thong-tin-ca-nhan',
          element: <LazyLoadComponent component={<MyProfile />} />,
        },
        {
          path: 'lich-su-dat-hang',
          element: <LazyLoadComponent component={<OrderHistory />} />,
        },
        {
          path: 'khuyen-mai-cua-toi',
          element: <LazyLoadComponent component={<MyPromotions />} />,
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
