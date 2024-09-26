// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconTicket, IconBell, IconCalendarClock, IconCirclePlus, IconListSearch, IconNews, IconMessage, IconThumbUp, IconHandFinger, IconHistory,IconChartInfographic } from '@tabler/icons-react';

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
  IconHistory
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'report',
      title: 'Report',
      type: 'item',
      url: '/admin/report',
      icon: IconChartInfographic,
      breadcrumbs: true
      // target: true
    },
    {
      id: 'newfeed',
      title: 'Newsfeed',
      type: 'item',
      url: '/admin/newsfeed',
      icon: icons.IconNews,
      breadcrumbs: true
    },
  ]
};

export default utilities;
