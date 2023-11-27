import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { LazyLoadComponent } from './core/components';
import { AdminLayout } from './core/layouts';

const Dashboard = lazy(() => import('./pages/admin/dashboard'));

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
          index: true,
          element: <LazyLoadComponent component={<Dashboard />} />,
        },
        {
          index: true,
          element: <LazyLoadComponent component={<Dashboard />} />,
        },
        {
          index: true,
          element: <LazyLoadComponent component={<Dashboard />} />,
        },
      ],
    },
  ]);
  return <>{routes}</>;
};

export default App;
