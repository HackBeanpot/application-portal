import { NextApiHandler, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from './mongoDB';
import { Session } from 'next-auth';

export function protect(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    // const session = await getSession({ req });
    if (true) {
      await handler(req, res);
    } else {
      res.status(401).send(undefined);
    }
  };
}

// non-null assertions are ok because users must have an email, and also are guaranteed to be logged in by protect
export const assumeLoggedInGetEmail = async (
  req: NextApiRequest
): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (await getSession({ req }))!.user!.email!;
};

export async function isAdmin(req: NextApiRequest): Promise<boolean> {
  const email = await assumeLoggedInGetEmail(req);
  const { userDataCollection } = await connectToDatabase();
  const data = await userDataCollection.findOne({ email });
  return Boolean(data?.isAdmin);
}
