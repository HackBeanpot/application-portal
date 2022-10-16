import { Collection, Db, MongoClient } from 'mongodb';
import { describe, expect, it } from '@jest/globals';
import { SingletonDefinition, User, SingletonType, DateSingleton } from '../../common/types';
import { getDate, queryDate } from '../dates';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';

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

let ctx: JestMongoCtx;
const initialDate = '2022-10-01T22:40:02.000Z';

beforeEach(async () => {
  ctx = await jestConnectToDatabase();
  await ctx.serverDb.singletonDataCollection.updateOne(
    { type: SingletonType.ConfirmBy },
    {
      $set: { value: initialDate },
    },
    { upsert: true }
  );
});

afterEach(async () => {
  ctx.client.close();
});

it('mongoDb should correctly get the confirmByDate', async () => {
  ctx = await jestConnectToDatabase();
  await ctx.serverDb.singletonDataCollection.updateOne(
    { type: SingletonType.ConfirmBy },
    {
      $set: { value: initialDate },
    },
    { upsert: true }
  );
  const getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
    type: SingletonType.ConfirmBy,
  })) as DateSingleton;
  expect(getConfirmByDate.value).toBe(initialDate);
});

it('test queryDate', async () => {
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
    method: 'GET',
  });
  const date = await queryDate(SingletonType.ConfirmBy);
  expect(date).toBe(initialDate);
});
