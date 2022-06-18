import { HTTP_METHOD, IEndpoints } from 'types/entities';

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

export const getHandle = (method: string): Function | null => {
  if (endpoints[method]) {
    return endpoints[method];
  }
  return null;
};
