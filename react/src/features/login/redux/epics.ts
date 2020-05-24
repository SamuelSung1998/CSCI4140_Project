import { ofType, Epic } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
// import Cookies from 'universal-cookie';

import { loginReq, loginSuccess, loginFailure } from './slice';
import { LoginReqPayloadType, SUCCESS } from '../types';
import { loginApi } from '../api.mock';


export const loginEpic: Epic = (action$) => action$.pipe(
  ofType(loginReq),
  mergeMap((action: PayloadAction<LoginReqPayloadType>) => loginApi(action.payload).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        if (action.payload.keepLogin) {
          // FIXME add keep login to cookie
        }
        return of(loginSuccess(rtn.payload), push('/'));
      }
      return of(loginFailure(rtn.payload));
    }),
  )),
);
