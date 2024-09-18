import { lazy } from 'react';

// project imports
import Loadable from 'views/roles/student/ui-component/Loadable';
import MinimalLayout from 'views/roles/student/layout/MinimalLayout';

const AuthLoginWrapper = Loadable(lazy(() => import('views/pages/authentication/auth-forms/LoginWrapper')));

// ==============================|| LOGIN ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLoginWrapper />
    }
  ]
};

export default LoginRoutes;
