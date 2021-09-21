import { env } from './utils/env';

export const AWS_REGION = 'us-east-1';
export const EMAIL_SENDER = 'no-reply@danderco.in';
export const CHAIN_ID = `0x${(+env('ETHEREUM_CHAIN_ID')).toString(16)}`;
