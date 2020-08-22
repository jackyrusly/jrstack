import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  Ctx,
  UseMiddleware,
  ObjectType,
} from 'type-graphql';
import { Post } from '@entities/Post';
import { PostInput } from '@inputs/PostInput';
import { AppContext } from '~/types';
import { isAuth } from '@middlewares/AuthMiddleware';
import { getConnection } from 'typeorm';
import PaginatedResponse from '~/responses/PaginatedResponse';

@ObjectType()
class PaginatedPostsResponse extends PaginatedResponse<Post>(Post) {}

@Resolver()
export class PostResolver {
  @Query(() => PaginatedPostsResponse)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string,
  ): Promise<PaginatedPostsResponse> {
    const take = Math.min(50, limit);
    const takePlusOne = take + 1;

    const query = getConnection()
      .getRepository(Post)
      .createQueryBuilder('p')
      .orderBy('created_at', 'DESC')
      .take(takePlusOne);

    if (cursor) {
      query.where('created_at < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const posts = await query.getMany();

    return {
      items: posts.slice(0, take),
      hasMore: posts.length === takePlusOne,
    };
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
