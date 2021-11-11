import { NextApiHandler } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { protect } from '../../../server/protect';

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
  // TODO: validation
  const teamName = req.query.teamName;
  const { teamDataCollection } = await connectToDatabase();

  try {
    // Checks if the team exists
    const existingTeam = await teamDataCollection.findOne({
      name: teamName,
    });

    if (existingTeam != null) {
      return res.status(200).json(existingTeam);
    } else {
      // Safely gets response
      return res.status(200).json(null);
    }
  } catch (e) {
    return res.status(400).send({ error: 'Error getting team information' });
  }
};

const postHandler: NextApiHandler = async (req, res) => {
  const { teamName, email } = req.body;
  const { userDataCollection, teamDataCollection } = await connectToDatabase();

  try {
    await userDataCollection.updateOne(
      { email },
      {
        $set: {
          teamName,
        },
      },
      { upsert: true }
    );

    const existingTeam = await teamDataCollection.findOne({
      name: teamName,
    });

    // Adds the current email to team if there is a team
    await teamDataCollection.updateOne(
      { name: teamName },
      {
        $addToSet: { userEmails: email },
      },
      { upsert: true }
    );

    return res.status(201).send(undefined);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const { teamName, email } = req.body;
  const { userDataCollection, teamDataCollection } = await connectToDatabase();
  try {
    if (typeof teamName !== 'string') {
      res.status(400).send({ error: 'Team name needs to be a string' });
    }
    // Removes team name from the user data
    await userDataCollection.updateOne(
      {
        email,
      },
      { $unset: { teamName: '' } }
    );

    const existingTeam = await teamDataCollection.findOne({
      name: teamName,
    });

    if (existingTeam != null) {
      // If the current person is the last person in the team, remove the whole object
      if (
        existingTeam.userEmails.length === 1 &&
        existingTeam.userEmails.includes(email)
      ) {
        await teamDataCollection.deleteOne({
          name: teamName,
        });
      } else {
        // Else removes the current person from the team
        await teamDataCollection.updateOne(
          {
            name: teamName,
          },
          {
            $pull: { userEmails: email },
          }
        );
      }
    }

    return res.status(204).send(undefined);
  } catch (e) {
    return res.status(400).send({ error: 'Error leaving team' });
  }
};

export default protect(teamHandler);
