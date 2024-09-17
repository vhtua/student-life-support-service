import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import LandingRoutes from './LandingRoutes';
import StudentRoutes from './StudentRoutes';


// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LandingRoutes, LoginRoutes, StudentRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
