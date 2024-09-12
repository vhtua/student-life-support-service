import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import LandingPage from 'views/pages/LandingPage';

// login option 3 routing
// const AuthLoginWrapper = Loadable(lazy(() => import('views/pages/authentication/auth-forms/LoginWrapper')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));
const Landing = Loadable(lazy(() => import('views/pages/LandingPage')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LandingRoutes = {
  path: '/landing',
  element: <Landing />
};

export default LandingRoutes;
