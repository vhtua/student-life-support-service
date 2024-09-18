import { lazy } from 'react';

// project imports
import Loadable from 'views/roles/student/ui-component/Loadable';
const Landing = Loadable(lazy(() => import('views/pages/LandingPage')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  element: <Landing />,
};

export default LandingRoutes;
