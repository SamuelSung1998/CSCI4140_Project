export const SUCCESS = 'success';
export const FAILURE = 'failure';

export interface ChatType {
  message: string;
  senderId: string;
  topicId?: number | null;
}

export interface CreateChatSuccessType {
  result: typeof SUCCESS;
}

export interface CreateChatFailureType {
  result: typeof FAILURE;
  payload: {
    error: string;
  }
}

export type CreateChatResultType = CreateChatSuccessType | CreateChatFailureType;
