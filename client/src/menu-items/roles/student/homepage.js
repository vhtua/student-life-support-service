// assets
import { IconHome } from '@tabler/icons-react';

// constant
const icons = { IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const homepage = {
  id: 'homepage',
  title: 'Homepage',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Homepage',
      type: 'item',
      url: '/student/homepage',
      icon: icons.IconHome,
      breadcrumbs: false
    }
  ]
};

export default homepage;
