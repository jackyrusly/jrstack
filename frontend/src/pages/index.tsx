import React from 'react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '@utils/createUrqlClient';
import { usePostsQuery } from '@graphql';
import { Box, Button, Text, Flex, Stack, Heading } from '@chakra-ui/core';
import Page from '@components/Page';

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <Page>
      <Flex mb={8}>
        <Heading>JRStack</Heading>
        <NextLink href="/create-post">
          <Button ml="auto">Create Post</Button>
        </NextLink>
      </Flex>

      <Stack spacing={8}>
        {data &&
          data.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textShort}</Text>
            </Box>
          ))}
      </Stack>

      <Flex>
        <Button mx="auto" my={8}>
          Load more
        </Button>
      </Flex>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
