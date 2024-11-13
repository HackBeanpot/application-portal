import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './mongoDB';
import { safe } from './errors';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export function protect(handler: NextApiHandler): NextApiHandler {
  return safe(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      await handler(req, res);
    } else {
      res.status(401).send(undefined);
    }
  });
}

// non-null assertions are ok because users must have an email, and also are guaranteed to be logged in by protect
export const assumeLoggedInGetEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (await getServerSession(req, res, authOptions))!.user!.email!;
};

export async function isAdmin(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const email = await assumeLoggedInGetEmail(req, res);
  const { userDataCollection } = await connectToDatabase();
  const data = await userDataCollection.findOne({ email });
  return Boolean(data?.isAdmin);
}
