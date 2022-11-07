import { Global } from '@emotion/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { global } from '../styles/global';
import { reset } from '../styles/reset';

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
      <Global styles={global} />
      <Global styles={reset} />
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
