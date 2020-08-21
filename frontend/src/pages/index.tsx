import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '~/utils/createUrqlClient';
import { usePostsQuery } from '~/generated/graphql';
import { Box } from '@chakra-ui/core';
import Wrapper from '@components/Wrapper';
import Page from '@components/Page';

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Page>
      <Wrapper>
        {data &&
          data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)}
      </Wrapper>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
