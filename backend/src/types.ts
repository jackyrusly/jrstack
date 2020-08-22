import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export type AppContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
};
