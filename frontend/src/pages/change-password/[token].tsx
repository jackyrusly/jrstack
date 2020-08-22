import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import Page from '@components/Page';
import { Flex, Heading, Box, Button, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import InputField from '@components/InputField';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@utils/createUrqlClient';
import { useChangePasswordMutation } from '@graphql';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { toErrorMap } from '@utils/toErrorMap';

interface ChangePasswordProps {
  token: string;
}

const ChangePassword: NextPage<ChangePasswordProps> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  const handleSubmit = useCallback(async (values, { setErrors }) => {
    const response = await changePassword({
      token,
      newPassword: values.newPassword,
    });

    if (response.data?.changePassword.errors) {
      const errorMap = toErrorMap(response.data.changePassword.errors);

      if ('token' in errorMap) {
        setTokenError(errorMap.token);
      }

      setErrors(errorMap);
    } else if (response.data?.changePassword.user) {
      await router.push('/');
    }
  }, []);

  return (
    <Page variant="small">
      <Flex justifyContent="center">
        <Heading mb={8}>Change Password</Heading>
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

            {tokenError && (
              <Box color="red.500" mt={2} fontSize="0.875rem">
                {tokenError}
                <Box justifyContent="flex-end">
                  <NextLink href="/forgot-password">
                    <Link color="primary" fontSize="0.875rem">
                      Go to Forgot Password again?
                    </Link>
                  </NextLink>
                </Box>
              </Box>
            )}

            <Button
              mt={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
