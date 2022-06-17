type uid = string | null;
type resultObject = { result: RESULT_STATUS; id?: uid; users?: Array<IUser>; user?: IUser };

interface IMemoryDB {
  usersStore: Array<IUser>;
  add: (user: IUser) => resultObject;
  get: (id: number) => resultObject;
  getAll: () => resultObject;
  update: () => resultObject;
  delete: () => resultObject;
}
