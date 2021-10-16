import { NextApiHandler } from 'next';
import {
  EXAMPLE_APPLICATION_STATUS,
  RESPONSE_BY_DATE,
} from '../../../common/constants';
import { protect } from '../../../server/protect';
import { RSVPStatus } from '../../../common/types';
import { connectToDatabase } from '../../../server/mongoDB';
import { assumeLoggedInGetEmail } from './registration';

const statusHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      // stringify bc for some reason, next was removing the quotes in the response
      return res.status(200).json(JSON.stringify(EXAMPLE_APPLICATION_STATUS));
    case 'POST':
      await postHandler(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const postHandler: NextApiHandler = async (req, res) => {
  const userStatus = req.body;

  // Check that req status is one of enum type
  if (!Object.values(RSVPStatus).includes(userStatus['rsvpStatus'])) {
    return res.status(400).send({ error: 'Current RSVP Status is invalid' });
  }

  // Check response time has not yet passed
  if (RESPONSE_BY_DATE < new Date()) {
    return res.status(403).send({ error: 'Deadline has passed' });
  }

  // Update in DB here
  const email = await assumeLoggedInGetEmail();
  const { applicantDataCollection } = await connectToDatabase();

  await applicantDataCollection.updateOne(
    { email },
    {
      $set: { rsvpStatus: userStatus['rsvpStatus'] },
    },
    { upsert: true }
  );

  return res.status(201).send('Successfully updated RSVP');
};

export default protect(statusHandler);
