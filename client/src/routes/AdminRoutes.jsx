import { lazy } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

// project imports
import MainLayout from 'views/roles/admin/layout/MainLayout';
import Loadable from 'views/roles/admin/ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/roles/admin/homepage')));
const TicketsManagement = Loadable(lazy(() => import('views/roles/admin/TicketsManagement')));
const UsersManagement = Loadable(lazy(() => import('views/roles/admin/UsersManagement')));
const Notification = Loadable(lazy(() => import('views/roles/admin/Notification')));
const Announcement = Loadable(lazy(() => import('views/roles/admin/Announcement')));
const EditProfile = Loadable(lazy(() => import('views/roles/admin/EditProfile')));
const ChangePassword = Loadable(lazy(() => import('views/roles/admin/ChangePassword')));
const Newsfeed = Loadable(lazy(() => import('views/roles/admin/Newsfeed')));


const Profile = Loadable(lazy(() => import('views/roles/admin/Profile')));
const CreateTicket = Loadable(lazy(() => import('views/roles/admin/CreateTicket')));
const TicketHistory = Loadable(lazy(() => import('views/roles/admin/TicketHistory')));

const Message = Loadable(lazy(() => import('views/roles/admin/Message')));

const Feedback = Loadable(lazy(() => import('views/roles/admin/Feedback')));
const TicketsHandling = Loadable(lazy(() => import('views/roles/admin/TicketsHandling')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/roles/student/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/roles/student/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/roles/student/utilities/Shadow')));
// const Logout = Loadable(lazy(() => import('views/utilities/Logout')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

import AdminProtectedRoutes from 'utils/AdminProtectedRoutes';
import { element } from 'prop-types';

// Component to handle passing conversation_id to Message component
const MessageWrapper = () => {
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get('conversation_id');
    return <Message conversation_id={conversationId ? parseInt(conversationId) : 0} />;
};

// ==============================|| STUDENTS ROUTING ||============================== //


const AdminRoutes = {
  path: '/admin/',
  element: (
    <AdminProtectedRoutes>
      <MainLayout />
    </AdminProtectedRoutes>
  ),
  children: [
    {
      path: 'homepage',
      element: (
        // <DashboardDefault />
        <AdminProtectedRoutes>
            <DashboardDefault />
        </AdminProtectedRoutes>
        )
    },
    {
      path: 'profile',
      element: (
        // <Profile />
        <AdminProtectedRoutes>
          <Profile />
        </AdminProtectedRoutes>
      )
    },
    {
      path: 'settings',
      children: [
        {
          path: 'edit-profile',
          element: (
            // <EditProfile />
            <AdminProtectedRoutes>
              <EditProfile />
            </AdminProtectedRoutes>
          )
        },
        {
          path: 'change-password',
          element: (
            // <ChangePassword />
            <AdminProtectedRoutes>
              <ChangePassword />
            </AdminProtectedRoutes>
          )
        }
      ]
    },
    {
        path: 'tickets',
        element: (
          <AdminProtectedRoutes>
            <TicketsManagement />
          </AdminProtectedRoutes>
        )
    },
    {
      path: 'users',
      element: (
        <AdminProtectedRoutes>
          <UsersManagement />
        </AdminProtectedRoutes>
      )
    },
    {
        path: 'dormitory',
        element: (
          <AdminProtectedRoutes>
            <MessageWrapper />
          </AdminProtectedRoutes>
        )
    },
    {
        path: 'logs',
        element: (
          <AdminProtectedRoutes>
            <MessageWrapper />
          </AdminProtectedRoutes>
        )
      },
    {
      path: 'dormitory',
      element: (
        <AdminProtectedRoutes>
          <Newsfeed />
        </AdminProtectedRoutes>
      )
    },
    {
      path: 'notification',
      element: (
        <AdminProtectedRoutes>
          <Notification />
        </AdminProtectedRoutes>
      )
    },
    {
      path: 'announcement',
      element: (<AdminProtectedRoutes>
                    <Announcement />
                </AdminProtectedRoutes>
                )
    },
    {
      path: 'feedback',
      element: (
                <AdminProtectedRoutes>
                    <Feedback />
                </AdminProtectedRoutes>
                )
                
    },
    {
        path: 'report',
        element: (<AdminProtectedRoutes>
                      <Announcement />
                  </AdminProtectedRoutes>
                  )
    },
    {
        path: 'newsfeed',
        element: (<AdminProtectedRoutes>
                      <Newsfeed />
                  </AdminProtectedRoutes>
                  )
    },
  ]
};

export default AdminRoutes;
