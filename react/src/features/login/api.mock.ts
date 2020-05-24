import { Observable, of } from 'rxjs';
import userList from '../../api.mock/userList';

import {
  GroupType,
  SUCCESS,
  FAILURE,
  LoginSuccessPayloadType,
  LoginFailPayloadType,
  LoginErrorType,
} from './types';

interface LoginSuccessType {
  result: typeof SUCCESS;
  payload: LoginSuccessPayloadType;
}

interface LoginFailType {
  result: typeof FAILURE;
  payload: LoginFailPayloadType;
}

type LoginResultType = LoginSuccessType | LoginFailType;

interface LoginApiPayloadType {
  email: string;
  password: string;
  group: GroupType;
}

export const loginApi = ({ email, password, group }: LoginApiPayloadType): Observable<LoginResultType> => {
  const userinfo = userList.find((item) => item.email === email);
  if (userinfo === undefined) {
    return of({
      result: FAILURE,
      payload: {
        errors: ['wrong email'],
      },
    });
  }

  const errors: LoginErrorType[] = [];
  if (userinfo.group !== group) {
    errors.push('wrong group');
  }
  if (userinfo.password !== password) {
    errors.push('wrong password');
  }

  if (errors.length === 0) {
    return of({
      result: SUCCESS,
      payload: {
        username: userinfo.username,
        token: userinfo.token,
        group,
      },
    });
  }

  return of({
    result: FAILURE,
    payload: {
      errors,
    },
  });
};
