import { MikroORM } from '@mikro-orm/core';
import { __PROD__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';

(async () => {
  const orm = await MikroORM.init(mikroConfig);

  const post = orm.em.create(Post, { title: 'My first post' });
  await orm.em.persistAndFlush(post);
})();
