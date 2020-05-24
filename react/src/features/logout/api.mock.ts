import { Observable, of } from 'rxjs';

import { SUCCESS } from './types';

interface LogoutSuccessType {
  result: typeof SUCCESS;
}

type LogoutResultType = LogoutSuccessType;

export const logoutApi = (): Observable<LogoutResultType> => of({
  result: SUCCESS,
});
