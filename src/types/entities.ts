import { IMemoryDB } from 'DB/MemoryDatabase';
import { IncomingMessage, ServerResponse } from 'http';

export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: Array<string>;
}

export const enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IEndpoints {
  [HTTP_METHOD: string]: (
    req: IncomingMessage,
    res: ServerResponse,
    userId: string,
    userDB: IMemoryDB
  ) => void | Promise<unknown>;
}

export type UserId = string | undefined;

enum RESULT_STATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
