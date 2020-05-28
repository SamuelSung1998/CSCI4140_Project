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
    address: '/login',
    groups: [LOGGEDOUT],
    float: right,
  },
  {
    name: 'Chatroom',
    id: 'chat',
    address: '/chat',
    groups: [ADMIN, USER],
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
