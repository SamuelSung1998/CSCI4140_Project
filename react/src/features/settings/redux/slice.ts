import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from '../types';
import { USER } from '../../login/types';

const initialState: types.SettingsStateType = {
  status: {
    load: types.IDLE,
    update: types.IDLE,
  },
  initialValues: {
    id: '',
    username: '',
    email: '',
    phone: '',
    group: USER,
    oldPassword: '',
    password: '',
    password2: '',
  },
  errors: {
    load: [],
    update: [],
  },
};

const settingsSlice = createSlice({
  name: '@@settings',
  initialState,
  reducers: {
    settingsLoadReq: (state) => {
      switch (state.status.load) {
        case (types.IDLE):
        case (types.SUCCESS):
        case (types.FAILURE):
          switch (state.status.update) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              return {
                ...state,
                status: {
                  ...state.status,
                  load: types.LOADING,
                },
                errors: {
                  ...state.errors,
                  load: [],
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    settingsLoadSuccess: (state, action: PayloadAction<types.SettingsLoadSuccessPayloadType>) => {
      switch (state.status.load) {
        case (types.LOADING):
          switch (state.status.update) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              return {
                ...state,
                status: {
                  ...state.status,
                  load: types.SUCCESS,
                },
                initialValues: {
                  ...state.initialValues,
                  ...action.payload.values,
                },
                errors: {
                  ...state.errors,
                  load: [],
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    settingsLoadFailure: (state, action: PayloadAction<types.SettingsLoadFailurePayloadType>) => {
      switch (state.status.load) {
        case (types.LOADING):
          switch (state.status.update) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              return {
                ...state,
                status: {
                  ...state.status,
                  load: types.FAILURE,
                },
                initialValues: initialState.initialValues,
                errors: {
                  ...state.errors,
                  load: action.payload.errors,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    settingsUnload: (state) => initialState,
    settingsUpdateReq: (state, action: PayloadAction<types.SettingsUpdateReqPayloadType>) => {
      switch (state.status.load) {
        case (types.SUCCESS):
          switch (state.status.update) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              return {
                ...state,
                status: {
                  ...state.status,
                  update: types.LOADING,
                },
                errors: {
                  ...state.errors,
                  update: [],
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    settingsUpdateSuccess: (state) => {
      switch (state.status.load) {
        case (types.SUCCESS):
          switch (state.status.update) {
            case (types.LOADING):
              return {
                ...state,
                status: {
                  ...state.status,
                  load: types.IDLE, // let the form to load the latest data again
                  update: types.SUCCESS,
                },
                errors: {
                  ...state.errors,
                  update: [],
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    settingsUpdateFailure: (state, action: PayloadAction<types.SettingsUpdateFailurePayloadType>) => {
      switch (state.status.load) {
        case (types.SUCCESS):
          switch (state.status.update) {
            case (types.LOADING):
              return {
                ...state,
                status: {
                  ...state.status,
                  update: types.FAILURE,
                },
                errors: {
                  ...state.errors,
                  update: action.payload.errors,
                },
              };
            default: return state;
          }
        default: return state;
      }
    },
    settingsFailureReset: (state) => ({
      ...state,
      status: {
        load: state.status.load === types.FAILURE ? types.IDLE : state.status.load,
        update: state.status.update === types.FAILURE ? types.IDLE : state.status.update,
      },
      errors: {
        load: [],
        update: [],
      },
    }),
  },
});

export const { actions, reducer } = settingsSlice;
export const {
  settingsLoadReq,
  settingsLoadSuccess,
  settingsLoadFailure,
  settingsUnload,
  settingsUpdateReq,
  settingsUpdateSuccess,
  settingsUpdateFailure,
  settingsFailureReset,
} = actions;
export default settingsSlice;
