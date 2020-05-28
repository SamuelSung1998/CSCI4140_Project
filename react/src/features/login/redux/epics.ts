import { ofType, Epic } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import Cookies from 'universal-cookie';

import {
  loginReq, loginSuccess, loginFailure, recoverLoginReq, recoverLoginSuccess, recoverLoginFailure,
} from './slice';
import { LoginReqPayloadType, SUCCESS } from '../types';
// import { loginApi } from '../api.mock';
import { loginApi } from '../api';


export const loginEpic: Epic = (action$) => action$.pipe(
  ofType(loginReq),
  mergeMap((action: PayloadAction<LoginReqPayloadType>) => loginApi(action.payload).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        if (action.payload.keepLogin) {
          const cookie = new Cookies();
          const { username, group, token } = rtn.payload;
          cookie.set('username', username);
          cookie.set('group', group);
          cookie.set('token', token);
        }
        return of(loginSuccess(rtn.payload), push('/'));
      }
      return of(loginFailure(rtn.payload));
    }),
  )),
);

export const recoverLoginEpic: Epic = (action$) => action$.pipe(
  ofType(recoverLoginReq),
  mergeMap(() => {
    const cookie = new Cookies();
    const { username, token, group } = cookie.getAll();
    if (username !== '' && username !== undefined
        && token !== '' && token !== undefined
       && group !== '' && group !== undefined) {
      return of(recoverLoginSuccess({ username, token, group }));
    }

    return of(recoverLoginFailure());
  }),
);
