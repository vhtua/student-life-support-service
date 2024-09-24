import { lazy } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

// project imports
import MainLayout from 'views/roles/student/layout/MainLayout';
import Loadable from 'views/roles/student/ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/roles/student/homepage')));
const StudentProfile = Loadable(lazy(() => import('views/roles/student/StudentProfile')));
const EditProfile = Loadable(lazy(() => import('views/roles/student/EditProfile')));
const ChangePassword = Loadable(lazy(() => import('views/roles/student/ChangePassword')));
const MyTickets = Loadable(lazy(() => import('views/roles/student/MyTickets')));
const CreateTicket = Loadable(lazy(() => import('views/roles/student/CreateTicket')));
const RateTicket = Loadable(lazy(() => import('views/roles/student/RateTicket')));
const Newsfeed = Loadable(lazy(() => import('views/roles/student/Newsfeed')));
const Message = Loadable(lazy(() => import('views/roles/student/Message')));
const Notification = Loadable(lazy(() => import('views/roles/student/Notification')));
const Announcement = Loadable(lazy(() => import('views/roles/student/Announcement')));
const Feedback = Loadable(lazy(() => import('views/roles/student/Feedback')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/roles/student/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/roles/student/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/roles/student/utilities/Shadow')));
const Logout = Loadable(lazy(() => import('views/utilities/Logout')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

import ProtectedRoutes from 'utils/ProtectedRoutes';
import { element } from 'prop-types';

// Component to handle passing conversation_id to Message component
const MessageWrapper = () => {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversation_id');
  return <Message conversation_id={conversationId} />;
};

// ==============================|| STUDENTS ROUTING ||============================== //

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
        // <DashboardDefault />
        <ProtectedRoutes role_name="Student">
            <DashboardDefault />
        </ProtectedRoutes>
      )
    },
    {
      path: 'profile',
      element: (
        // <Profile />
        <ProtectedRoutes role_name="Student">
          <StudentProfile />
        </ProtectedRoutes>
      )
    },
    {
      path: 'settings',
      children: [
        {
          path: 'edit-profile',
          element: (
            <ProtectedRoutes role_name="Student">
              <EditProfile />
            </ProtectedRoutes>
          )
        },
        {
          path: 'change-password',
          element: (
            <ProtectedRoutes role_name="Student">
              <ChangePassword />
            </ProtectedRoutes>
          )
        }
      ]
    },
    {
      path: 'tickets',
      children: [
        {
          path: 'my-tickets',
          element: (
            <ProtectedRoutes role_name="Student">
              <MyTickets />
            </ProtectedRoutes>
          )
        },
        {
          path: 'create-ticket',
          element: (
            <ProtectedRoutes role_name="Student">
              <CreateTicket />
            </ProtectedRoutes>
          )
        },
        {
          path: 'rate-ticket',
          element: (
            <ProtectedRoutes role_name="Student">
              <RateTicket />
            </ProtectedRoutes>
          )
        }
      ]
    },
    {
      path: 'message',
      element: (
        <ProtectedRoutes role_name="Student">
          <MessageWrapper />
        </ProtectedRoutes>
      )
    },
    {
      path: 'newsfeed',
      element: (
        <ProtectedRoutes role_name="Student">
          <Newsfeed />
        </ProtectedRoutes>
      )
    },
    {
      path: 'notification',
      element: (
        <ProtectedRoutes role_name="Student">
          <Notification />
        </ProtectedRoutes>
      )
    },
    {
      path: 'announcement',
      element: (
        <ProtectedRoutes role_name="Student">
          <Announcement />
        </ProtectedRoutes>
      )
    },
    {
      path: 'feedback',
      element: (
        <ProtectedRoutes role_name="Student">
          <Feedback />
        </ProtectedRoutes>
      )
    }
  ]
};

export default StudentRoutes;
