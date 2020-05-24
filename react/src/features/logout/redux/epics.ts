import { ofType, Epic } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { push } from 'connected-react-router';
// import Cookies from 'universal-cookie';

import { logoutReq, logoutSuccess } from './slice';
import { logoutApi } from '../api.mock';

export const logoutEpic: Epic = (action$) => action$.pipe(
  ofType(logoutReq),
  mergeMap(() => logoutApi().pipe(
    mergeMap(() => {
      const tmp = 1;
      // FIXME add the process to clear the cookie function
      // FIXME add logout error handling
      return of(logoutSuccess(), push('/logout/success'));
    }),
  )),
);
