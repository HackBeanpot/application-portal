import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from './mongoDB';
import { User } from '../common/types';

export function protect(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const session = await getSession({ req });
    if (session) {
      await handler(req, res);
    } else {
      res.status(401).send(undefined);
    }
  };
}

// non-null assertions are ok because users must have an email, and also are guaranteed to be logged in by protect
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/explicit-module-boundary-types
export const assumeLoggedInGetEmail = async () =>
  (await getSession())!.user!.email!;

export async function isAdmin(): Promise<boolean> {
  const email = assumeLoggedInGetEmail();
  const { dataCollection } = await connectToDatabase('applicant_data');
  const data = (await dataCollection.findOne({ email })) as User;

  return data.isAdmin;
}
