import { RequestUser } from './authorization.types';

export type WithUser<T = {}> = T & { user: RequestUser };
