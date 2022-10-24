import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { global } from '../styles/global';
import { reset } from '../styles/reset';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={global} />
      <Global styles={reset} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
