import { v4 as uuidv4 } from 'uuid';
import { IUser } from 'types/entities';

type uid = string | null;
// type resultObject = { result: RESULT_STATUS; id?: uid; users?: IUser[]; user?: IUser; massage?: string };

export interface IMemoryDB {
  // usersStore: { [key: string]: IUser };
  getAll: () => IUser[];
  get: (userId: string) => IUser | null;
  add: (user: IUser) => IUser;
  // update: () => resultObject;
  // delete: (userId: string) => resultObject;
}

export class MemoryDB implements IMemoryDB {
  private _usersStore: { [key: string]: IUser };

  constructor() {
    this._usersStore = {};
  }

  public getAll = () => {
    return Object.values(this._usersStore);
  };

  public add = (user: IUser) => {
    const userId = uuidv4();
    this._usersStore[userId] = { ...user, id: userId };
    return this._usersStore[userId];
  };

  public get = (userId: string) => {
    const user = this._usersStore[userId];
    if (user) return user;
    return null;
  };

  // public update = (user: IUser) => {
  //   if (user.id && this._usersStore[user.id]) {

  //   }
  //   return { result: RESULT_STATUS.ERROR, massage: `User with id:"${userId}" doesn't exist exists` };
  // };
}
