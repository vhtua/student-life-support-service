import { lazy } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

// project imports
import MainLayout from 'views/roles/staff/layout/MainLayout';
import Loadable from 'views/roles/staff/ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/roles/staff/homepage')));
const StudentProfile = Loadable(lazy(() => import('views/roles/staff/StudentProfile')));
const EditProfile = Loadable(lazy(() => import('views/roles/staff/EditProfile')));
const ChangePassword = Loadable(lazy(() => import('views/roles/staff/ChangePassword')));
const MyTickets = Loadable(lazy(() => import('views/roles/staff/MyTickets')));
const CreateTicket = Loadable(lazy(() => import('views/roles/staff/CreateTicket')));
const RateTicket = Loadable(lazy(() => import('views/roles/staff/RateTicket')));
const Newsfeed = Loadable(lazy(() => import('views/roles/staff/Newsfeed')));
const Message = Loadable(lazy(() => import('views/roles/staff/Message')));
const Notification = Loadable(lazy(() => import('views/roles/staff/Notification')));
const Announcement = Loadable(lazy(() => import('views/roles/staff/Announcement')));
const Feedback = Loadable(lazy(() => import('views/roles/staff/Feedback')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/roles/student/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/roles/student/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/roles/student/utilities/Shadow')));
// const Logout = Loadable(lazy(() => import('views/utilities/Logout')));

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

const StaffRoutes = {
  path: '/staff/',
  element: (
    <ProtectedRoutes>
      <MainLayout />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: 'homepage',
      element: <DashboardDefault />
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
          element: <EditProfile />
        },
        {
          path: 'change-password',
          element: <ChangePassword />
        }
      ]
    },
    {
      path: 'tickets',
      children: [
        {
          path: 'my-tickets',
          element: <MyTickets />
        },
        {
          path: 'create-ticket',
          element: <CreateTicket />
        },
        {
          path: 'rate-ticket',
          element: <RateTicket />
        }
      ]
    },
    {
      path: 'message',
      element: <MessageWrapper />
    },
    {
      path: 'newsfeed',
      element: <Newsfeed />
    },
    {
      path: 'notification',
      element: <Notification />
    },
    {
      path: 'announcement',
      element: <Announcement />
    },
    {
      path: 'feedback',
      element: <Feedback />
    }
  ]
};

export default StaffRoutes;
