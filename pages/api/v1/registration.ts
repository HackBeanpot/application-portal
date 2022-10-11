import { NextApiHandler } from 'next';
import {
  ApplicationStatus,
  QuestionResponse,
  RegistrationApiRequest,
  SingletonType,
} from '../../../common/types';
import { connectToDatabase } from '../../../server/mongoDB';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';
import { attemptToValidateRegistrationApiRequest } from '../../../server/validators';
import Joi from 'joi';
import { queryDate } from '../../../server/dates';
import { isBefore } from 'date-fns';

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
  const email = await assumeLoggedInGetEmail(req);
  const { userDataCollection } = await connectToDatabase();
  const data = await userDataCollection.findOne({ email });
  return res.status(200).json({
    fields: data?.applicationResponses ? Object.keys(data.applicationResponses) : [],
    responses: data?.applicationResponses ? Object.values(data.applicationResponses) : [],
  });
};

const postHandler: NextApiHandler = async (req, res) => {
  const [open, closed] = await Promise.all([
    queryDate(SingletonType.RegistrationOpen),
    queryDate(SingletonType.RegistrationClosed),
  ]);
  const NOW = new Date();
  if (isBefore(NOW, new Date(open!))) {
    return res.status(400).json('Registration is not yet open');
  }
  if (isBefore(new Date(closed!), NOW)) {
    return res.status(400).json('Registration is already closed');
  }

  let result: RegistrationApiRequest;
  try {
    result = attemptToValidateRegistrationApiRequest(req.body);
  } catch (e: unknown) {
    if (Joi.isError(e)) {
      return res.status(400).json(e.message);
    }
    return res.status(500).json('something broke. please email us immediately.');
  }

  const userResponses: Record<string, QuestionResponse> = {};

  result.fields.forEach((field, index) => {
    const response = result.responses[index];
    userResponses[field] = response;
  });

  const email = await assumeLoggedInGetEmail(req);
  const { userDataCollection } = await connectToDatabase();
  // upsert = update, or if object doesn't exist, insert
  await userDataCollection.updateOne(
    { email },
    {
      $set: {
        applicationResponses: userResponses,
        email,
        applicationStatus: ApplicationStatus.Submitted,
      },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};

export default protect(registrationHandler);
