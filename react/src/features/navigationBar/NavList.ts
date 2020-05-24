import {
  GroupType, ADMIN, USER, LOGGEDOUT,
} from '../login/types';

export const right = 'right';
export const left = 'left';

interface SubtabType {
  name: string;
  id: string;
  address: string;
}

interface DropdownMenuType {
  name: string;
  id: string;
  groups: GroupType[];
  float: typeof right | typeof left;
  subtab: SubtabType[]
}

interface TabType {
  name: string;
  id: string;
  address: string;
  groups: GroupType[];
  float: typeof right | typeof left;
}

export type NavListType = (DropdownMenuType | TabType)[];

const NavList: NavListType = [
  {
    name: 'Login',
    id: 'login',
    groups: [LOGGEDOUT],
    float: right,
    subtab: [
      {
        name: 'User',
        id: 'login-user',
        address: '/login/user',
      },
      {
        name: 'Admin',
        id: 'login-admin',
        address: '/login/admin',
      },
    ],
  },
  {
    name: 'Applications',
    id: 'applications-student',
    groups: [USER],
    float: left,
    subtab: [
      {
        name: 'Available Applications',
        id: 'applications-student-available',
        address: '/applications/available',
      },
      {
        name: 'Saved Applications',
        id: 'applications-student-saved',
        address: '/applications/saved',
      },
      {
        name: 'Submitted',
        id: 'applications-student-submitted',
        address: '/applications/submitted',
      },
    ],
  },
  {
    name: 'Contact Admin',
    id: 'contact-student',
    address: '/contact',
    groups: [USER],
    float: left,
  },
  {
    name: 'Applications',
    id: 'applications-admin',
    groups: [ADMIN],
    float: left,
    subtab: [
      {
        name: 'Application List',
        id: 'applications-list',
        address: '/applications/admin-list',
      },
      {
        name: 'Dashboard',
        id: 'applications-admin-dashboard',
        address: '/applications/dashboard',
      },
    ],
  },
  {
    name: 'Contact Student',
    id: 'contact-admin',
    address: '/contact',
    groups: [ADMIN],
    float: left,
  },
  {
    name: 'Settings',
    id: 'settings',
    address: '/settings',
    groups: [ADMIN, USER],
    float: right,
  },
  {
    name: 'Admin',
    id: 'admin',
    address: '/admin',
    groups: [ADMIN],
    float: right,
  },
  {
    name: 'Logout',
    id: 'logout',
    address: '/logout',
    groups: [ADMIN, USER],
    float: right,
  },
];

export default NavList;
