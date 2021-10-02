import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';
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

// // non-null assertions are ok because users must have an email, and also are guaranteed to be logged in by protect
// export const assumeLoggedInGetEmail = async () =>
//   (await getSession())!.user!.email!;

const getHandler: NextApiHandler = async (req, res) => {
  const email = await assumeLoggedInGetEmail();
  const { dataCollection } = await connectToDatabase('applicant_data');
  const data = await dataCollection.findOne({ email });
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
  const { dataCollection } = await connectToDatabase('applicant_data');
  // upsert = update, or if object doesn't exist, insert
  await dataCollection.updateOne(
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
