import IO from 'socket.io';

import Debug from 'debug';

const debug = Debug('chat: socketio');

const chatIo = (io: IO.Server) => {
  io.of('/socketio/chat').on('connect', (socket) => {
    socket.on('chatMessage', (msg: {message: string, username: string}) => {
      debug(`message: ${msg.username}: ${msg.message}`);
      const now = Date();
      socket.broadcast.emit('chatMessage', msg);
      socket.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
      debug(`user disconnected: ${socket.id}`);
    });
  });
};

export default chatIo;
