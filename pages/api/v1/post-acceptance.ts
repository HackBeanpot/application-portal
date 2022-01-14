import { NextApiHandler } from 'next';
import { RegistrationApiRequest, RSVPStatus, SingletonType } from '../../../common/types';
import { queryDate } from '../../../server/dates';
import { isBefore } from 'date-fns';
import { attemptToValidateRegistrationApiRequest } from '../../../server/validators';
import Joi from 'joi';
import { connectToDatabase } from '../../../server/mongoDB';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';

const postAcceptanceHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      await postHandler(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const postHandler: NextApiHandler = async (req, res) => {
  const [confirmBy, registrationClosed] = await Promise.all([
    queryDate(SingletonType.ConfirmBy),
    queryDate(SingletonType.RegistrationClosed),
  ]);
  const NOW = new Date();
  if (isBefore(NOW, new Date(registrationClosed!))) {
    return res
      .status(400)
      .json('Registration is still open; cannot submit post acceptance form yet.');
  }
  if (isBefore(new Date(confirmBy!), NOW)) {
    return res.status(400).json('Confirm by date has passed; post acceptance form is now closed.');
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
  const email = await assumeLoggedInGetEmail(req);
  const { userDataCollection } = await connectToDatabase();
  // upsert = update, or if object doesn't exist, insert
  const isAttending = true;
  await userDataCollection.updateOne(
    { email },
    {
      $set: {
        responses: result.responses,
        email,
        rsvpStatus: isAttending ? RSVPStatus.Attending : RSVPStatus.NotAttending,
      },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};

export default protect(postAcceptanceHandler);
