// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconTicket, IconBell, IconCalendarClock, IconCirclePlus, IconListSearch, IconNews, IconMessage, IconThumbUp } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconTicket,
  IconBell,
  IconCalendarClock,
  IconCirclePlus,
  IconListSearch,
  IconNews,
  IconMessage,
  IconThumbUp
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'tickets',
      title: 'Tickets',
      type: 'collapse',
      icon: icons.IconTicket,
      children: [
        {
          id: 'my-tickets',
          title: 'My tickets',
          type: 'item',
          url: '/staff/tickets/my-tickets',
          icon: icons.IconListSearch,
          // target: true
        },
        {
          id: 'create-ticket',
          title: 'Create a ticket',
          type: 'item',
          url: '/staff/tickets/create-ticket',
          icon: icons.IconCirclePlus,
          // target: true
        },
        {
          id: 'rate-ticket',
          title: 'Rate tickets',
          type: 'item',
          url: '/staff/tickets/rate-ticket',
          icon: icons.IconThumbUp,
          // target: true
        },
        
      ]
    },
    {
      id: 'message',
      title: 'Message',
      type: 'item',
      url: '/staff/message',
      icon: icons.IconMessage,
      // target: true
    },
    {
      id: 'newfeed',
      title: 'Newsfeed',
      type: 'item',
      url: '/staff/newsfeed',
      icon: icons.IconNews,
      breadcrumbs: true
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/student/notification',
      icon: icons.IconBell,
      breadcrumbs: true
    },
    {
      id: 'announcement',
      title: 'Announcement',
      type: 'item',
      url: '/staff/announcement',
      icon: icons.IconCalendarClock,
      breadcrumbs: true
    },
  ]
};

export default utilities;
