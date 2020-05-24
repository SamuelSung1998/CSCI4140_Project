import Debug from 'debug';
import mariadb from 'mariadb';

import { db as dbconfig } from '../../common/config';

const debug = Debug('Mariadb');

const pool = mariadb.createPool(dbconfig);

pool.on('acquire', (acqu) => {
  debug(`Acquire: ${acqu}`);
});

pool.on('connection', (conn) => {
  debug(`Connection: ${conn}`);
});

pool.on('enqueue', () => {
  debug('Enqueue');
});

pool.on('release', (rele) => {
  debug(`Release: ${rele}`);
});

export default pool;
