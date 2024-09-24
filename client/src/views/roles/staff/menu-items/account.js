// assets
import { IconUserCircle, IconSettings, IconKey, IconUserEdit, IconLogout } from '@tabler/icons-react';
// import { children } from 'public/landing/vendor/bootstrap-5.3.3/js/dist/dom/selector-engine';

// constant
const icons = { IconUserCircle, IconSettings, IconKey, IconUserEdit, IconLogout };

// ==============================|| ACCOUNT MENU ITEMS ||============================== //

const account = {
  id: 'account',
  title: 'Account',
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
          url: '/staff/settings/edit-profile',
          icon: icons.IconUserEdit,
          // target: true
        },
        {
          id: 'change-password',
          title: 'Change Password',
          type: 'item',
          url: '/staff/settings/change-password',
          icon: icons.IconKey,
          // target: true
        }
      ]
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: icons.IconLogout,
      breadcrumbs: true
    },
  ]
};

export default account;