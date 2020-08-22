import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { Post } from '@entities/Post';
import { PostInput } from '@inputs/PostInput';
import { AppContext } from '~/types';
import { isAuth } from '@middlewares/AuthMiddleware';
import { getConnection } from 'typeorm';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string,
  ): Promise<Post[]> {
    const take = Math.min(50, limit);

    const query = getConnection()
      .getRepository(Post)
      .createQueryBuilder('p')
      .orderBy('created_at', 'DESC')
      .take(take);

    if (cursor) {
      query.where('created_at < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    return query.getMany();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: AppContext,
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title') title: string,
  ): Promise<Post | null> {
    const post = await Post.findOne(id);

    if (!post) {
      return null;
    }

    Post.update({ id }, { title });

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      await Post.delete(id);
    } catch {
      return false;
    }

    return true;
  }
}
