import { ObjectId } from 'mongodb';
import { NextApiHandler } from 'next';
import { EXAMPLE_USER } from '../../../../common/constants';
import { connectToDatabase } from '../../../../server/mongoDB';
import { isAdmin, protect } from '../../../../server/protect';

const statusHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    // get a single applicant
    case 'GET':
      await getApplicant(req, res);
      break;
    // update a single applicant
    case 'POST':
      await postApplicant(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const getApplicant: NextApiHandler = async (req, res) => {
  //const userId = req.params.id;
  const { userDataCollection } = await connectToDatabase();
}

const postApplicant: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req);
  if (!admin) {
    return res.status(401).send({ message: 'User is not an admin' });
  }
  const {_id, ...updatedUser} = req.body;
  const { userDataCollection } = await connectToDatabase();
  console.log(updatedUser)

  await userDataCollection.replaceOne(
    { _id: new ObjectId(_id) },
      updatedUser
  );

  return res.status(201).send('Successfully updated RSVP');
};

export default protect(statusHandler);