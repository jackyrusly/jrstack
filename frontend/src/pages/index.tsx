import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '~/utils/createUrqlClient';
import { usePostsQuery } from '~/generated/graphql';
import { Box } from '@chakra-ui/core';

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <div>Hello World</div>
      {data && data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
