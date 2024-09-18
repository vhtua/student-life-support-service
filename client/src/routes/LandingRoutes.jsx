import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
const Landing = Loadable(lazy(() => import('views/pages/LandingPage')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  element: <Landing />,
};

export default LandingRoutes;
