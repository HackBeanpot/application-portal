import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { protect } from '../../../server/protect';
import { connectToDatabase } from '../../../server/mongoDB';

const statsHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getStats(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
};

const getStats: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userDataCollection } = await connectToDatabase();
  const statusData = await userDataCollection.aggregate([
    { $group: { _id: '$applicationStatus', count: { $sum: 1 } } },
  ]);

  return res.status(200).json(statusData);
};

export default protect(statsHandler);
