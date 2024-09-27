// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconTicket, IconBell, IconCalendarClock, IconCirclePlus, IconListSearch, IconNews, IconMessage, IconThumbUp, IconHandFinger, IconHistory, IconUsers, IconBuilding, IconList, IconSend } from '@tabler/icons-react';

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
  IconHandFinger,
  IconHistory,
  IconUsers
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const management = {
  id: 'management',
  title: 'management',
  type: 'group',
  children: [
    {
        id: 'tickets',
        title: 'Tickets',
        type: 'item',
        url: '/admin/tickets',
        icon: icons.IconTicket,
        breadcrumbs: true
        // target: true
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/admin/users',
      icon: icons.IconUsers,
      breadcrumbs: true
      // target: true
    },
    {
      id: 'dormitory',
      title: 'Dormitory',
      type: 'item',
      url: '/admin/dormitory',
      icon: IconBuilding,
      breadcrumbs: true
    },
    {
      id: 'logs',
      title: 'Logs',
      type: 'item',
      url: '/admin/logs',
      icon: IconList,
      breadcrumbs: true
    },
    {
      id: 'feedback',
      title: 'Feedback',
      type: 'item',
      url: '/admin/feedback',
      icon: IconSend,
      breadcrumbs: true
    },
    {
      id: 'announcement',
      title: 'Announcement',
      type: 'item',
      url: '/admin/announcement',
      icon: icons.IconCalendarClock,
      breadcrumbs: true
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/admin/notification',
      icon: icons.IconBell,
      breadcrumbs: true
    },

  ]
};

export default management;
