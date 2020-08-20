import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { __PROD__ } from './constants';
import Entities from './entities';

export default {
  dbName: 'jrstack',
  password: 'password',
  type: 'postgresql',
  debug: !__PROD__,
  entities: Entities,
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
