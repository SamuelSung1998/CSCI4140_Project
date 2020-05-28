import { Socket } from 'socket.io-client';

// Chat Error Errors
export type ChatErrorType = string;

// Status Keywords
export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCESS = 'success';
export const FAILURE = 'failure';

// Additional Keywords for socketio
export const MESSAGE = 'message';
export const DISCONNECTED = 'disconnected';

type StatusType = typeof IDLE | typeof LOADING | typeof SUCCESS | typeof FAILURE;


export interface messageType {
  username: string;
  value: string;
  time: string;
}

// Login State Interface
export interface ChatStateType {
  status: {
    connection: StatusType;
    sendMessage: StatusType;
  }
  socket: typeof Socket | null;
  chats: messageType[];
  errors: {
    connection: ChatErrorType[];
    sendMessage: ChatErrorType[];
  }
}

export interface ConnectSuccessPayloadType {
  socket: typeof Socket;
}

export interface ConnectFailurePayloadType {
  errors: ChatErrorType[];
}

export interface NewIncomeMessagePayloadType {
  message: messageType;
}

export interface SendMessagePayloadType {
  value: string;
}

export interface SendMessageFailureType {
  errors: ChatErrorType[];
}
