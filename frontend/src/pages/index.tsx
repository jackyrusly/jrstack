import React from 'react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '@utils/createUrqlClient';
import { usePostsQuery } from '@graphql';
import { Box, Button, Flex } from '@chakra-ui/core';
import Page from '@components/Page';

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Page>
      <Flex justifyContent="flex-end">
        <NextLink href="/create-post">
          <Button>Create Post</Button>
        </NextLink>
      </Flex>
      {data && data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)}
    </Page>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
