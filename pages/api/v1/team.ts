import { NextApiRequest, NextApiResponse } from 'next';
import { protect } from '../../../server/protect';

export default protect(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // respond with unimplemented
  res.status(501).send(undefined);
});
