import { NextApiHandler } from 'next';
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
  const filters = parseFilters(params?.filters);

  console.log(filters);
  const { userDataCollection } = await connectToDatabase();
  const data = userDataCollection
    .find()
    .skip((page - 1) * pageSize)
    .filter(filters)
    .limit(pageSize);
  const totalCount = await userDataCollection.countDocuments(filters);

  return res
    .status(200)
    .json({ data: await data.toArray(), totalCount, page, pageSize });
};

function parseFilters(queryString: string | string[]): Record<string, any> {
  const filterString = Array.isArray(queryString)
    ? queryString[0]
    : queryString;
  const filters: Record<string, any> = JSON.parse(filterString);
  for (const key in filters) {
    const value = filters[key];
    if (!value) {
      delete filters[key];
      continue;
    }
    filters[key] = { $in: value };
  }
  return filters;
}

export default protect(handler);
