import { Collection, Db, MongoClient } from 'mongodb';
import { SingletonDefinition, Team, User } from '../../common/types';

type NextAuthVerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};
type CypressMongoCtx = {
  client: MongoClient;
  serverDb: {
    db: Db;
    userDataCollection: Collection<User>;
    singletonDataCollection: Collection<SingletonDefinition>;
    teamDataCollection: Collection<Team>;
  };
  nextAuthDb: {
    db: Db;
    verificationTokens: Collection<NextAuthVerificationToken>;
  };
};

// can't use normal connectToDatabase because we don't have access to env vars
export const cypressConnectToDatabase = async (
  env: Record<string, string>
): Promise<CypressMongoCtx> => {
  const port = env['MONGO_DEV_PORT'];
  const username = env['MONGO_DEV_USERNAME'];
  const password = env['MONGO_DEV_PASSWORD'];
  const connectionString = `mongodb://${username}:${password}@localhost:${port}`;
  const client = await new MongoClient(connectionString).connect();
  const serverDb = client.db(env['MONGO_SERVER_DBNAME']);
  const nextAuthDb = client.db('next-auth');
  return {
    client,
    serverDb: {
      db: serverDb,
      userDataCollection: serverDb.collection('applicant_data'),
      singletonDataCollection: serverDb.collection('singleton_data'),
      teamDataCollection: serverDb.collection('teams'),
    },
    nextAuthDb: {
      db: nextAuthDb,
      verificationTokens: nextAuthDb.collection('verification_tokens'),
    },
  };
};
