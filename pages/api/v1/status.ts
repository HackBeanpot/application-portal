import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { EXAMPLE_APPLICATION_STATUS } from '../../../common/constants';
import { protect } from '../../../server/protect';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../server/mongoDB';

export default protect(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      // stringify bc for some reason, next was removing the quotes in the response
      //return res.status(200).json(JSON.stringify(EXAMPLE_APPLICATION_STATUS));
      await getHandler(req, res);
      break;
    case 'POST':
      return res.status(201).send(undefined);
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
});

const assumeLoggedInGetStatus = async () => (await getSession())!.user!.email;

const getHandler: NextApiHandler = async (req, res) => {
  const status = await assumeLoggedInGetStatus();
  const { applicantDataCollection } = await connectToDatabase();
  const data = await applicantDataCollection.findOne({ status });
  return res.status(200).json(data);
};
