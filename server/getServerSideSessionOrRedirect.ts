import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { SIGN_IN_PAGE } from '../pages/_app';

export const getServerSideSessionOrRedirect: GetServerSideProps = async (
  ctx
) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: SIGN_IN_PAGE,
        permanent: false,
      },
    };
  }
  return { props: { session } };
};
