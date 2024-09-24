// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconTicket, IconBell, IconCalendarClock, IconCirclePlus, IconListSearch, IconNews, IconMessage, IconThumbUp, IconHandFinger } from '@tabler/icons-react';

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
  IconThumbUp,
  IconHandFinger
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
          id: 'available-tickets',
          title: 'Available tickets',
          type: 'item',
          url: '/staff/tickets/available-tickets',
          icon: icons.IconListSearch,
          // target: true
        },
        {
          id: 'ticket-handling',
          title: 'Ticket Handling',
          type: 'item',
          url: '/staff/tickets/ticket-handling',
          icon: icons.IconHandFinger,
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
      url: '/staff/notification',
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
