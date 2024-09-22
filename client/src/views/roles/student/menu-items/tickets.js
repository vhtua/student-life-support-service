// assets
import { IconUserCircle, IconSettings, IconKey, IconUserEdit } from '@tabler/icons-react';
// import { children } from 'public/landing/vendor/bootstrap-5.3.3/js/dist/dom/selector-engine';

// constant
const icons = { IconUserCircle, IconSettings, IconKey, IconUserEdit };

// ==============================|| ACCOUNT MENU ITEMS ||============================== //

const tickets = {
  id: 'tickets',
  title: 'Tickets',
  // caption: 'Personal settings for the account',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'collapse',
      icon: icons.IconSettings,

      children: [
        {
          id: 'edit-profile',
          title: 'Edit Profile',
          type: 'item',
          url: '/student/settings/edit-profile',
          icon: icons.IconUserEdit,
          // target: true
        },
        {
          id: 'change-password',
          title: 'Change Password',
          type: 'item',
          url: '/student/settings/change-password',
          icon: icons.IconKey,
          // target: true
        }
      ]
    }
  ]
};

export default tickets;