import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from '../types';

const initialState: types.ChatStateType = {
  status: {
    connection: types.IDLE,
    sendMessage: types.IDLE,
  },
  socket: null,
  chats: [],
  errors: {
    connection: [],
    sendMessage: [],
  },
};

const loginSlice = createSlice({
  name: '@@chat',
  initialState,
  reducers: {
    connectionReq: (state) => {
      switch (state.status.connection) {
        case (types.IDLE):
          return {
            ...state,
            status: {
              ...state.status,
              connection: types.LOADING,
            },
            errors: initialState.errors,
          };
        default: return state;
      }
    },
    connectionSuccess: (state, action: PayloadAction<types.ConnectSuccessPayloadType>) => {
      switch (state.status.connection) {
        case (types.LOADING):
          return {
            ...state,
            status: {
              ...state.status,
              connection: types.SUCCESS,
            },
            socket: action.payload.socket,
          };
        default: return state;
      }
    },
    connectionFailure: (state, action: PayloadAction<types.ConnectFailurePayloadType>) => {
      switch (state.status.connection) {
        case (types.LOADING):
          return {
            ...state,
            status: {
              ...state.status,
              connection: types.FAILURE,
            },
            socket: null,
            errors: {
              ...state.errors,
              connection: action.payload.errors,
            },
          };
        default: return state;
      }
    },
    connectionDisconnected: (state) => {
      switch (state.status.connection) {
        case (types.SUCCESS):
          return {
            ...state,
            status: {
              ...state.status,
              connection: types.IDLE,
            },
            socket: null,
            errors: {
              ...state.errors,
              connection: [],
            },
          };
        default: return state;
      }
    },
    newIncomeMessage: (state, action: PayloadAction<types.NewIncomeMessagePayloadType>) => {
      switch (state.status.connection) {
        case (types.SUCCESS):
          return {
            ...state,
            chats: [action.payload.message, ...state.chats],
          };
        default: return state;
      }
    },
    sendMessageReq: (state, action: PayloadAction<types.SendMessagePayloadType>) => {
      switch (state.status.connection) {
        case (types.SUCCESS):
          switch (state.status.sendMessage) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              return {
                ...state,
                status: {
                  ...state.status,
                  sendMessage: types.LOADING,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    sendMessageSuccess: (state) => {
      switch (state.status.connection) {
        case (types.SUCCESS):
          switch (state.status.sendMessage) {
            case (types.LOADING):
              return {
                ...state,
                status: {
                  ...state.status,
                  sendMessage: types.SUCCESS,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    sendMessageFailure: (state, action: PayloadAction<types.SendMessageFailureType>) => {
      switch (state.status.connection) {
        case (types.SUCCESS):
          switch (state.status.sendMessage) {
            case (types.LOADING):
              return {
                ...state,
                status: {
                  ...state.status,
                  sendMessage: types.FAILURE,
                },
                errors: {
                  ...state.errors,
                  sendMessage: action.payload.errors,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
  },
});

export const { actions, reducer } = loginSlice;
export const {
  connectionReq,
  connectionSuccess,
  connectionFailure,
  connectionDisconnected,
  newIncomeMessage,
  sendMessageReq,
  sendMessageSuccess,
  sendMessageFailure,
} = actions;
export default loginSlice;
