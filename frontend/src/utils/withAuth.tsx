import React, { useEffect, useState } from 'react';
import { NextPage, NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { Spinner, Flex } from '@chakra-ui/core';
import { useMeQuery } from '@graphql';
import { isServer } from './isServer';

export const withAuth = (PageComponent: NextPage): NextPage => {
  const AuthWrapper: NextComponentType = () => {
    const [{ data, fetching }] = useMeQuery({
      pause: isServer(),
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!fetching) {
        if (!data?.me) {
          router.replace(`/login?redirect=${router.pathname}`);
        } else {
          setIsLoading(false);
        }
      }
    }, [fetching, data, router]);

    return (
      <>
        {isLoading ? (
          <Flex
            position="fixed"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {data?.me?.username}
            <Spinner size="xl" color="primary" />
          </Flex>
        ) : (
          <>
            <PageComponent />
          </>
        )}
      </>
    );
  };

  AuthWrapper.getInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    return pageProps;
  };

  return AuthWrapper;
};
