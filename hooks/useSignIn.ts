import { Session } from 'next-auth';
import { useSession } from 'next-auth/client';
import Router, { useRouter } from 'next/router';

export const useSignIn = (): Session | null => {
  const [session, loading] = useSession();
  const { pathname } = useRouter();

  if (session) {
    return session;
  } else if (!loading && pathname !== '/login') {
    Router.push('/login');
    return null;
  }
};
