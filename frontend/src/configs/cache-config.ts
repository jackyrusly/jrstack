import { Cache, QueryInput } from '@urql/exchange-graphcache';
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  ChangePasswordMutation,
} from '~/generated/graphql';
import { CacheExchangeOpts } from '@urql/exchange-graphcache/dist/types/cacheExchange';

function updateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query,
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export default {
  updates: {
    Mutation: {
      changePassword: (_result, _args, cache, _info) => {
        updateQuery<ChangePasswordMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.changePassword.errors) {
              return query;
            }

            return {
              me: result.changePassword.user,
            };
          },
        );
      },
      logout: (_result, _args, cache, _info) => {
        updateQuery<LoginMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          () => ({ me: null }),
        );
      },
      login: (_result, _args, cache, _info) => {
        updateQuery<LoginMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.login.errors) {
              return query;
            }

            return {
              me: result.login.user,
            };
          },
        );
      },
      register: (_result, _args, cache, _info) => {
        updateQuery<RegisterMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.register.errors) {
              return query;
            }

            return {
              me: result.register.user,
            };
          },
        );
      },
    },
  },
} as CacheExchangeOpts;
