import React from 'react';
import Navbar from './Navbar';
import Wrapper from './Wrapper';

const Page: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant="small">{children}</Wrapper>
    </>
  );
};

export default Page;
