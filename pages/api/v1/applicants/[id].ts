import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { EXAMPLE_USER } from '../../../../common/constants';
import { isAdmin, protect } from '../../../../server/protect';

export default protect(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // get a single applicant
    case 'GET':
      return res.status(200).json(EXAMPLE_USER);
    // update a single applicant
    case 'POST':
      await postApplicant(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
});

const postApplicant: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req);
  if (!admin) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

}