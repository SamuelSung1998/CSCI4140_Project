import { ofType, Epic, StateObservable } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../../app/redux/root-reducer';
import {
  settingsLoadReq, settingsLoadSuccess, settingsLoadFailure, settingsUpdateReq, settingsUpdateSuccess, settingsUpdateFailure,
} from './slice';
import { settingsLoadApi, settingsUpdateApi } from '../api.mock';
import { SUCCESS, SettingsUpdateReqPayloadType } from '../types';

export const settingsLoadEpic: Epic = (actions$, state$: StateObservable<AppState>) => actions$.pipe(
  ofType(settingsLoadReq),
  mergeMap(() => settingsLoadApi({ token: state$.value.login.token }).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        return of(settingsLoadSuccess(rtn.payload));
      }
      return of(settingsLoadFailure(rtn.payload));
    }),
  )),
);

export const settingsUpdateEpic: Epic = (action$, state$: StateObservable<AppState>) => action$.pipe(
  ofType(settingsUpdateReq),
  mergeMap((action: PayloadAction<SettingsUpdateReqPayloadType>) => settingsUpdateApi({
    token: state$.value.login.token, form: action.payload.form,
  }).pipe(
    mergeMap((rtn) => {
      if (rtn.result === SUCCESS) {
        return of(settingsUpdateSuccess());
      }
      return of(settingsUpdateFailure(rtn.payload));
    }),
  )),
);
