import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Heading, Flex } from '@chakra-ui/core';
import Wrapper from '@components/Wrapper';
import InputField from '@components/InputField';
import { useRegisterMutation } from '~/generated/graphql';
import { toErrorMap } from '~/utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '~/utils/createUrqlClient';
import Page from '@components/Page';

const Register: React.FC<{}> = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = useCallback(async (values, { setErrors }) => {
    const response = await register({ options: values });

    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      router.push('/');

      return false;
    }

    return true;
  }, []);

  return (
    <Page>
      <Wrapper variant="small">
        <Flex justifyContent="center">
          <Heading mb={4}>Register</Heading>
        </Flex>

        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />

              <Box mt={4}>
                <InputField
                  name="username"
                  placeholder="Username"
                  label="Username"
                />
              </Box>

              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>

              <Box mt={4}>
                <Button
                  type="submit"
                  variantColor="teal"
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
