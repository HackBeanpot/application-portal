import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

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
