import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from '../theme';
import Navbar from '@components/Navbar';

function JRApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default JRApp;
