import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';

/**
 * returns the session if the user is logged in, otherwise null. will automatically
 * redirect to /api/auth/signin if the user is not logged in.
 */
export const useSessionOrRedirect = (): Session | null => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const { pathname } = useRouter();

  if (session) {
    return session;
  } else if (!loading && pathname !== '/api/auth/signin') {
    Router.push('/api/auth/signin');
  }
  return null;
};
