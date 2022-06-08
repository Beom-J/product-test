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
  iconClosed?: string;
  iconOpened?: string;
  subNav?: SubNavType[];
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
    icon: 'DashboardIcon'
  },
  {
    title: 'Product',
    path: '/product',
    icon: 'DashboardIcon',
    subNav: [
      {
        title: 'sub1',
        path: '/product/sub1',
        icon: 'PeopleIcon'
      },
      {
        title: 'sub2',
        path: '/product/sub2',
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
