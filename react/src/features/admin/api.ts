import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import {
  SUCCESS,
  FAILURE,
  FormType,
  UsersListLoadSuccessPayloadType,
  UsersListLoadFailurePayloadType,
  BriefUserInfo,
  UserInfoType,
  UserLoadSuccessPayloadType,
  UserLoadFailurePayloadType,
  UserUpdateFailurePayloadType,
  UserCreateFailurePayloadType,
  UserDeleteFailurePayloadType,
} from './types';

interface UsersListLoadSuccessType {
  result: typeof SUCCESS;
  payload: UsersListLoadSuccessPayloadType;
}

interface UsersListLoadFailureType {
  result: typeof FAILURE;
  payload: UsersListLoadFailurePayloadType;
}

export type UsersListLoadResultType = UsersListLoadSuccessType | UsersListLoadFailureType;

export const usersListLoadApi = ({ token }: { token: string }): Observable<UsersListLoadResultType> => ajax({
  url: '/api/user/list',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    'rxjs-custom-header': 'Rxjs',
  },
}).pipe(
  map((res) => {
    const list: BriefUserInfo[] = res.response.payload.users;
    return {
      result: SUCCESS as typeof SUCCESS,
      payload: {
        list,
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
    console.log('users list load ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);

interface UserLoadSuccessType {
  result: typeof SUCCESS;
  payload: UserLoadSuccessPayloadType;
}

interface UserLoadFailureType {
  result: typeof FAILURE;
  payload: UserLoadFailurePayloadType;
}

export type UserLoadResultType = UserLoadSuccessType | UserLoadFailureType;

export const userLoadApi = ({ token, id: targetId }: { token: string, id: string }): Observable<UserLoadResultType> => ajax({
  url: `/api/user/by-id/${targetId}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    'rxjs-custom-header': 'Rxjs',
  },
}).pipe(
  map((res) => {
    const {
      id: userId, email, group, username, phone,
    }: UserInfoType = res.response.payload.user;

    return {
      result: SUCCESS as typeof SUCCESS,
      payload: {
        value: {
          id: userId,
          email,
          group,
          username,
          phone,
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
    console.log('user load ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);

interface UserUpdateSuccessType {
  result: typeof SUCCESS;
}

interface UserUpdateFailureType {
  result: typeof FAILURE;
  payload: UserUpdateFailurePayloadType;
}

type UserUpdateResultType = UserUpdateSuccessType | UserUpdateFailureType;

export const userUpdateApi = ({
  id: targetId, token, form,
}: {
  id: string, token: string, form: FormType
}): Observable<UserUpdateResultType> => ajax({
  url: `/api/user/by-id/${targetId}`,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    'rxjs-custom-header': 'Rxjs',
  },
  body: form,
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
    console.log('user update ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);

interface UserCreateSuccessType {
  result: typeof SUCCESS;
}

interface UserCreateFailureType {
  result: typeof FAILURE;
  payload: UserCreateFailurePayloadType;
}

type UserCreateResultType = UserCreateSuccessType | UserCreateFailureType;

export const userCreateApi = ({
  token, form,
}: {
  token: string, form: FormType
}): Observable<UserCreateResultType> => ajax({
  url: '/api/user',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    'rxjs-custom-header': 'Rxjs',
  },
  body: form,
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
    console.log('user update ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);

interface UserDeleteSuccessType {
  result: typeof SUCCESS;
}

interface UserDeleteFailureType {
  result: typeof FAILURE;
  payload: UserDeleteFailurePayloadType;
}

type UserDeleteResultType = UserDeleteSuccessType | UserDeleteFailureType;

export const userDeleteApi = ({ token, id }: { token: string, id: string }): Observable<UserDeleteResultType> => ajax({
  url: `/api/user/by-id/${id}`,
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    'rxjs-custom-header': 'Rxjs',
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
    console.log('user update ajax error: ', res); // eslint-disable-line no-console
    return of({
      result: FAILURE as typeof FAILURE,
      payload: {
        errors: [error],
      },
    });
  }),
);
