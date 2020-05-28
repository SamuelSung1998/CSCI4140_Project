import { ofType, Epic, StateObservable } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PayloadAction } from '@reduxjs/toolkit';
import { connectionApi, sendMessageApi } from '../api';
import {
  connectionReq, newIncomeMessage, connectionSuccess, connectionDisconnected, sendMessageReq, sendMessageSuccess, sendMessageFailure,
} from './slice';
import {
  MESSAGE, SUCCESS, DISCONNECTED, SendMessagePayloadType,
} from '../types';
import { AppState } from '../../../app/redux/root-reducer';


export const connectionEpic: Epic = (action$) => action$.pipe(
  ofType(connectionReq),
  mergeMap(() => connectionApi().pipe(
    mergeMap((result) => {
      switch (result.result) {
        case (MESSAGE):
          return of(newIncomeMessage({ message: result.payload.message }));
        case (SUCCESS):
          return of(connectionSuccess({ socket: result.payload.socket }));
        case (DISCONNECTED):
          return of(connectionDisconnected());
        default: return of();
      }
    }),
  )),
);

export const sendmessageEpic: Epic = (action$, state$: StateObservable<AppState>) => action$.pipe(
  ofType(sendMessageReq),
  mergeMap((action: PayloadAction<SendMessagePayloadType>) => {
    const { socket } = state$.value.chat;
    const { username } = state$.value.login;
    const { value } = action.payload;

    if (socket === null) return of();
    return sendMessageApi({ socket, value, username }).pipe(
      mergeMap((result) => {
        if (result.result === SUCCESS) {
          return of(sendMessageSuccess());
        }
        return of(sendMessageFailure(result.payload));
      }),
    );
  }),
);
