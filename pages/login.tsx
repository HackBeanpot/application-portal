import { signIn, signOut } from 'next-auth/client';
import { useSignIn } from '../hooks/useSignIn';

export default function Page() {
  const session = useSignIn();

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
