import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './mongoDB';
import { DateSingleton, ShowDecisionSingleton, SingletonType } from '../common/types';
import { isAdmin } from './protect';
import { WithId } from 'mongodb';

export const queryShowDecision = async (
  showDecision: SingletonType.ShowDecision
): Promise<boolean | undefined> => {
  const { singletonDataCollection } = await connectToDatabase();
  const data = (await singletonDataCollection.findOne({
    type: showDecision,
  })) as ShowDecisionSingleton;
  return data?.value;
};

export const getShowDecision = async (
  req: NextApiRequest,
  res: NextApiResponse,
  dateName: SingletonType.ShowDecision
) => {
  const date = await queryShowDecision(dateName);
  return res.status(200).json(date);
};

export const postShowDecision = async (
  req: NextApiRequest,
  res: NextApiResponse,
  showDecision: SingletonType.ShowDecision
) => {
  // const adminCheck = await isAdmin(req);
  // if (!adminCheck) {
  //   return res.status(401).send({ message: 'User is not an admin' });
  // }

  // console.log(req.body)
  const newDecision: string = req.body.showDecision;
  console.log(newDecision);
  const { singletonDataCollection } = await connectToDatabase();
  await singletonDataCollection.updateOne(
    { type: showDecision },
    {
      $set: { value: newDecision },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};
