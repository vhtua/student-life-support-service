import { lazy } from 'react';

// project imports
import MainLayout from 'views/roles/student/layout/MainLayout';
import Loadable from 'views/roles/student/ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/roles/student/homepage')));
const StudentProfile = Loadable(lazy(() => import('views/roles/student/StudentProfile')));
const EditProfile = Loadable(lazy(() => import('views/roles/student/EditProfile')));
const ChangePassword = Loadable(lazy(() => import('views/roles/student/ChangePassword')));


// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const Logout = Loadable(lazy(() => import('views/utilities/Logout')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

import ProtectedRoutes from 'utils/ProtectedRoutes';
import { element } from 'prop-types';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/admin/',
  element: (
    <ProtectedRoutes role_name="Admin">
      <MainLayout />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: 'homepage',
      element: (
          <DashboardDefault />
      )
    },
  ]
};

export default MainRoutes;
