import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';

/**
 * returns the session if the user is logged in, otherwise null. will automatically
 * redirect to /login if the user is not logged in.
 */
export const useSessionOrRedirect = (): Session | null => {
  const [session, loading] = useSession();
  const { pathname } = useRouter();

  if (session) {
    return session;
  } else if (!loading && pathname !== '/login') {
    Router.push('/login');
  }
  return null;
};
