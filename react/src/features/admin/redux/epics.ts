import {
  ofType, Epic, StateObservable,
} from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../../app/redux/root-reducer';
import {
  usersListLoadReq,
  usersListLoadSuccess,
  usersListLoadFailure,
  userLoadReq,
  userLoadSuccess,
  userLoadFailure,
  userUpdateReq,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteReq,
} from './slice';
import {
  usersListLoadApi, userLoadApi, userUpdateApi, userCreateApi, userDeleteApi,
} from '../api';
import {
  SUCCESS, UserLoadReqPayloadType, UserUpdateReqPayloadType, UserDeleteReqPayloadType,
} from '../types';

export const usersListLoadEpic: Epic = (action$, state$: StateObservable<AppState>) => action$.pipe(
  ofType(usersListLoadReq),
  mergeMap(() => usersListLoadApi({ token: state$.value.login.token }).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        return of(usersListLoadSuccess(rtn.payload));
      }
      return of(usersListLoadFailure(rtn.payload));
    }),
  )),
);

export const userLoadEpic: Epic = (action$, state$: StateObservable<AppState>) => action$.pipe(
  ofType(userLoadReq),
  mergeMap((action: PayloadAction<UserLoadReqPayloadType>) => userLoadApi({ token: state$.value.login.token, id: action.payload.id }).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        return of(userLoadSuccess(rtn.payload));
      }
      return of(userLoadFailure(rtn.payload));
    }),
  )),
);

export const userUpdateEpic: Epic = (actions$, state$: StateObservable<AppState>) => actions$.pipe(
  ofType(userUpdateReq),
  mergeMap((action: PayloadAction<UserUpdateReqPayloadType>) => (
    action.payload.form.id !== ''
      ? userUpdateApi({ token: state$.value.login.token, id: action.payload.form.id, form: action.payload.form })
      : userCreateApi({ token: state$.value.login.token, form: action.payload.form })
  ).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        return of(userUpdateSuccess());
      }
      return of(userUpdateFailure(rtn.payload));
    }),
  )),
);

export const userDeleteEpic: Epic = (actions$, state$: StateObservable<AppState>) => actions$.pipe(
  ofType(userDeleteReq),
  mergeMap((action: PayloadAction<UserDeleteReqPayloadType>) => userDeleteApi({
    id: action.payload.id, token: state$.value.login.token,
  }).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        return of(userUpdateSuccess());
      }
      return of(userUpdateFailure(rtn.payload));
    }),
  )),
);
