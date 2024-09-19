// assets
import { IconHome, IconUserCircle } from '@tabler/icons-react';

// constant
const icons = { IconHome, IconUserCircle };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const homepage = {
  id: 'home',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'homepage',
      title: 'Homepage',
      type: 'item',
      url: '/student/homepage',
      icon: icons.IconHome,
      breadcrumbs: true
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/student/profile',
      icon: icons.IconUserCircle,
      breadcrumbs: true
    }
  ]
};

export default homepage;
