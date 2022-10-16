import { Collection, Db, MongoClient } from 'mongodb';
import { SingletonDefinition, User, SingletonType } from '../../common/types';

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
const jestConnectToDatabase = async (): Promise<JestMongoCtx> => {
  const port = 27017;
  const username = 'admin';
  const password = 'password';
  const connectionString = `mongodb://${username}:${password}@localhost:${port}`;
  const client = await new MongoClient(connectionString).connect();
  const serverDb = client.db(process.env.MONGO_SERVER_DBNAME);
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

it('should correctly get the confirmByDate', async () => {
  const ctx = await jestConnectToDatabase();
  const initialDate = '2022-10-01T22:40:02.000Z';
  const insertConfirmByDate = await ctx.serverDb.singletonDataCollection.updateOne(
    { type: SingletonType.ConfirmBy },
    {
      $set: { value: initialDate },
    },
    { upsert: true }
  );
  console.log(insertConfirmByDate);
});
