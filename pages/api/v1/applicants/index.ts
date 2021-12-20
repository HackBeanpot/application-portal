import { NextApiHandler } from 'next';
import { EXAMPLE_USER } from '../../../../common/constants';
import { isAdmin, protect } from '../../../../server/protect';
import { connectToDatabase } from '../../../../server/mongoDB';

const handler: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req);
  if (!admin) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

  switch (req.method) {
    // get all the users
    // in the future, we probably want pagination on this (there will be 100+ applicants lol)
    case 'GET':
      await getHandler(req, res);
      break;
    default:
      // only allow post on the /api/v1/applicants/:id route (for updating)
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const params = req.query;
  console.log(params);

  // assume page is 1 indexed, handle errors later
  const page = Number(params?.page ?? 1);
  const pageSize = Number(params?.pageSize ?? 10);

  const { userDataCollection } = await connectToDatabase();
  const data = userDataCollection
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const totalCount = await userDataCollection.countDocuments();

  return res
    .status(200)
    .json({ data: await data.toArray(), totalCount, page, pageSize });
};

export default protect(handler);
