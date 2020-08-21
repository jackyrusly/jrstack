import React from 'react';
import Navbar from './Navbar';

const Page: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Page;
