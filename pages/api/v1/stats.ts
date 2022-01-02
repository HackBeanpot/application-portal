import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { isAdmin, protect } from '../../../server/protect';
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
    .aggregate([
      {
        $group: {
          _id: {
            $arrayElemAt: ['$responses', 11],
          },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const ABBV_SHIRT_SIZE = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unknown'];
  const orderedShirtData = ABBV_SHIRT_SIZE.map((size: string) => {
    return {
      _id: `T-shirt ${size}`,
      count: shirtData.find((e) => e._id === (size === 'Unknown' ? null : size))
        ?.count,
    };
  });

  const yearData = await userDataCollection
    .aggregate([
      {
        $group: {
          _id: {
            $arrayElemAt: ['$responses', 7],
          },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const ABBV_YEAR = [
    '1st year',
    '2nd year',
    '3rd year',
    '4th year',
    '5th year+',
    'Unknown year',
  ];
  const orderedYearData = ABBV_YEAR.map((year: string) => {
    return {
      _id: `${year}`,
      count: yearData.find(
        (e) => e._id === (year === 'Unknown year' ? null : year)
      )?.count,
    };
  });

  const resData = convertData(
    ['status', 'shirt', 'year'],
    [statusData, orderedShirtData, orderedYearData],
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
      resData[category._id] = category.count;
    });
  });

  return resData;
};

export default protect(statsHandler);
