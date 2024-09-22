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
const UtilsTypography = Loadable(lazy(() => import('views/roles/student/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/roles/student/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/roles/student/utilities/Shadow')));
const Logout = Loadable(lazy(() => import('views/utilities/Logout')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

import ProtectedRoutes from 'utils/ProtectedRoutes';
import { element } from 'prop-types';

// ==============================|| MAIN ROUTING ||============================== //

const StudentRoutes = {
  path: '/student/',
  element: (
    <ProtectedRoutes role_name="Student">
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
    {
      path: 'profile',
      element: <StudentProfile />
    },

    {
      path: 'settings',
      children: [
        {
          path: 'edit-profile',
          element: <EditProfile/>
        },
        {
          path: 'change-password',
          element: <ChangePassword/>
        }

      ]
    },

    {
      path: 'tickets',
      children: [
        {
          path: 'my-tickets',
          element: <UtilsTypography />
        },
        {
          path: 'create-ticket',
          element: <UtilsTypography />
        },
        
      ]
    },
    {
      path: 'newsfeeds',
      children: [
        {
          path: 'newsfeeds',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'notification',
      children: [
        {
          path: 'notification',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'announcement',
      children: [
        {
          path: 'announcement',
          element: <UtilsShadow />
        }
      ]
    },

  ]
};

export default StudentRoutes;
