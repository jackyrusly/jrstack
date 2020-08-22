import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import Wrapper from '@components/Wrapper';
import InputField from '@components/InputField';
import { useLoginMutation } from '~/generated/graphql';
import { toErrorMap } from '~/utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '~/utils/createUrqlClient';
import Page from '@components/Page';

const Login: React.FC<{}> = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = useCallback(async (values, { setErrors }) => {
    const response = await login(values);

    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      router.push('/');

      return false;
    }

    return true;
  }, []);

  return (
    <Page>
      <Wrapper variant="small">
        <Flex justifyContent="center">
          <Heading mb={4}>Login</Heading>
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

              <Button
                mt={4}
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
