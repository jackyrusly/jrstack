import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Heading, Flex } from '@chakra-ui/core';
import InputField from '@components/InputField';
import { useRegisterMutation } from '@graphql';
import { toErrorMap } from '@utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@utils/createUrqlClient';
import Page from '@components/Page';

const Register: React.FC<{}> = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = useCallback(async (values, { setErrors }) => {
    const response = await register({ options: values });

    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      await router.push('/');
    }
  }, []);

  return (
    <Page variant="small">
      <Flex justifyContent="center">
        <Heading mb={8}>Register</Heading>
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

            <Button
              mt={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
