import React, { useCallback } from 'react';
import { Link, Flex, Box, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation } from '~/generated/graphql';

const Navbar: React.FC<{}> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  const handleLogout = useCallback(() => {
    logout();
  }, []);

  if (fetching) {
    body = <Box>&nbsp;</Box>;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          variant="link"
          isLoading={logoutFetching}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4} ml="auto" color="white">
      <NextLink href="/">
        <Link>Home</Link>
      </NextLink>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;
