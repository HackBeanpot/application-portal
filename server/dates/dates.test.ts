import { expect, it } from '@jest/globals';
import { SingletonType } from '../../common/types';
import { JestMongoCtx, jestConnectToDatabase } from '../../jest';
import { queryDate } from './dates';

let ctx: JestMongoCtx;
const initialConfirmByDate = '2022-10-01T22:40:02.000Z';

beforeEach(async () => {
  ctx = await jestConnectToDatabase();
  await ctx.serverDb.singletonDataCollection.updateOne(
    { type: SingletonType.ConfirmBy },
    {
      $set: { value: initialConfirmByDate },
    },
    { upsert: true }
  );
});

afterEach(async () => {
  await ctx.client.close();
});

it('queryDate fetches the correct date', async () => {
  const date = await queryDate(SingletonType.ConfirmBy);
  expect(date).toBe(initialConfirmByDate);
});
