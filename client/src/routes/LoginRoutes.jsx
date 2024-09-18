import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/roles/student/MinimalLayout';

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
