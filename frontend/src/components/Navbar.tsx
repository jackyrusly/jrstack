import React, { useCallback } from 'react';
import { Link, Flex, Box, Button, Heading } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation } from '@graphql';
import { isServer } from '@utils/isServer';
import ColorModeSwitcher from './ColorModeSwitcher';

const Navbar: React.FC<{}> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  const handleLogout = useCallback(() => {
    logout();
  }, []);

  if (isServer() || fetching) {
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
        <Box mr={4} fontWeight="bold">
          {data.me.username}
        </Box>

        <Button
          variant="link"
          color="white"
          isLoading={logoutFetching}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      bg="primary"
      p={4}
      ml="auto"
      color="white"
      zIndex={1}
      position="sticky"
      top={0}
      alignItems="center"
    >
      <NextLink href="/">
        <Link>
          <Heading size="md" mr={4}>
            JRStack
          </Heading>
        </Link>
      </NextLink>

      <Box ml="auto" mr={16}>
        {body}
      </Box>

      <ColorModeSwitcher />
    </Flex>
  );
};

export default Navbar;
