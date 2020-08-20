import { MikroORM } from '@mikro-orm/core';
import { __PROD__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';

(async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const posts = await orm.em.find(Post, {});
  console.log(posts);
})();
