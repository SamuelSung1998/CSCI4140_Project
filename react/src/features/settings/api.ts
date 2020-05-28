import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import {
  SUCCESS,
  FAILURE,
  FormType,
  SettingsLoadSuccessPayloadType,
  SettingsLoadFailurePayloadType,
  SettingsUpdateFailurePayloadType,
  UserInfoType,
} from './types';

interface SettingsLoadSuccessType {
  result: typeof SUCCESS;
  payload: SettingsLoadSuccessPayloadType;
}

interface SettingsLoadFailureType {
  result: typeof FAILURE;
  payload: SettingsLoadFailurePayloadType;
}

type SettingsLoadResultType = SettingsLoadSuccessType | SettingsLoadFailureType;

export const settingsLoadApi = ({ token }: { token: string }): Observable<SettingsLoadResultType> => ajax({
  url: '/api/user',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    'rxjs-custom-header': 'Rxjs',
  },
}).pipe(
  map((res) => {
    const {
      id, email, group, username, phone,
    }: UserInfoType = res.response.payload.user;

    return {
      result: SUCCESS as typeof SUCCESS,
      payload: {
        values: {
          id, email, group, username, phone,
        },
      },
    };
  }),
  catchError((res) => {
    let error: string = '';
    if (res !== null && res !== undefined && 'response' in res
        && res.response !== null && res.response !== undefined && 'payload' in res.response) {
      error = res.response.payload.error;
    } else {
      error = 'network error';
    }
    console.log('settings load ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);

interface SettingsUpdateSuccessType {
  result: typeof SUCCESS;
}

interface SettingsUpdateFailureType {
  result: typeof FAILURE;
  payload: SettingsUpdateFailurePayloadType;
}

type SettingsUpdateResultType = SettingsUpdateSuccessType | SettingsUpdateFailureType;

export const settingsUpdateApi = ({ token, form }: { token: string, form: FormType}): Observable<SettingsUpdateResultType> => ajax({
  url: '/api/user',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    'rxjs-custom-header': 'Rxjs',
  },
  body: {
    form,
  },
}).pipe(
  map(() => ({
    result: SUCCESS as typeof SUCCESS,
  })),
  catchError((res) => {
    let error: string = '';
    if (res !== null && res !== undefined && 'response' in res
        && res.response !== null && res.response !== undefined && 'payload' in res.response) {
      error = res.response.payload.error;
    } else {
      error = 'network error';
    }
    console.log('settings update ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);
