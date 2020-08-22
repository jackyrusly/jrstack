import 'module-alias/register';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __PROD__, SESSION_KEY } from './constants';
import resolvers from './resolvers';
import Entities from './entities';
import { SnakeCaseNamingStrategy } from '@utils/OrmUtil';

(async () => {
  await createConnection({
    type: 'postgres',
    username: 'postgres',
    password: 'password',
    database: 'jrstack',
    logging: !__PROD__,
    synchronize: !__PROD__,
    entities: Entities,
    namingStrategy: new SnakeCaseNamingStrategy(),
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: SESSION_KEY,
      store: new RedisStore({
        client: redis,
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
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });
})();
