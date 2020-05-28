import { ofType, Epic } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { push } from 'connected-react-router';
import Cookies from 'universal-cookie';

import { logoutReq, logoutSuccess } from './slice';
import { logoutApi } from '../api.mock';

export const logoutEpic: Epic = (action$) => action$.pipe(
  ofType(logoutReq),
  mergeMap(() => logoutApi().pipe(
    mergeMap(() => {
      const cookie = new Cookies();
      cookie.remove('username');
      cookie.remove('group');
      cookie.remove('token');
      return of(logoutSuccess(), push('/logout/success'));
    }),
  )),
);

