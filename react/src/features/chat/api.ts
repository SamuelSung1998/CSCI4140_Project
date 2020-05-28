import {
  Observable, fromEvent, merge, of,
} from 'rxjs';
import { map } from 'rxjs/operators';
import socketio, { Socket } from 'socket.io-client';

import {
  MESSAGE, DISCONNECTED, SUCCESS, FAILURE, NewIncomeMessagePayloadType,
} from './types';

const endpoint = '/socketio/chat';

interface IncomeMessageType {
  result: typeof MESSAGE;
  payload: NewIncomeMessagePayloadType;
}

interface ConnectionSuccessType {
  result: typeof SUCCESS;
  payload: {
    socket: typeof Socket;
  }
}

interface ConnectionFailureType {
  result: typeof FAILURE;
  payload: {
    errors: string[];
  }
}

interface DisconnectionType {
  result: typeof DISCONNECTED;
}

type ConnectionResultType = IncomeMessageType | ConnectionSuccessType | ConnectionFailureType | DisconnectionType;

export const connectionApi = (): Observable<ConnectionResultType> => {
  const socket = socketio(endpoint);
  return merge(
    fromEvent<{ time: string, message: string, username: string }>(socket, 'chatMessage').pipe(
      map(({ time, message, username }) => ({
        result: MESSAGE as typeof MESSAGE,
        payload: {
          message: {
            username,
            value: message,
            time,
          },
        },
      })),
    ),
    fromEvent(socket, 'connect').pipe(
      map(() => ({
        result: SUCCESS as typeof SUCCESS,
        payload: {
          socket,
        },
      })),
    ),
    fromEvent(socket, 'disconnect').pipe(
      map(() => ({
        result: DISCONNECTED as typeof DISCONNECTED,
      })),
    ),
  );
};

interface SendMessageSuccessType {
  result: typeof SUCCESS;
}

interface SendMessageFailureType {
  result: typeof FAILURE;
  payload: {
    errors: string[];
  }
}

export type SendMessageResultType = SendMessageSuccessType | SendMessageFailureType;

export const sendMessageApi = ({ socket, value, username }: { socket: typeof Socket, value: string, username: string }): Observable<SendMessageResultType> => {
  if (socket.connected) {
    socket.emit('chatMessage', {
      message: value,
      username,
    });

    return of({
      result: SUCCESS as typeof SUCCESS,
    });
  }

  return of({
    result: FAILURE as typeof FAILURE,
    payload: {
      errors: ['socket disconnected'],
    },
  });
};
