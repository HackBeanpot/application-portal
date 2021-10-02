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

// this should be abstracted

const assumeLoggedInGetEmail = async () => (await getSession())!.user!.email!;

export async function isAdmin(): Promise<boolean> {
  const email = assumeLoggedInGetEmail();
  const { dataCollection } = await connectToDatabase('applicant_data');
  const data: User = await dataCollection.findOne({ email });

  return data.isAdmin;
}
