import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from '../types';
import { logoutSuccess } from '../../logout/redux/slice';

const initialState: types.LoginStateType = {
  status: types.IDLE,
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
      switch (state.status) {
        case (types.IDLE):
        case (types.SUCCESS):
        case (types.FAILURE):
          return {
            ...state,
            status: types.LOADING,
          };
        default: return state;
      }
    },
    loginSuccess: (state, action: PayloadAction<types.LoginSuccessPayloadType>) => {
      switch (state.status) {
        case (types.LOADING): {
          const { username, token, group } = action.payload;
          return {
            ...state,
            status: types.SUCCESS,
            username,
            group,
            token,
          };
        }
        default: return state;
      }
    },
    loginFailure: (state, action: PayloadAction<types.LoginFailPayloadType>) => {
      switch (state.status) {
        case (types.LOADING):
          return {
            ...state,
            status: types.FAILURE,
            username: '',
            group: types.LOGGEDOUT,
            token: '',
            errors: action.payload.errors,
          };
        default: return state;
      }
    },
    loginFailureReset: (state) => {
      switch (state.status) {
        case (types.FAILURE):
          return {
            ...state,
            status: types.IDLE,
            errors: [],
          };
        default: return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, (state) => {
      switch (state.status) {
        case (types.SUCCESS):
          return initialState;
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
} = actions;
export default loginSlice;
