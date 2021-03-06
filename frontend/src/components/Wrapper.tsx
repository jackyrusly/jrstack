import React from 'react';
import { Box } from '@chakra-ui/core';

export type VariantType = 'small' | 'regular';

interface WrapperProps {
  variant?: VariantType;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      px={4}
      maxW={variant === 'regular' ? '800px' : '400px'}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
