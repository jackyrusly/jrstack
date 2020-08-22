import { ClassType, ObjectType, Field } from 'type-graphql';

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: TItem[];

    @Field()
    hasMore: boolean;
  }

  return PaginatedResponseClass;
}
