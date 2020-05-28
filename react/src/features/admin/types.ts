import { UsersType } from '../login/types';

// Admin Errors
export type AdminErrorType = string;

// Status Keywords
export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCESS = 'success';
export const FAILURE = 'failure';

type StatusType = typeof IDLE | typeof LOADING | typeof SUCCESS | typeof FAILURE;

// UserInfoType Type
export type UserInfoType = Omit<UsersType, 'password'>;

// BriefUserInfo Type
export type BriefUserInfo = Pick<UsersType, 'username' | 'group' | 'id' | 'email'>;

export interface FormType extends UserInfoType {
  password: string;
  password2: string;
}

// Admin State Interface
export interface AdminStateType {
  status: {
    usersListLoad: StatusType;
    userLoad: StatusType;
    userUpdate: StatusType;
  }
  usersList: BriefUserInfo[];
  initialValues: FormType;
  errors: {
    usersListLoad: AdminErrorType[];
    userLoad: AdminErrorType[];
    userUpdate: AdminErrorType[];
  }
}

export interface UsersListLoadSuccessPayloadType {
  list: BriefUserInfo[];
}

export interface UsersListLoadFailurePayloadType {
  errors: AdminErrorType[];
}

export interface UserLoadReqPayloadType {
  id: string;
}

export interface UserLoadSuccessPayloadType {
  value: UserInfoType;
}

export interface UserLoadFailurePayloadType {
  errors: AdminErrorType[];
}

export interface UserUpdateReqPayloadType {
  form: FormType;
}

export interface UserUpdateFailurePayloadType {
  errors: AdminErrorType[];
}

export interface UserDeleteReqPayloadType {
  id: string;
}

export interface UserDeleteFailurePayloadType {
  errors: AdminErrorType[];
}

export interface UserCreateReqPayloadType {
  form: FormType;
}

export interface UserCreateFailurePayloadType {
  errors: AdminErrorType[];
}
