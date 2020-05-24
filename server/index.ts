import express from 'express';
import Debug from 'debug';
import IO from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';

import { serverPort } from './common/config';
import passport from './server/passport';

import loginRoute from './features/login/routes';
import settingsRoute from './features/settings/routes';

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
app.use('/api/settings', settingsRoute);

app.get('/', (_, res) => {
  res.send('express server');
});

app.get('/');

io.on('connection', (socket) => {
  debug('User connected');

  socket.on('message', (msg: {message: string, username: string}) => {
    debug(`message: ${msg.username}: ${msg.message}`);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    debug('user disconnected');
  });
});

server.listen(serverPort, () => {
  debug(`Server started on port ${serverPort}`);
});
