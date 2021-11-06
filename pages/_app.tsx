import type { AppProps as NextAppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import '../styles/main.scss';
import { useRouter } from 'next/router';
import React from 'react';
import { Session } from 'next-auth';

const SIGN_IN_PAGE = '/api/auth/signin';
const VERIFY_REQUEST_PAGE = 'api/auth/verify-request';

type AppProps = NextAppProps & {
  session?: Session | null;
};

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // on pages where we want to do SSR to avoid showing flash of content,
  // `session` will be defined if the user is already logged in.
  const router = useRouter();
  if (
    !session &&
    router.pathname !== SIGN_IN_PAGE &&
    router.pathname !== VERIFY_REQUEST_PAGE
  ) {
    router.push(SIGN_IN_PAGE);
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>HackBeanpot Application Portal</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
