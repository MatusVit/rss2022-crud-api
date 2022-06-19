import { HTTPError } from '../errors/errors';
import { HTTP_METHOD, IEndpoints } from '../types/entities';

import { handleDeleteUsers } from './handleDeleteUsers';
import { handleGetUsers } from './handleGetUsers';
import { handlePostUsers } from './handlePostUsers';
import { handlePutUsers } from './handlePutUsers';

const endpoints: IEndpoints = {
  [HTTP_METHOD.GET]: handleGetUsers,
  [HTTP_METHOD.POST]: handlePostUsers,
  [HTTP_METHOD.PUT]: handlePutUsers,
  [HTTP_METHOD.DELETE]: handleDeleteUsers,
};

export const getHandle = (method: string | undefined, urlArray: string[], url: string | undefined): Function => {
  if (method && urlArray[0] === 'api' && urlArray[1] === 'users' && endpoints[method]) {
    return endpoints[method];
  }
  throw new HTTPError(`Non-existing endpoint ${method} ${url}`, 404);
};
