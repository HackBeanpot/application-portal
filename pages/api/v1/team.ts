import { NextApiHandler } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';

const teamHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    case 'POST':
      return postHandler(req, res);
    case 'DELETE':
      return deleteHandler(req, res);
    default:
      return res
        .status(405)
        .setHeader('Allow', 'GET, POST, DELETE')
        .send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const { teamDataCollection, userDataCollection } = await connectToDatabase();
  const email = await assumeLoggedInGetEmail(req);
  const user = await userDataCollection.findOne({ email });
  const teamName = user?.teamName;
  if (!teamName) {
    return res.status(200).json(null);
  }
  const existingTeam = await teamDataCollection.findOne({ name: teamName });
  return res.status(200).json(existingTeam);
};

const postHandler: NextApiHandler = async (req, res) => {
  const email = await assumeLoggedInGetEmail(req);
  const { teamName } = req.body;
  const { userDataCollection, teamDataCollection } = await connectToDatabase();

  // make sure the user doesn't already have a team
  const user = await userDataCollection.findOne({ email });
  if (user?.teamName) {
    return res.status(400).json('user already has an existing team');
  }

  await userDataCollection.updateOne(
    { email },
    { $set: { teamName } },
    { upsert: true }
  );

  // Insert or update the team
  await teamDataCollection.updateOne(
    { name: teamName },
    { $addToSet: { userEmails: email } },
    { upsert: true }
  );

  return res.status(201).send(undefined);
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const email = await assumeLoggedInGetEmail(req);
  const { userDataCollection, teamDataCollection } = await connectToDatabase();
  const user = await userDataCollection.findOne({ email });
  const teamName = user?.teamName;
  if (!teamName) {
    return res.status(400).json("user doesn't have a team to leave");
  }

  // Removes team name from the user data
  await userDataCollection.updateOne({ email }, { $unset: { teamName: '' } });
  const existingTeam = await teamDataCollection.findOne({ name: teamName });

  // we should be guaranteed the team exists in the DB
  // If the current person is the last person in the team, remove the whole object
  if (
    existingTeam?.userEmails.length === 1 &&
    existingTeam?.userEmails.includes(email)
  ) {
    await teamDataCollection.deleteOne({ name: teamName });
  } else {
    // Else removes the current person from the team
    await teamDataCollection.updateOne(
      { name: teamName },
      { $pull: { userEmails: email } }
    );
  }

  return res.status(204).send(undefined);
};

export default protect(teamHandler);
