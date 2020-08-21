import React, { useCallback } from 'react';
import { NextPage } from 'next';
import Page from '@components/Page';
import Wrapper from '@components/Wrapper';
import { Flex, Heading, Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import InputField from '@components/InputField';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '~/utils/createUrqlClient';

interface ChangePasswordProps {
  token: string;
}

const ChangePassword: NextPage<ChangePasswordProps> = ({ token }) => {
  const handleSubmit = useCallback((values) => {
    console.log(values, token);
  }, []);

  return (
    <Page>
      <Wrapper variant="small">
        <Flex justifyContent="center">
          <Heading mb={4}>Change Password</Heading>
        </Flex>

        <Formik initialValues={{ newPassword: '' }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="newPassword"
                placeholder="New Password"
                label="New Password"
                type="password"
              />

              <Box mt={4}>
                <Button
                  type="submit"
                  variantColor="teal"
                  isLoading={isSubmitting}
                >
                  Change Password
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Page>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
