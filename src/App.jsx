import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { AdminLayout, BaseLayout } from './layouts';
import Home from './pages/home/Home';

// General

// Admin
const Dashboard = lazy(() => import('./pages/admin/dashboard/Dashboard'));

const App = () => {
    const routes = useRoutes([
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
            ],
        },
        {
            path: '',
            element: <BaseLayout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
            ],
        },
    ]);
    return <>{routes}</>;
};

export default App;
