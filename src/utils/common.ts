import { IUser } from 'types/entities';

export const checkUsersObject = (user: IUser): boolean =>
  !!(typeof user.username === 'string' && typeof user.age === 'number' && Array.isArray(user.hobbies));
