import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

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
}

export const loginApi = ({ email, password }: LoginApiPayloadType): Observable<LoginResultType> => ajax({
  url: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'rxjs-custom-header': 'Rxjs',
  },
  body: {
    email,
    password,
  },
}).pipe(
  map((res) => {
    const { token, username, group }: { token: string, username: string, group: GroupType } = res.response.payload;
    return {
      result: SUCCESS as typeof SUCCESS,
      payload: {
        username,
        token,
        group,
      },
    };
  }),
  catchError((res) => {
    let error: LoginErrorType = '';
    if (res !== null && res !== undefined && 'response' in res
        && res.response !== null && res.response !== undefined && 'payload' in res.response) {
      error = res.response.payload.error;
    } else {
      error = 'network error';
    }
    console.log('login ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);
