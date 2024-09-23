// assets
import { Icon } from '@mui/material';
import { IconSend } from '@tabler/icons-react';
// import { children } from 'public/landing/vendor/bootstrap-5.3.3/js/dist/dom/selector-engine';


// ==============================|| ACCOUNT MENU ITEMS ||============================== //

const feedback = {
  id: 'other',
  title: 'Other',
  // caption: 'Personal settings for the account',
  type: 'group',
  children: [
    {
      id: 'feedback',
      title: 'Feedback',
      type: 'item',
      url: '/student/feedback',
      icon: IconSend,
      breadcrumbs: true
    },
  ]
};

export default feedback;