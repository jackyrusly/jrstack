import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import Wrapper from '@components/Wrapper';
import InputField from '@components/InputField';
import { useLoginMutation } from '~/generated/graphql';
import { toErrorMap } from '~/utils/toErrorMap';
import { useRouter } from 'next/router';

const Login: React.FC<{}> = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = useCallback(async (values, { setErrors }) => {
    const response = await login({ options: values });

    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      router.push('/');
    }
  }, []);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />

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
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
