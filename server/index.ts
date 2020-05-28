import express from 'express';
import Debug from 'debug';
import IO from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

import { serverPort } from './common/config';
import passport from './server/passport';

import loginRoute from './features/login/routes';
import usersRoute from './features/users/routes';
import chatIo from './features/chat/socketio';

const debug = Debug('index');

const app = express();
const server = http.createServer(app);
const io = IO(server);

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());

// Routes
app.use('/api/login', loginRoute);
app.use('/api/user', usersRoute);

app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (_, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

chatIo(io);


server.listen(serverPort, () => {
  debug(`Server started on port ${serverPort}`);
});
