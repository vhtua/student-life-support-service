import { lazy } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

// project imports
import MainLayout from 'views/roles/staff/layout/MainLayout';
import Loadable from 'views/roles/staff/ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/roles/staff/homepage')));
const Profile = Loadable(lazy(() => import('views/roles/staff/Profile')));
const EditProfile = Loadable(lazy(() => import('views/roles/staff/EditProfile')));
const ChangePassword = Loadable(lazy(() => import('views/roles/staff/ChangePassword')));
const AvailableTickets = Loadable(lazy(() => import('views/roles/staff/AvailableTickets')));
const CreateTicket = Loadable(lazy(() => import('views/roles/staff/CreateTicket')));
const RateTicket = Loadable(lazy(() => import('views/roles/staff/RateTicket')));
const Newsfeed = Loadable(lazy(() => import('views/roles/staff/Newsfeed')));
const Message = Loadable(lazy(() => import('views/roles/staff/Message')));
const Notification = Loadable(lazy(() => import('views/roles/staff/Notification')));
const Announcement = Loadable(lazy(() => import('views/roles/staff/Announcement')));
const Feedback = Loadable(lazy(() => import('views/roles/staff/Feedback')));
const TicketsHandling = Loadable(lazy(() => import('views/roles/staff/TicketsHandling')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/roles/student/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/roles/student/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/roles/student/utilities/Shadow')));
// const Logout = Loadable(lazy(() => import('views/utilities/Logout')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

import StaffProtectedRoutes from 'utils/StaffProtectedRoutes';
import { element } from 'prop-types';

// Component to handle passing conversation_id to Message component
const MessageWrapper = () => {
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get('conversation_id');
    return <Message conversation_id={conversationId ? parseInt(conversationId) : 0} />;
};

// ==============================|| STUDENTS ROUTING ||============================== //


const StaffRoutes = {
  path: '/staff/',
  element: (
    <StaffProtectedRoutes>
      <MainLayout />
    </StaffProtectedRoutes>
  ),
  children: [
    {
      path: 'homepage',
      element: (
        // <DashboardDefault />
        <StaffProtectedRoutes>
            <DashboardDefault />
        </StaffProtectedRoutes>
        )
    },
    {
      path: 'profile',
      element: (
        // <Profile />
        <StaffProtectedRoutes>
          <Profile />
        </StaffProtectedRoutes>
      )
    },
    {
      path: 'settings',
      children: [
        {
          path: 'edit-profile',
          element: (
            // <EditProfile />
            <StaffProtectedRoutes>
              <EditProfile />
            </StaffProtectedRoutes>
          )
        },
        {
          path: 'change-password',
          element: (
            // <ChangePassword />
            <StaffProtectedRoutes>
              <ChangePassword />
            </StaffProtectedRoutes>
          )
        }
      ]
    },
    {
      path: 'tickets',
      children: [
        {
          path: 'available-tickets',
          element: (
            // <AvailableTickets />
            <StaffProtectedRoutes>
              <AvailableTickets />
            </StaffProtectedRoutes>
          )
        },
        {
          path: 'tickets-handling',
          element: (
            // <CreateTicket />
            <StaffProtectedRoutes>
              <TicketsHandling /> 
            </StaffProtectedRoutes>
          )
        },
        {
          path: 'rate-ticket',
          element: (
            // <RateTicket />
            <StaffProtectedRoutes>
              <RateTicket />
            </StaffProtectedRoutes>
          )
        }
      ]
    },
    {
      path: 'message',
      element: (
        <StaffProtectedRoutes>
          <MessageWrapper />
        </StaffProtectedRoutes>
      )
    },
    {
      path: 'newsfeed',
      element: (
        <StaffProtectedRoutes>
          <Newsfeed />
        </StaffProtectedRoutes>
      )
    },
    {
      path: 'notification',
      element: (
        <StaffProtectedRoutes>
          <Notification />
        </StaffProtectedRoutes>
      )
    },
    {
      path: 'announcement',
      element: (<StaffProtectedRoutes>
                    <Announcement />
                </StaffProtectedRoutes>
                )
    },
    {
      path: 'feedback',
      element: (
                <StaffProtectedRoutes>
                    <Feedback />
                </StaffProtectedRoutes>
                )
                
    }
  ]
};

export default StaffRoutes;
