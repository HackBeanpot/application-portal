import { signIn, signOut } from 'next-auth/client';
import { useSessionOrRedirect as useSessionOrRedirect } from '../hooks/useSessionOrRedirect';

export default function Page() {
  const session = useSessionOrRedirect();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && session.user && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
