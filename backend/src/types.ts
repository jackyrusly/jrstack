import { Request, Response } from 'express';
import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { Redis } from 'ioredis';

export type AppContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
