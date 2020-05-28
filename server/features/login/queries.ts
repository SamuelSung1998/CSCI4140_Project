import Debug from 'debug';
import pool from '../../server/mariadb';

import {
  UsersType,
  SUCCESS,
  FAILURE,
  FindUserByEmailResultType,
  FindUserByIdResultType,
} from './types';

const debug = Debug('login: queries');

export const findUserByEmail = async (email: string): Promise<FindUserByEmailResultType> => {
  try {
    const findUserSQL = 'SELECT * FROM Users WHERE email = ?';
    const users: UsersType[] = await pool.query(findUserSQL, [email]);

    if (users.length === 0) {
      return {
        result: FAILURE,
        payload: {
          error: 'no such user',
        },
      };
    }

    const user = users[0];
    debug(`Found User By Id: ${user}`);

    return {
      result: SUCCESS,
      payload: {
        user,
      },
    };
  } catch (err) {
    debug(`Find User By Id Error: ${err}`);
    return {
      result: FAILURE,
      payload: {
        error: err,
      },
    };
  }
};

export const findUserById = async (id: string): Promise<FindUserByIdResultType> => {
  try {
    const findUserSQL = 'SELECT * FROM Users WHERE id = ?';
    const users: UsersType[] = await pool.query(findUserSQL, [id]);

    if (users.length === 0) {
      return {
        result: FAILURE,
        payload: {
          error: 'no such user',
        },
      };
    }

    const user = users[0];
    debug(`Found User By Id: ${user}`);

    return {
      result: SUCCESS,
      payload: {
        user,
      },
    };
  } catch (err) {
    debug(`Find User By Id Error: ${err}`);
    return {
      result: FAILURE,
      payload: {
        error: err,
      },
    };
  }
};

