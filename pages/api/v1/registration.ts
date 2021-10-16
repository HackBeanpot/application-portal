import { NextApiHandler } from 'next';
import { RegistrationApiRequest } from '../../../common/types';
import { connectToDatabase } from '../../../server/mongoDB';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';
import { attemptToValidateRegistrationApiRequest } from '../../../server/validators';
import Joi from 'joi';

const registrationHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getHandler(req, res);
      break;
    case 'POST':
      await postHandler(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const email = await assumeLoggedInGetEmail();
  const { userDataCollection } = await connectToDatabase();
  const data = await userDataCollection.findOne({ email });
  return res.status(200).json(data);
};

const postHandler: NextApiHandler = async (req, res) => {
  let result: RegistrationApiRequest;
  try {
    result = attemptToValidateRegistrationApiRequest(req.body);
  } catch (e: unknown) {
    if (Joi.isError(e)) {
      return res.status(400).json(e.message);
    }
    return res
      .status(500)
      .json('something broke. please email us immediately.');
  }

  const email = await assumeLoggedInGetEmail();
  const { userDataCollection } = await connectToDatabase();
  // upsert = update, or if object doesn't exist, insert
  await userDataCollection.updateOne(
    { email },
    {
      responses: result.responses,
      email,
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};

export default protect(registrationHandler);
