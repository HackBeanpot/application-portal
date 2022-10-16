import { describe, expect, it } from '@jest/globals';
import { SingletonType, DateSingleton } from '../../common/types';
import { JestMongoCtx, jestConnectToDatabase } from '../../jest';

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

describe('confirmByDate', () => {
  it('is correctly fetched from mongodb', async () => {
    const getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.ConfirmBy,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(initialConfirmByDate);
  });
});
