import { Collection, Db, MongoClient } from 'mongodb';
import { expect, it } from '@jest/globals';
import { queryDate } from '../../../../../server/dates/dates';
import { jestConnectToDatabase } from '../../../../../jest';
import { SingletonDefinition, User, SingletonType } from '../../../../../common/types';

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
  return null;
});

afterEach(async () => {
  await ctx.client.close();
  return null;
});

it('queryDate fetches the correct date', async () => {
  const date = await queryDate(SingletonType.ConfirmBy);
  expect(date).toBe(initialDate);
  return null;
});
