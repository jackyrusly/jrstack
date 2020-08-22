import { dedupExchange, fetchExchange, Exchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { pipe, tap } from 'wonka';
import Router from 'next/router';
import cacheExchangeConfig from '~/configs/cache-config';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('Unauthorized')) {
        Router.replace('/login');
      }
    }),
  );
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: { credentials: 'include' as const },
  exchanges: [
    dedupExchange,
    cacheExchange(cacheExchangeConfig),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
