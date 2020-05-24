export const USER = 'user';
export const ADMIN = 'admin';

export const SUCCESS = 'success';
export const FAILURE = 'failure';

export interface UsersType {
  username: string; // VARCHAR(80)
  passwordHash: string; // CHAR(60)
  group: typeof USER | typeof ADMIN; // VARCHAR(10)
  id: string; // CHAR(36)
  email: string; // VARCHAR(70)
  phone: string; // VARCHAR(16)
}

export type TokenPayloadType = Pick<UsersType, 'id' | 'email' | 'group'>;


export interface PassportLoginSuccessType {
  user: UsersType;
  token: string;
}

export interface FindUserByEmailSuccessType {
  result: typeof SUCCESS;
  payload: {
    user: UsersType;
  }
}

export interface FindUserByEmailFailureType {
  result: typeof FAILURE;
  payload: {
    error: string;
  }
}

export type FindUserByEmailResultType = FindUserByEmailSuccessType | FindUserByEmailFailureType;

export interface FindUserByIdSuccessType {
  result: typeof SUCCESS;
  payload: {
    user: UsersType;
  }
}

export interface FindUserByIdFailureType {
  result: typeof FAILURE;
  payload: {
    error: string;
  }
}

export type FindUserByIdResultType = FindUserByIdSuccessType | FindUserByIdFailureType;

// FIXME Put it under the admin folder
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
