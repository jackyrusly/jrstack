import React from 'react';
import Navbar from './Navbar';
import Wrapper, { VariantType } from './Wrapper';

interface PageProps {
  variant?: VariantType;
}

const Page: React.FC<PageProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Page;
