import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import cacheExchangeConfig from '~/configs/cache-config';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: { credentials: 'include' as const },
  exchanges: [
    dedupExchange,
    cacheExchange(cacheExchangeConfig),
    ssrExchange,
    fetchExchange,
  ],
});
