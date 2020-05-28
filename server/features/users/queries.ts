import Debug from 'debug';

import pool from '../../server/mariadb';
import {
  SUCCESS,
  FAILURE,
  USER,
  ADMIN,
  GetUsersListResultType,
  UpdateUserResultType,
  CreateUserResultType,
  DeleteUserByIdResultType,
} from './types';
import { UsersType } from '../login/types';

const debug = Debug('settings: queries');

export const createUserSQL = `
  INSERT INTO Users (
    \`username\`,
    \`passwordHash\`,
    \`group\`,
    \`id\`,
    \`email\`,
    \`phone\`
  ) VALUES (
    :username,
    :passwordHash,
    :group,
    UUID(),
    :email,
    :phone
  );
`;

export const createUsersSQL = `
  CREATE TABLE Users (
    \`id\` CHAR(36)           NOT NULL,
    \`username\` VARCHAR(80)  NOT NULL,
    \`passwordHash\` CHAR(60) NOT NULL,
    \`group\` VARCHAR(10)     NOT NULL,
    \`email\` VARCHAR(70)     NOT NULL,
    \`phone\` VARCHAR(16),
    PRIMARY KEY (\`id\`),
    UNIQUE (\`username\`),
    UNIQUE (\`phone\`),
    UNIQUE (\`email\`)
  );
`;

export const deleteUsersSQL = `
  DROP TABLE IF EXISTS Users;
`;

export const getUsersList = async (): Promise<GetUsersListResultType> => {
  try {
    const getUsersListSQL = 'SELECT * FROM Users';
    const users: UsersType[] = await pool.query(getUsersListSQL);

    debug(`Got Users List: ${users}`);

    return {
      result: SUCCESS,
      payload: {
        users,
      },
    };
  } catch (err) {
    debug(`Got Users List Error: ${err}`);
    return {
      result: FAILURE,
      payload: {
        error: err,
      },
    };
  }
};

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
      if (key in changes && changes[key] !== undefined && changes[key] !== null) {
        if (updateUserSetSQL === 'SET ') updateUserSetSQL = `${updateUserSetSQL} \`${key}\` = :${key}`;
        else updateUserSetSQL = `${updateUserSetSQL}, \`${key}\` = :${key}`;
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
        error: 'sql error',
      },
    };
  }
};

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
    const result = await pool.query({ namedPlaceholders: true, sql: createUserSQL }, user);
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
        error: 'sql error',
      },
    };
  }
};

export const deleteUesrById = async (id: string): Promise<DeleteUserByIdResultType> => {
  try {
    const deleteUesrByIdSQL = `
      DELETE FROM Users
      WHERE id = ?;
    `;

    const result = await pool.query(deleteUesrByIdSQL, [id]);
    debug(`Deleted User: ${result}`);
    return {
      result: SUCCESS,
    };
  } catch (err) {
    debug(`Delete User Error: ${err}`);
    return {
      result: FAILURE,
      payload: {
        error: 'sql error',
      },
    };
  }
};

export const createUsersTable = async () => {
  // CREATE TABLE Users (
  //   `id` CHAR(36)           NOT NULL,
  //   `username` VARCHAR(80)  NOT NULL,
  //   `passwordHash` CHAR(60) NOT NULL,
  //   `group` VARCHAR(10)     NOT NULL,
  //   `email` VARCHAR(70)     NOT NULL,
  //   `phone` VARCHAR(16),
  //   PRIMARY KEY (`id`),
  //   UNIQUE (`username`),
  //   UNIQUE (`phone`),
  //   UNIQUE (`email`)
  // );

  try {
    const result = await pool.query(createUsersSQL);
    debug(`Created Database "Users": ${result}`);
  } catch (err) {
    debug(`Create Database "Users" Error: ${err}`);
  }
};

export const deleteUsersTable = async () => {
  try {
    const result = await pool.query(deleteUsersSQL);
    debug(`Deleted Database "Users": ${result}`);
  } catch (err) {
    debug(`Delete Database "Users" Error: ${err}`);
  }
};
