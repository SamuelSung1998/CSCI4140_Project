import { UsersType } from '../login/types';

// Settings Errors
export type SettingsErrorType = string;

// Status Keywords
export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCESS = 'success';
export const FAILURE = 'failure';

type StatusType = typeof IDLE | typeof LOADING | typeof SUCCESS | typeof FAILURE;

// UserInfoType Type
export type UserInfoType = Omit<UsersType, 'password'>;

export interface FormType extends UserInfoType {
  oldPassword: string;
  password: string;
  password2: string;
}

// Settings State Interface
export interface SettingsStateType {
  status: {
    load: StatusType;
    update: StatusType;
  }
  initialValues: FormType;
  errors: {
    load: SettingsErrorType[],
    update: SettingsErrorType[],
  }
}

// Settings State Interface
export interface SettingsLoadSuccessPayloadType {
  values: UserInfoType;
}

export interface SettingsLoadFailurePayloadType {
  errors: SettingsErrorType[],
}

export interface SettingsUpdateReqPayloadType {
  form: FormType
}

export interface SettingsUpdateFailurePayloadType {
  errors: SettingsErrorType[],
}
