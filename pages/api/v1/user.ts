import { NextApiHandler } from 'next';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';
import { connectToDatabase } from '../../../server/mongoDB';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    default:
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const email = await assumeLoggedInGetEmail(req);
  const user = await userDataCollection.findOne({ email });
  // delete the user's id, since we don't want to expose impl details to the frontend
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete user._id;
  res.status(200).json(user);
};

export default protect(handler);
