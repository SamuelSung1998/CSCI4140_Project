import { Observable, of } from 'rxjs';
import userList from '../../api.mock/userList';

import {
  SUCCESS,
  FAILURE,
  FormType,
  SettingsLoadSuccessPayloadType,
  SettingsLoadFailurePayloadType,
  SettingsUpdateFailurePayloadType,
} from './types';
import { ADMIN, USER } from '../login/types';

interface SettingsLoadSuccessType {
  result: typeof SUCCESS;
  payload: SettingsLoadSuccessPayloadType;
}

interface SettingsLoadFailureType {
  result: typeof FAILURE;
  payload: SettingsLoadFailurePayloadType;
}

type SettingsLoadResultType = SettingsLoadSuccessType | SettingsLoadFailureType;

export const settingsLoadApi = ({ token }: { token: string }): Observable<SettingsLoadResultType> => {
  const userinfo = userList.find((item) => item.token === token);
  if (userinfo === undefined) {
    return of({
      result: FAILURE,
      payload: {
        errors: ['invalid token'],
      },
    });
  }

  const {
    id, email, group, username, phone,
  } = userinfo;

  return of({
    result: SUCCESS,
    payload: {
      values: {
        id,
        email,
        group,
        username,
        phone,
      },
    },
  });
};

interface SettingsUpdateSuccessType {
  result: typeof SUCCESS;
}

interface SettingsUpdateFailureType {
  result: typeof FAILURE;
  payload: SettingsUpdateFailurePayloadType;
}

type SettingsUpdateResultType = SettingsUpdateSuccessType | SettingsUpdateFailureType;

export const settingsUpdateApi = ({ token, form }: { token: string, form: FormType}): Observable<SettingsUpdateResultType> => {
  const index = userList.findIndex((item) => item.token === token);
  if (index === -1) {
    return of({
      result: FAILURE,
      payload: {
        errors: ['invalid token'],
      },
    });
  }

  if (userList[index].password !== form.oldPassword) {
    return of({
      result: FAILURE,
      payload: {
        errors: ['wrong password'],
      },
    });
  }

  if (userList[index].group !== ADMIN && userList[index].group !== form.group) {
    return of({
      result: FAILURE,
      payload: {
        errors: ['no permission to change group'],
      },
    });
  }

  switch (form.group) {
    case (ADMIN): {
      userList[index] = {
        group: ADMIN,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password === '' ? userList[index].password : form.password,
        id: userList[index].id,
        token: userList[index].token,
      };
      break;
    }
    case (USER): {
      userList[index] = {
        group: USER,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password === '' ? userList[index].password : form.password,
        id: userList[index].id,
        token: userList[index].token,
      };
      break;
    }
    default: return of({
      result: FAILURE,
      payload: {
        errors: ['invalid group'],
      },
    });
  }

  return of({
    result: SUCCESS,
  });
};
