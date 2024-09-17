import { lazy } from 'react';

// project imports
import MainLayout from 'layout/roles/student/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/roles/student/homepage')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/roles/student/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const Logout = Loadable(lazy(() => import('views/utilities/Logout')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

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
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'logout',
      element: <Logout/>
    }
  ]
};

export default StudentRoutes;
