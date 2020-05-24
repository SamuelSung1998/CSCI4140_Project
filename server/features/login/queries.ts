import Debug from 'debug';
import pool from '../../server/mariadb';

import {
  UsersType,
  USER,
  ADMIN,
  SUCCESS,
  FAILURE,
  FindUserByEmailResultType,
  FindUserByIdResultType,
  CreateUserResultType,
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

// FIXME Put it under the admin folder
export const createUser = async (user: Omit<UsersType, 'id'>): Promise<CreateUserResultType> => {
  // Checking before insertion
  if (user.username === '') {
    return {
      result: FAILURE,
      payload: {
        error: 'username cannot be empty',
      },
    };
  }

  if (user.group !== USER && user.group !== ADMIN) {
    return {
      result: FAILURE,
      payload: {
        error: 'invalid group',
      },
    };
  }

  if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
    return {
      result: FAILURE,
      payload: {
        error: 'invalid email',
      },
    };
  }

  try {
    const createUserSQL = `
      INSERT INTO Users (
        username,
        passwordHash,
        group,
        id,
        email,
        phone,
      ) VALUES (
        :username,
        :passwordHash,
        :group,
        UUID(),
        :email,
        :phone,
      );
    `;
    const result = await pool.query({ namedPlaceholders: true, sql: createUserSQL });
    debug(`Created User: ${result}`);
    return {
      result: SUCCESS,
      payload: {
        id: '', // FIXME see if result return the id
      },
    };
  } catch (err) {
    debug(`Create User Error: ${err}`);
    return {
      result: FAILURE,
      payload: {
        error: err,
      },
    };
  }
};

export const createUsersTable = async () => {
  const createUsersSQL = `
    CREATE TABLE Users (
      username VARCHAR(80)  NOT NULL,
      passwordHash CHAR(60) NOT NULL,
      group VARCHAR(10)     NOT NULL,
      id CHAR(36)           NOT NULL,
      email VARCHAR(70)     NOT NULL,
      phone VARCHAR(16),
      PRIMARY KEY id,
      UNIQUE (username),
      UNIQUE (phone),
      UNIQUE (email)
    );
  `;

  try {
    const result = await pool.query(createUsersSQL);
    debug(`Created Database "Users": ${result}`);
  } catch (err) {
    debug(`Create Database "Users" Error: ${err}`);
  }
};

export const deleteUsersTable = async () => {
  const deleteUsersSQL = `
    DROP TABLE Users;
  `;

  try {
    const result = await pool.query(deleteUsersSQL);
    debug(`Deleted Database "Users": ${result}`);
  } catch (err) {
    debug(`Delete Database "Users" Error: ${err}`);
  }
};

export const resetUsersTable = async () => {
  await deleteUsersTable();
  await createUsersTable();
};
