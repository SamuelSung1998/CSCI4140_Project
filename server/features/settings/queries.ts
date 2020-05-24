import Debug from 'debug';

import pool from '../../server/mariadb';
import {
  SUCCESS,
  FAILURE,
  UpdateUserResultType,
} from './types';
import { UsersType } from '../login/types';

const debug = Debug('settings: queries');

export const updateUser = async (id: string, changes: Partial<UsersType>): Promise<UpdateUserResultType> => {
  if (Object.keys(changes).length === 0) {
    debug('Update User with 0 arguement');
    return {
      result: SUCCESS,
    };
  }

  try {
    let updateUserSetSQL = 'SET ';
    (<Array<keyof UsersType>> ['username', 'passwordHash', 'group', 'email', 'phone']).forEach((key) => {
      if (key in changes && changes[key]) {
        if (updateUserSetSQL === 'SET ') updateUserSetSQL = `${updateUserSetSQL} ${key} = :${key}`;
        else updateUserSetSQL = `${updateUserSetSQL}, ${key} = :${key}`;
      }
    });

    const updateUserSQL = `
      UPDATE Users
      ${updateUserSetSQL}
      WHERE id = :id;
    `;

    const result = await pool.query({ namedPlaceholders: true, sql: updateUserSQL }, {
      ...changes,
      id,
    });

    debug(`Update User: ${result}`);

    return {
      result: SUCCESS,
    };
  } catch (err) {
    debug(`Update User Error: ${err}`);
    return {
      result: FAILURE,
      payload: {
        error: err,
      },
    };
  }
};
