import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from '../types';
import { USER } from '../../login/types';

const initialState: types.AdminStateType = {
  status: {
    usersListLoad: types.IDLE,
    userLoad: types.IDLE,
    userUpdate: types.IDLE,
  },
  usersList: [],
  initialValues: {
    id: '',
    username: '',
    email: '',
    phone: '',
    group: USER,
    password: '',
    password2: '',
  },
  errors: {
    usersListLoad: [],
    userLoad: [],
    userUpdate: [],
  },
};

const adminSlice = createSlice({
  name: '@@admin',
  initialState,
  reducers: {
    usersListLoadReq: (state) => {
      switch (state.status.usersListLoad) {
        case (types.IDLE):
        case (types.SUCCESS):
        case (types.FAILURE):
          switch (state.status.userLoad) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      usersListLoad: types.LOADING,
                    },
                    errors: {
                      ...state.errors,
                      usersListLoad: [],
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    usersListLoadSuccess: (state, action: PayloadAction<types.UsersListLoadSuccessPayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.LOADING):
          switch (state.status.userLoad) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      usersListLoad: types.SUCCESS,
                    },
                    usersList: action.payload.list,
                    errors: {
                      ...state.errors,
                      usersListLoad: [],
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    usersListLoadFailure: (state, action: PayloadAction<types.UsersListLoadFailurePayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.LOADING):
          switch (state.status.userLoad) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      usersListLoad: types.FAILURE,
                    },
                    initialValues: initialState.initialValues,
                    errors: {
                      ...state.errors,
                      usersListLoad: action.payload.errors,
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    userLoadReq: (state, action: PayloadAction<types.UserLoadReqPayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.SUCCESS):
          switch (state.status.userLoad) {
            case (types.IDLE):
            case (types.SUCCESS):
            case (types.FAILURE):
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      userLoad: types.LOADING,
                    },
                    errors: {
                      ...state.errors,
                      userLoad: [],
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    userLoadSuccess: (state, action: PayloadAction<types.UserLoadSuccessPayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.SUCCESS):
          switch (state.status.userLoad) {
            case (types.LOADING):
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      userLoad: types.SUCCESS,
                    },
                    initialValues: {
                      ...state.initialValues,
                      ...action.payload.value,
                    },
                    errors: {
                      ...state.errors,
                      userLoad: [],
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    userLoadFailure: (state, action: PayloadAction<types.UserLoadFailurePayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.SUCCESS):
          switch (state.status.userLoad) {
            case (types.LOADING):
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      userLoad: types.FAILURE,
                    },
                    initialValues: initialState.initialValues,
                    errors: {
                      ...state.errors,
                      userLoad: action.payload.errors,
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    userUnload: (state) => ({
      ...state,
      status: {
        ...state.status,
        userLoad: types.IDLE,
      },
      initialValues: initialState.initialValues,
      errors: {
        ...state.errors,
        userLoad: [],
      },
    }),
    userUpdateReq: (state, action: PayloadAction<types.UserUpdateReqPayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.SUCCESS):
          switch (state.status.userLoad) {
            case (types.IDLE): // for add new user
            case (types.SUCCESS): // for edit user
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      userUpdate: types.LOADING,
                    },
                    errors: {
                      ...state.errors,
                      userUpdate: [],
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    userUpdateSuccess: (state) => {
      switch (state.status.usersListLoad) {
        case (types.SUCCESS):
          switch (state.status.userLoad) {
            case (types.IDLE): // for add new user
            case (types.SUCCESS): // for edit user
              switch (state.status.userUpdate) {
                case (types.LOADING):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      userLoad: types.IDLE, // let the form to load the latest data again
                      userUpdate: types.SUCCESS,
                    },
                    errors: {
                      ...state.errors,
                      userUpdate: [],
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    userUpdateFailure: (state, action: PayloadAction<types.UserUpdateFailurePayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.SUCCESS):
          switch (state.status.userLoad) {
            case (types.IDLE): // for add new user
            case (types.SUCCESS): // for edit user
              switch (state.status.userUpdate) {
                case (types.LOADING):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      userUpdate: types.FAILURE,
                    },
                    errors: {
                      ...state.errors,
                      userUpdate: action.payload.errors,
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    userDeleteReq: (state, action: PayloadAction<types.UserDeleteReqPayloadType>) => {
      switch (state.status.usersListLoad) {
        case (types.SUCCESS):
          switch (state.status.userLoad) {
            case (types.IDLE):
            case (types.SUCCESS):
              switch (state.status.userUpdate) {
                case (types.IDLE):
                case (types.SUCCESS):
                case (types.FAILURE):
                  return {
                    ...state,
                    status: {
                      ...state.status,
                      userUpdate: types.LOADING,
                    },
                    errors: {
                      ...state.errors,
                      userUpdate: [],
                    },
                  };
                default: return state;
              }
            default: return state;
          }
        default: return state;
      }
    },
    adminFailureReset: (state) => ({
      ...state,
      status: {
        usersListLoad: state.status.usersListLoad === types.FAILURE ? types.IDLE : state.status.usersListLoad,
        userLoad: state.status.userLoad === types.FAILURE ? types.IDLE : state.status.userLoad,
        userUpdate: state.status.userUpdate === types.FAILURE ? types.IDLE : state.status.userUpdate,
      },
      errors: {
        usersListLoad: [],
        userLoad: [],
        userUpdate: [],
      },
    }),
    adminUnload: () => initialState,
  },
});

export const { actions, reducer } = adminSlice;
export const {
  usersListLoadReq,
  usersListLoadSuccess,
  usersListLoadFailure,
  userLoadReq,
  userLoadSuccess,
  userLoadFailure,
  userUnload,
  userUpdateReq,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteReq,
  adminFailureReset,
  adminUnload,
} = actions;
export default adminSlice;
