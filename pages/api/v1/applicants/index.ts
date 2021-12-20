import { NextApiRequest, NextApiResponse } from 'next';
import { EXAMPLE_USER } from '../../../../common/constants';
import { protect } from '../../../../server/protect';

export default protect(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // get all the users
    // in the future, we probably want pagination on this (there will be 100+ applicants lol)
    case 'GET':
      console.log(req.url);
      return res.status(200).json([EXAMPLE_USER]);
    default:
      // only allow post on the /api/v1/applicants/:id route (for updating)
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
});
