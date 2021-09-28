import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { protect } from '../../../../server/protect';
import { connectToDatabase } from '../../../../server/mongoDB';

const regOpenHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      // stringify bc for some reason, next was removing the quotes in the response
      await getHandler(req, res);
    case 'POST':
      await postHandler(req, res);
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const { dataCollection } = await connectToDatabase('date_data');
  const data = await dataCollection.findOne({ dateType: 'registration-open' });
  return res.status(200).json(data);
};

const postHandler: NextApiHandler = async (req, res) => {
  const newDate: string = req.body.date;
  const { dataCollection } = await connectToDatabase('date_data');
  await dataCollection.updateOne(
    { dateType: 'registration-open' },
    {
      date: newDate,
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};

export default protect(regOpenHandler);
