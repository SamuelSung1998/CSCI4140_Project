export const SUCCESS = 'success';
export const FAILURE = 'failure';

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
