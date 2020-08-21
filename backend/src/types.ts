import { Request, Response } from 'express';
import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export type AppContext = {
  req: Request & { session: Express.Session };
  res: Response;
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
