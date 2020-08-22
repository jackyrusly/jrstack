import React, { useCallback, useState } from 'react';
import Page from '@components/Page';
import { Flex, Heading, Button, Box } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import InputField from '@components/InputField';
import { useForgotPasswordMutation } from '~/generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '~/utils/createUrqlClient';

const ForgotPassword: React.FC<{}> = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = useCallback(async (values, { setErrors }) => {
    if (!values.email.includes('@')) {
      setErrors({ email: 'Invalid email' });

      return true;
    }

    forgotPassword(values);
    setIsComplete(true);

    return true;
  }, []);

  return (
    <Page>
      <Flex justifyContent="center">
        <Heading mb={8}>Forgot Password</Heading>
      </Flex>

      <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) =>
          isComplete ? (
            <Box>
              An email has been sent to{' '}
              <Box as="span" color="tomato">
                {values.email}
              </Box>
              . Please check your inbox.
            </Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />

              <Button
                mt={4}
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
