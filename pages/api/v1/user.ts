import { NextApiHandler } from 'next';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';
import { connectToDatabase } from '../../../server/mongoDB';
import {
  ApplicationResponses,
  ApplicationStatus,
  DecisionStatus,
  ShowDecisionSingleton,
  SingletonType,
  ApplicationResponsesType,
  applicationResponsesSchema,
} from '../../../common/types';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    case 'PATCH':
      return patchHandler(req, res);
    default:
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const email = await assumeLoggedInGetEmail(req);
  const userWithId = await userDataCollection.findOne({ email });
  if (userWithId === null) {
    return res.status(200).json(null);
  }

  const { _id, ...user } = userWithId;
  if (
    !(await getShowDecisionDB()) &&
    (user.decisionStatus === DecisionStatus.Admitted ||
      user.decisionStatus === DecisionStatus.Waitlisted ||
      user.decisionStatus === DecisionStatus.Declined)
  ) {
    user.applicationStatus = ApplicationStatus.Submitted;
  }

  res.status(200).json(user);
};

const patchHandler: NextApiHandler = async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const email = await assumeLoggedInGetEmail(req);
  const userWithId = await userDataCollection.findOne({ email });
  if (userWithId === null) {
    return res.status(400).json({"message": `User with email ${email} does not exist.`});
  }

  let validBody;
  try {
    validBody = applicationResponsesSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({"error": error})
  }

  if (validBody) {
    try {
      await userDataCollection.updateOne({ email }, validBody);
    } catch (error) {
      res.status(500).json({"error": error})
    }
  }


  res.status(200)
}

const getShowDecisionDB = async (): Promise<boolean> => {
  const { singletonDataCollection } = await connectToDatabase();
  const data = (await singletonDataCollection.findOne({
    type: SingletonType.ShowDecision,
  })) as ShowDecisionSingleton;
  return data?.value;
};

export default protect(handler);
