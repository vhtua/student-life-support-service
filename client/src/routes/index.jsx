import { createBrowserRouter } from 'react-router-dom';

// routes
// import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import LogoutRoutes from './LogoutRoutes';
import ResetPasswordRoutes from './ResetPassword';
import LandingRoutes from './LandingRoutes';
import StudentRoutes from './StudentRoutes';
import StaffRoutes from './StaffRoutes';
import AdminRoutes from './AdminRoutes';

import MainRoutes from './MainRoutes';


// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LandingRoutes, LoginRoutes, LogoutRoutes, ResetPasswordRoutes, StudentRoutes, StaffRoutes, AdminRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
