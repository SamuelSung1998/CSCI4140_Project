// Group Constant
export const USER = 'user';
export const ADMIN = 'admin';
export const LOGGEDOUT = 'loggedout';

export type GroupType = typeof USER | typeof ADMIN | typeof LOGGEDOUT;

export const Groups: GroupType[] = [USER, ADMIN, LOGGEDOUT];

interface CommonUsersType {
  username: string;
  password: string;
  id: string;
  email: string;
  phone: string;
}

export interface UserType extends CommonUsersType {
  group: typeof USER;
}

export interface AdminType extends CommonUsersType {
  group: typeof ADMIN;
}

export type UsersType = UserType | AdminType;

// Login Errors
export type LoginErrorType = string;

// Status Keywords
export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCESS = 'success';
export const FAILURE = 'failure';

type StatusType = typeof IDLE | typeof LOADING | typeof SUCCESS | typeof FAILURE;

// Login State Interface
export interface LoginStateType {
  status: StatusType;
  username: string;
  group: GroupType;
  token: string;
  errors: LoginErrorType[];
}

export interface LoginReqPayloadType {
  email: string;
  password: string;
  group: GroupType;
  keepLogin: boolean;
}

export interface LoginSuccessPayloadType {
  username: string;
  token: string;
  group: GroupType;
}

export interface LoginFailPayloadType {
  errors: LoginErrorType[],
}
