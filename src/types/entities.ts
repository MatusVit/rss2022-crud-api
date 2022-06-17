interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
}

enum RESULT_STATUS {
  SUCCESS,
  ERROR,
}
