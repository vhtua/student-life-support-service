import { lazy } from 'react';

// project imports
import Loadable from 'views/roles/student/ui-component/Loadable';
import MinimalLayout from 'views/roles/student/layout/MinimalLayout';

const ForgotPasswordWrapper = Loadable(lazy(() => import('views/pages/authentication/auth-forms/ForgotPasswordWrapper')));

// ==============================|| LOGIN ROUTING ||============================== //

const ResetPasswordRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'reset-password',
      element: <ForgotPasswordWrapper />
    }
  ]
};

export default ResetPasswordRoutes;
