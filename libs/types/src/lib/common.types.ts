import { RequestUser } from './authorization.types';

export type WithUser<T = object> = T & { user: RequestUser };

export type DtoWithId<T> = {
  id: string;
  data: T;
};
