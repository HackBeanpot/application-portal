import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './mongoDB';
import { DateSingleton } from '../common/types';
import { isAdmin } from './protect';

export const getDate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  dateName: DateSingleton['type']
) => {
  const { singletonDataCollection } = await connectToDatabase();
  const data = await singletonDataCollection.findOne({
    type: dateName,
  });
  return res.status(200).json(data?.value);
};

export const postDate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  dateName: DateSingleton['type']
) => {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

  const newDate: string = req.body.date;
  const { singletonDataCollection } = await connectToDatabase();
  await singletonDataCollection.updateOne(
    { type: dateName },
    {
      $set: { value: newDate },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};
