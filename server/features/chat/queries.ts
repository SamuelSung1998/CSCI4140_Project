import Debug from 'debug';

import pool from '../../server/mariadb';
import { ChatType, FAILURE, SUCCESS } from './types';

const debug = Debug('chats: queries');

export const createChatSQL = `
  INSERT INTO Chats (
    \`time\`,
    \`message\`,
    \`senderId\`,
    \`topicId\`
  ) VALUES (
    NOW(),
    :message,
    :senderId,
    :topicId
  );
`;

export const createTopicsSQL = `
  CREATE TABLE Topics (
    \`id\`         INT             NOT NULL AUTO_INCREMENT,
    \`title\`      VARCHAR(1000)   NOT NULL,
    \`message\`    VARCHAR(10000),
    \`postUserId\` CHAR(36)        NOT NULL,
    PRIMARY KEY (\`id\`),
    FOREIGN KEY (\`postUserId\`) REFERENCES Users(\`id\`) ON DELETE CASCADE
  );
`;


export const createTopicOptionsSQL = `
  CREATE TABLE TopicOptions (
    \`id\`         INT             NOT NULL AUTO_INCREMENT,
    \`topicId\`    INT             NOT NULL,
    \`value\`      VARCHAR(100)    NOT NULL,
    PRIMARY KEY (\`id\`),
    UNIQUE (\`topicId\`, \`value\`),
    FOREIGN KEY (\`topicId\`) REFERENCES Topics(\`id\`) ON DELETE CASCADE
  );
`;

export const createTopicVotesSQL = `
  CREATE TABLE TopicVotes (
    \`optionId\`   INT            NOT NULL,
    \`topicId\`    INT            NOT NULL,
    \`userId\`     CHAR(36)       NOT NULL,
    PRIMARY KEY (\`topicId\`, \`userId\`),
    FOREIGN KEY (\`topicId\`) REFERENCES Topics(\`id\`) ON DELETE CASCADE,
    FOREIGN KEY (\`userId\`) REFERENCES Users(\`id\`) ON DELETE CASCADE,
    FOREIGN KEY (\`optionId\`) REFERENCES TopicOptions(\`id\`) ON DELETE CASCADE
  );
`;

export const createChatsSQL = `
  CREATE TABLE Chats (
    \`id\`       INT            NOT NULL AUTO_INCREMENT,
    \`time\`     TIMESTAMP      NOT NULL,
    \`message\`  VARCHAR(10000) NOT NULL,
    \`senderId\` CHAR(36)       NOT NULL,
    \`topicId\`  INT,
    PRIMARY KEY (\`id\`),
    FOREIGN KEY (\`senderId\`) REFERENCES Users(\`id\`) ON DELETE CASCADE,
    FOREIGN KEY (\`topicId\`) REFERENCES Topics(\`id\`) ON DELETE CASCADE
  );
`;

export const deleteTopicsSQL = `
  DROP TABLE IF EXISTS Topics;
 `;
export const deleteTopicOptionsSQL = `
  DROP TABLE IF EXISTS TopicOptions;
 `;
export const deleteTopicVotesSQL = `
  DROP TABLE IF EXISTS TopicVotes;
 `;
export const deleteChatsSQL = `
  DROP TABLE IF EXISTS Chats;
 `;

export const createChat = async (chat: ChatType) => {
  try {
    const inputChat = { ...chat };
    if (!('topicId' in chat && chat.topicId !== undefined)) inputChat.topicId = null;
    const result = await pool.query({ namedPlaceholders: true, sql: createChatSQL }, inputChat);
    debug(`Created Chat: ${result}`);
    return {
      result: SUCCESS,
    };
  } catch (err) {
    debug(`Create Chat Error: ${err}`);
    return {
      result: FAILURE,
      payload: {
        error: 'sql error',
      },
    };
  }
};

export const createTopicsAndChatsTables = async () => {
  try {
    await pool.query(createTopicsSQL);
    await pool.query(createTopicOptionsSQL);
    await pool.query(createTopicVotesSQL);
    await pool.query(createChatsSQL);
    debug('Created Databases');
  } catch (err) {
    debug(`Create Databases Error: ${err}`);
  }
};


export const deleteTopicsAndChatsTables = async () => {
  try {
    await pool.query(deleteChatsSQL);
    await pool.query(deleteTopicVotesSQL);
    await pool.query(deleteTopicOptionsSQL);
    await pool.query(deleteTopicsSQL);

    debug('Deleted Databases');
  } catch (err) {
    debug(`Delete Database "Users" Error: ${err}`);
  }
};

export const resetTopicsAndChatsTables = async () => {
  try {
    await pool.query(deleteChatsSQL);
    await pool.query(deleteTopicVotesSQL);
    await pool.query(deleteTopicOptionsSQL);
    await pool.query(deleteTopicsSQL);
    await pool.query(createTopicsSQL);
    await pool.query(createTopicOptionsSQL);
    await pool.query(createTopicVotesSQL);
    await pool.query(createChatsSQL);
    debug('Reset Databases');
  } catch (err) {
    debug(`Reset Databases Error: ${err}`);
  }
};
