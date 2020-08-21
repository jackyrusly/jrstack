import React from 'react';
import { Link, Flex, Box, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery } from '~/generated/graphql';

const Navbar: React.FC<{}> = () => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    body = <Box>&nbsp;</Box>;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4} color="white">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box color="white" mr={4}>
          {data.me.username}
        </Box>
        <Button variant="link">Logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4} ml="auto">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;
