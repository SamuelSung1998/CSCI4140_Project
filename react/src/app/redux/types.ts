// State Keywords

export const IDLE = 'IDLE';
export const PROCESSING = 'PROCESSING';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

export type ProcessStateType = typeof IDLE | typeof PROCESSING | typeof SUCCESS | typeof FAILED;
