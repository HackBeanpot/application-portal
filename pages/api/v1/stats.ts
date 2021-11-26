import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { isAdmin, protect } from '../../../server/protect';
import { User } from '../../../common/types';
import { Document } from 'mongodb';

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
  const adminCheck = await isAdmin(req);
  if (!adminCheck) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

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

  const resData = convertData(
    ['status', 'shirt', 'year'],
    [statusData, shirtData, yearData],
    {}
  );

  const total = await userDataCollection.find().toArray();
  resData['Total'] = total.length;

  return res.status(200).json(resData);
};

const convertData = (
  cat: string[],
  collections: Document[][],
  resData: Record<string, number>
) => {
  cat.forEach((c, ind) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collections[ind].forEach((category: { _id: string; count: number }) => {
      const id = category._id ? category._id : `Unknown ${c}`;
      resData[id] = category.count;
    });
  });

  return resData;
};

export default protect(statsHandler);
