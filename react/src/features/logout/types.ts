// Status Keywords
export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCESS = 'success';

type StatusType = typeof IDLE | typeof LOADING | typeof SUCCESS;

// system state interface
export interface LogoutStateType {
  status: StatusType;
}
