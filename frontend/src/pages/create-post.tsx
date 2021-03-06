import React, { useCallback } from 'react';
import Page from '@components/Page';
import { Flex, Heading, Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import InputField from '@components/InputField';
import { useCreatePostMutation } from '@graphql';
import { useRouter } from 'next/router';
import { withAuth } from '@utils/withAuth';
import { createUrqlClient } from '@utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const CreatePost: React.FC<{}> = () => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();

  const handleSubmit = useCallback(async (values) => {
    const response = await createPost({ input: values });

    if (!response.error) {
      await router.push('/');
    }
  }, []);

  return (
    <Page variant="small">
      <Flex justifyContent="center">
        <Heading mb={8}>Create Post</Heading>
      </Flex>

      <Formik initialValues={{ title: '', text: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />

            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="Text..."
                label="Body"
              />
            </Box>

            <Button
              mt={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient)(withAuth(CreatePost));
