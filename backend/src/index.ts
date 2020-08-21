import 'module-alias/register';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { MikroORM } from '@mikro-orm/core';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __PROD__, SESSION_KEY } from './constants';
import mikroConfig from './mikro-orm.config';
import resolvers from './resolvers';

(async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: SESSION_KEY,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: __PROD__,
      },
      saveUninitialized: false,
      secret: '30b21cf8-c6fc-4e8c-8c91-1dfae078b3e0',
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, em: orm.em }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });
})();
