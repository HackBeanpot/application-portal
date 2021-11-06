import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { protect } from '../../../server/protect';
import { User } from '../../../common/types';

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
  collections: User[][],
  resData: Record<string, number>
) => {
  cat.forEach((c, ind) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collections[ind].forEach((category: { _id: string; count: number }) => {
      const id = category._id ? category._id : `Unknown ${c}`;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resData[id] = category.count;
    });
  });

  return resData;
};

export default protect(statsHandler);
// export default statsHandler;
