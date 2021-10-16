import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './mongoDB';
import { SingletonDefinition } from '../common/types';
import { isAdmin } from './protect';

export const getDate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  dateName: string
) => {
  const { singletonDataCollection } = await connectToDatabase();
  const data = (await singletonDataCollection.findOne({
    name: dateName,
  })) as SingletonDefinition;
  return res.status(200).json(data.value);
};

export const postDate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  dateName: string
) => {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

  const newDate: string = req.body.date;
  const { singletonDataCollection } = await connectToDatabase();
  await singletonDataCollection.updateOne(
    { name: dateName },
    {
      $set: { value: newDate },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};
