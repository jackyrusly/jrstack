import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import Wrapper from '@components/Wrapper';
import InputField from '@components/InputField';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const handleSubmit = useCallback((values) => {
    console.log(values);
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
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
