import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from './mongoDB';

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
export const assumeLoggedInGetEmail = async () =>
  (await getSession())!.user!.email!;

export async function isAdmin(): Promise<boolean> {
  const email = await assumeLoggedInGetEmail();
  const { userDataCollection } = await connectToDatabase();
  const data = await userDataCollection.findOne({ email });
  return data != undefined ? data.isAdmin : false;
}
