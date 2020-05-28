import Debug from 'debug';

import { genSaltSync, hashSync } from 'bcryptjs';
import pool from './server/mariadb/index';

import {
  deleteChatsSQL,
  deleteTopicVotesSQL,
  deleteTopicOptionsSQL,
  deleteTopicsSQL,
  createTopicsSQL,
  createTopicOptionsSQL,
  createTopicVotesSQL,
  createChatsSQL,
} from './features/chat/queries';

import {
  deleteUsersSQL,
  createUsersSQL,
  createUserSQL,
} from './features/users/queries';

const debug = Debug('setup: database');

const admin = {
  username: 'admin',
  passwordHash: hashSync('admin123', genSaltSync(10)),
  group: 'admin',
  email: 'admin@email.com',
  phone: '+852 12345678',
};

const user = {
  username: 'andy',
  passwordHash: hashSync('andy123', genSaltSync(10)),
  group: 'user',
  email: 'andy@email.com',
  phone: '+852 87654321',
};

const initializeDatabase = async () => {
  try {
    await pool.query(deleteChatsSQL);
    await pool.query(deleteTopicVotesSQL);
    await pool.query(deleteTopicOptionsSQL);
    await pool.query(deleteTopicsSQL);
    await pool.query(deleteUsersSQL);
    await pool.query(createUsersSQL);
    await pool.query(createTopicsSQL);
    await pool.query(createTopicOptionsSQL);
    await pool.query(createTopicVotesSQL);
    await pool.query(createChatsSQL);
    await pool.query({ namedPlaceholders: true, sql: createUserSQL }, admin);
    await pool.query({ namedPlaceholders: true, sql: createUserSQL }, user);
    debug('Reset Databases Finished');
    process.exit();
  } catch (err) {
    debug(`Reset Databases Error: ${err}`);
  }
};

initializeDatabase();
