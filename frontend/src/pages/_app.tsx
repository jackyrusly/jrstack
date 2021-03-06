import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from '../theme';

function JRApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default JRApp;
