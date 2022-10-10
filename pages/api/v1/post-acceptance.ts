import { NextApiHandler } from 'next';
import { ConfirmByState, RSVPStatus, SingletonType, User } from '../../../common/types';
import { queryDate } from '../../../server/dates';
import { makeQuestionResponseSchemas } from '../../../server/validators/validators';
import Joi from 'joi';
import { connectToDatabase } from '../../../server/mongoDB';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';
import { getConfirmByState } from '../../../common/utils/utils';
import { PostAcceptanceFormQuestions } from '../../../common/questions';

const postAcceptanceHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      res.status(400).json('unimplemented!');
      break;
    case 'POST':
      await postHandler(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const QuestionResponseSchemas = makeQuestionResponseSchemas(PostAcceptanceFormQuestions);

const postHandler: NextApiHandler = async (req, res) => {
  const confirmBy = await queryDate(SingletonType.ConfirmBy);
  if (!confirmBy) return res.status(500).json('confirm by not set');
  const confirmByState = getConfirmByState(new Date(JSON.parse(confirmBy)));
  if (confirmByState === ConfirmByState.After) {
    return res.status(400).json('Confirm by date has passed; post acceptance form is now closed.');
  }

  // todo: add validation later
  const { rsvpStatus, responses } = req.body;
  if (![RSVPStatus.NotAttending, RSVPStatus.Confirmed].includes(rsvpStatus)) {
    return res.status(400).json({ message: 'rsvp status not allowed' });
  }
  const userPartial: Partial<User> = {
    rsvpStatus,
  };
  if (rsvpStatus === RSVPStatus.Confirmed) {
    QuestionResponseSchemas.map((schema, i) => Joi.attempt(responses[i], schema));
    userPartial.postAcceptanceResponses = responses;
  }

  const email = await assumeLoggedInGetEmail(req);
  const { userDataCollection } = await connectToDatabase();
  await userDataCollection.updateOne(
    { email },
    { $set: { email, ...userPartial } },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};

export default protect(postAcceptanceHandler);
