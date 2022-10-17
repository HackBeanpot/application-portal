import { expect, it } from '@jest/globals';
import { jestConnectToDatabase, JestMongoCtx } from '../../../../../jest';
import { DateSingleton, SingletonType } from '../../../../../common/types';

let ctx: JestMongoCtx;
const initialRegistrationOpenDate = '2022-10-01T22:40:02.000Z';
const updatedRegistrationOpenDate = '2022-10-04T22:40:02.000Z';

beforeEach(async () => {
  ctx = await jestConnectToDatabase();
  await ctx.serverDb.singletonDataCollection.updateOne(
    { type: SingletonType.RegistrationOpen },
    {
      $set: { value: initialRegistrationOpenDate },
    },
    { upsert: true }
  );
});

afterEach(async () => {
  await ctx.client.close();
});

describe('confirmByDate', () => {
  it('is correctly fetched from mongodb', async () => {
    const getRegistrationteOpenDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationOpen,
    })) as DateSingleton;
    expect(getRegistrationteOpenDate.value).toBe(initialRegistrationOpenDate);
  });

  it('is posted correctly to mongodb', async () => {
    let getRegistrationteOpenDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationOpen,
    })) as DateSingleton;
    expect(getRegistrationteOpenDate.value).toBe(initialRegistrationOpenDate);

    await ctx.serverDb.singletonDataCollection.updateOne(
      { type: SingletonType.RegistrationOpen },
      {
        $set: { value: updatedRegistrationOpenDate },
      },
      { upsert: true }
    );

    getRegistrationteOpenDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationOpen,
    })) as DateSingleton;
    expect(getRegistrationteOpenDate.value).toBe(updatedRegistrationOpenDate);
  });
});
