import type { AppProps as NextAppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import '../styles/main.scss';
import React from 'react';
import { Session } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Provider, ErrorBoundary } from '@rollbar/react';

export const SIGN_IN_PAGE = '/api/auth/signin';
export const VERIFY_REQUEST_PAGE = 'api/auth/verify-request';

// https://docs.rollbar.com/docs/react
const ROLLBAR_CONFIG = {
  accessToken: process.env.ROLLBAR_POST_CLIENT_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
  ignoredMessages: ['Abort route change. Please ignore this error.'],
};

type AppProps = NextAppProps & {
  session?: Session | null;
};

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
  // ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
  return (
    <Provider config={ROLLBAR_CONFIG}>
      <ErrorBoundary>
        <SessionProvider session={session}>
          <Head>
            <title>HackBeanpot Application Portal</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Component {...pageProps} />
        </SessionProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
