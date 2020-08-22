import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/core';
import InputField from '@components/InputField';
import { useLoginMutation } from '@graphql';
import { toErrorMap } from '@utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '@utils/createUrqlClient';
import Page from '@components/Page';

const Login: React.FC<{}> = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = useCallback(async (values, { setErrors }) => {
    const response = await login(values);

    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      if (typeof router.query.redirect === 'string') {
        await router.push(router.query.redirect);
      } else {
        await router.push('/');
      }
    }
  }, []);

  return (
    <Page variant="small">
      <Flex justifyContent="center">
        <Heading mb={8}>Login</Heading>
      </Flex>

      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
            />

            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>

            <Flex mt={2} justifyContent="flex-end">
              <NextLink href="/forgot-password">
                <Link color="primary" fontSize="0.875rem">
                  Forgot Password?
                </Link>
              </NextLink>
            </Flex>

            <Button
              mt={2}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
