import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from '../types';
import { logoutSuccess } from '../../logout/redux/slice';

const initialState: types.LoginStateType = {
  status: {
    login: types.IDLE,
    recoverLogin: types.IDLE,
  },
  username: '',
  group: types.LOGGEDOUT,
  token: '',
  errors: [],
};

const loginSlice = createSlice({
  name: '@@login',
  initialState,
  reducers: {
    loginReq: (state, action: PayloadAction<types.LoginReqPayloadType>) => {
      switch (state.status.recoverLogin) {
        case (types.SUCCESS):
        case (types.FAILURE):
          switch (state.status.login) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              return {
                ...state,
                status: {
                  ...state.status,
                  login: types.LOADING,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    loginSuccess: (state, action: PayloadAction<types.LoginSuccessPayloadType>) => {
      switch (state.status.recoverLogin) {
        case (types.SUCCESS):
        case (types.FAILURE):
          switch (state.status.login) {
            case (types.LOADING): {
              const { username, token, group } = action.payload;
              return {
                ...state,
                status: {
                  ...state.status,
                  login: types.SUCCESS,
                },
                username,
                group,
                token,
              };
            }
            default: return state;
          }
        default: return state;
      }
    },
    loginFailure: (state, action: PayloadAction<types.LoginFailPayloadType>) => {
      switch (state.status.recoverLogin) {
        case (types.SUCCESS):
        case (types.FAILURE):
          switch (state.status.login) {
            case (types.LOADING):
              return {
                ...state,
                status: {
                  ...state.status,
                  login: types.FAILURE,
                },
                username: '',
                group: types.LOGGEDOUT,
                token: '',
                errors: action.payload.errors,
              };
            default: return state;
          }
        default: return state;
      }
    },
    loginFailureReset: (state) => {
      switch (state.status.recoverLogin) {
        case (types.SUCCESS):
        case (types.FAILURE):
          switch (state.status.login) {
            case (types.FAILURE):
              return {
                ...state,
                status: {
                  ...state.status,
                  login: types.IDLE,
                },
                errors: [],
              };
            default: return state;
          }
        default: return state;
      }
    },
    recoverLoginReq: (state) => {
      switch (state.status.recoverLogin) {
        case (types.IDLE):
          switch (state.status.login) {
            case (types.IDLE):
              return {
                ...state,
                status: {
                  ...state.status,
                  recoverLogin: types.LOADING,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    recoverLoginSuccess: (state, action: PayloadAction<types.RecoverLoginSuccessPayloadType>) => {
      switch (state.status.recoverLogin) {
        case (types.LOADING):
          switch (state.status.login) {
            case (types.IDLE):
              return {
                ...state,
                status: {
                  ...state.status,
                  login: types.SUCCESS,
                  recoverLogin: types.SUCCESS,
                },
                token: action.payload.token,
                group: action.payload.group,
                username: action.payload.username,
              };
            default: return state;
          }
        default: return state;
      }
    },
    recoverLoginFailure: (state) => {
      switch (state.status.recoverLogin) {
        case (types.LOADING):
          switch (state.status.login) {
            case (types.IDLE):
              return {
                ...state,
                status: {
                  ...state.status,
                  recoverLogin: types.FAILURE,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, (state) => {
      switch (state.status.login) {
        case (types.SUCCESS):
          return {
            ...initialState,
            status: {
              ...initialState.status,
              recoverLogin: state.status.recoverLogin,
            },
          };
        default: return state;
      }
    });
  },
});

export const { actions, reducer } = loginSlice;
export const {
  loginReq,
  loginSuccess,
  loginFailure,
  loginFailureReset,
  recoverLoginReq,
  recoverLoginSuccess,
  recoverLoginFailure,
} = actions;
export default loginSlice;
