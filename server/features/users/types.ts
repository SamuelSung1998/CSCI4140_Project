import { UsersType } from '../login/types';

export { ADMIN, USER } from '../login/types';

export const SUCCESS = 'success';
export const FAILURE = 'failure';

export interface FormType extends Omit<UsersType, 'passwordHash'> {
  oldPassword: string;
  password: string;
  password2: string;
}

export interface GetUsersListSuccessType {
  result: typeof SUCCESS;
  payload: {
    users: UsersType[];
  }
}

export interface GetUsersListFailureType {
  result: typeof FAILURE;
  payload: {
    error: string;
  }
}

export type GetUsersListResultType = GetUsersListSuccessType | GetUsersListFailureType;

export interface UpdateUserSuccessType {
  result: typeof SUCCESS;
}

export interface UpdateUserFailureType {
  result: typeof FAILURE;
  payload: {
    error: string;
  }
}

export type UpdateUserResultType = UpdateUserSuccessType | UpdateUserFailureType;

export interface CreateUserSuccessType {
  result: typeof SUCCESS;
  payload: {
    id: string;
  }
}

export interface CreateUserFailureType {
  result: typeof FAILURE;
  payload: {
    error: string;
  }
}

export type CreateUserResultType = CreateUserSuccessType | CreateUserFailureType;

export interface DeleteUserByIdSuccessType {
  result: typeof SUCCESS;
}

export interface DeleteUserByIdFailureType {
  result: typeof FAILURE;
  payload: {
    error: string;
  }
}

export type DeleteUserByIdResultType = DeleteUserByIdSuccessType | DeleteUserByIdFailureType;

