import { Collection, Db, MongoClient } from 'mongodb';
import { User, SingletonDefinition } from '../common/types';

type NextAuthVerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};
type JestMongoCtx = {
  client: MongoClient;
  serverDb: {
    db: Db;
    userDataCollection: Collection<User>;
    singletonDataCollection: Collection<SingletonDefinition>;
  };
  nextAuthDb: {
    db: Db;
    verificationTokens: Collection<NextAuthVerificationToken>;
  };
};

// can't use normal connectToDatabase because we don't have access to env vars
export const jestConnectToDatabase = async (): Promise<JestMongoCtx> => {
  const port = 27017;
  const username = 'admin';
  const password = 'password';
  const connectionString = `mongodb://${username}:${password}@localhost:${port}`;
  const client = await new MongoClient(connectionString).connect();
  const serverDb = client.db('HackbeanpotCluster');
  const nextAuthDb = client.db('next-auth');
  return {
    client,
    serverDb: {
      db: serverDb,
      userDataCollection: serverDb.collection('applicant_data'),
      singletonDataCollection: serverDb.collection('singleton_data'),
    },
    nextAuthDb: {
      db: nextAuthDb,
      verificationTokens: nextAuthDb.collection('verification_tokens'),
    },
  };
};
