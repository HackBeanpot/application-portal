import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { protect } from '../../../server/protect';

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
  const statusData = await userDataCollection
    .aggregate([{ $group: { _id: '$applicationStatus', count: { $sum: 1 } } }])
    .toArray();

  const shirtData = await userDataCollection
    .aggregate([{ $group: { _id: '$shirtSize', count: { $sum: 1 } } }])
    .toArray();

  const yearData = await userDataCollection
    .aggregate([{ $group: { _id: '$yearOfEducation', count: { $sum: 1 } } }])
    .toArray();

  return res.status(200).json({ statusData, shirtData, yearData });
};

export default protect(statsHandler);
