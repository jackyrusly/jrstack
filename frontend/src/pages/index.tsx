import React, { useState, useCallback } from 'react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '@utils/createUrqlClient';
import { usePostsQuery } from '@graphql';
import { Box, Button, Text, Flex, Stack, Heading } from '@chakra-ui/core';
import Page from '@components/Page';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as string | null | undefined,
  });
  const [{ data, fetching }] = usePostsQuery({ variables });

  const handleLoadMore = useCallback(() => {
    setVariables((prevVariables) => ({
      limit: prevVariables.limit,
      cursor: data?.posts.items[data?.posts.items.length - 1].createdAt,
    }));
  }, [data]);

  return (
    <Page>
      <Flex mb={8}>
        <Heading>JRStack</Heading>
        <NextLink href="/create-post">
          <Button ml="auto">Create Post</Button>
        </NextLink>
      </Flex>

      <Stack spacing={8} mb={4}>
        {data &&
          data.posts.items.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textShort}</Text>
            </Box>
          ))}
      </Stack>

      {data?.posts.hasMore && (
        <Flex>
          <Button
            isLoading={fetching}
            mx="auto"
            mb={4}
            onClick={handleLoadMore}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Page>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
