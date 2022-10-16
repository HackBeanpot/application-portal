import { expect, it } from '@jest/globals';
import { queryDate } from '../../../../../server/dates/dates';
import { jestConnectToDatabase, JestMongoCtx } from '../../../../../jest';
import { SingletonType } from '../../../../../common/types';

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
  await ctx.client.close();
});

it('queryDate fetches the correct date', async () => {
  const date = await queryDate(SingletonType.ConfirmBy);
  expect(date).toBe(initialDate);
});
