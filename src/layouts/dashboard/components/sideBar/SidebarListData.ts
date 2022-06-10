import DashboardIcon from '@mui/icons-material/DashboardRounded';
import PeopleIcon from '@mui/icons-material/People';

export const SidebarIcons = {
  DashboardIcon,
  PeopleIcon
};

export interface SidebarListType {
  title: string;
  path: string;
  icon: keyof typeof SidebarIcons;
  subNav: SubNavType[];
}

interface SubNavType {
  title: string;
  path: string;
  icon: keyof typeof SidebarIcons;
}

// TODO 이건 route 폴더에 넣어야하나?????
export const SidebarListData: SidebarListType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'DashboardIcon',
    subNav: []
  },
  {
    title: 'Product',
    path: '/product',
    icon: 'DashboardIcon',
    subNav: [
      {
        title: 'add',
        path: '/product/add',
        icon: 'PeopleIcon'
      },
      {
        title: 'edit',
        path: '/product/edit',
        icon: 'PeopleIcon'
      }
    ]
  },
  {
    title: 'other',
    path: '/other',
    icon: 'DashboardIcon',
    subNav: [
      {
        title: 'sub1',
        path: '/other/sub1',
        icon: 'PeopleIcon'
      },
      {
        title: 'sub2',
        path: '/other/sub2',
        icon: 'PeopleIcon'
      }
    ]
  }
];
