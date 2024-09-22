// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconTicket, IconBell, IconCalendarClock, IconCirclePlus, IconListSearch, IconNews, IconMessage } from '@tabler/icons-react';

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
  IconMessage
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    // {
    //   id: 'util-typography',
    //   title: 'Typography',
    //   type: 'item',
    //   url: '/student/utils/util-typography',
    //   icon: icons.IconTypography,
    //   breadcrumbs: true
    // },
    // {
    //   id: 'util-color',
    //   title: 'Color',
    //   type: 'item',
    //   url: '/student/utils/util-color',
    //   icon: icons.IconPalette,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/student/utils/util-shadow',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
    {
      id: 'tickets',
      title: 'Tickets',
      type: 'collapse',
      // url: '/student/utils/util-shadow',
      icon: icons.IconTicket,
      children: [
        {
          id: 'my-tickets',
          title: 'My tickets',
          type: 'item',
          url: '/student/tickets/my-tickets',
          icon: icons.IconListSearch,
          // target: true
        },
        {
          id: 'create-ticket',
          title: 'Create a ticket',
          type: 'item',
          url: '/student/tickets/create-ticket',
          icon: icons.IconCirclePlus,
          // target: true
        },
        
      ]
    },
    {
      id: 'message',
      title: 'Message',
      type: 'item',
      url: '/student/message',
      icon: icons.IconMessage,
      // target: true
    },
    {
      id: 'newfeeds',
      title: 'Newsfeeds',
      type: 'item',
      url: '/student/newsfeeds',
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
      url: '/student/announcement',
      icon: icons.IconCalendarClock,
      breadcrumbs: true
    },
  ]
};

export default utilities;
