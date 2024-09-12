import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLoginWrapper = Loadable(lazy(() => import('views/pages/authentication/auth-forms/LoginWrapper')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login/',
      element: <AuthLoginWrapper />
    }
    // {
    //   path: '/pages/register/register3',
    //   element: <AuthRegister3 />
    // }
  ]
};

export default AuthenticationRoutes;
