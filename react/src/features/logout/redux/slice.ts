import { createSlice } from '@reduxjs/toolkit';
import * as types from '../types';

const logoutSlice = createSlice({
  name: '@@logout',
  initialState: {
    status: types.IDLE,
  } as types.LogoutStateType,
  reducers: {
    logoutReq: (state) => {
      switch (state.status) {
        case (types.IDLE):
        case (types.SUCCESS):
          return {
            ...state,
            status: types.LOADING,
          };
        default: return state;
      }
    },
    logoutSuccess: (state) => {
      switch (state.status) {
        case (types.LOADING): {
          return {
            ...state,
            status: types.SUCCESS,
          };
        }
        default: return state;
      }
    },
  },
});

export const { actions, reducer } = logoutSlice;
export const { logoutReq, logoutSuccess } = actions;
export default logoutSlice;
