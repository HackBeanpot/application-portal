import { expect, it } from '@jest/globals';
import { jestConnectToDatabase, JestMongoCtx } from '../../../../../jest';
import { DateSingleton, SingletonType } from '../../../../../common/types';

describe('registrationOpenDate', () => {
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

  it('is correctly fetched from mongodb', async () => {
    const getRegistrationOpenDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationOpen,
    })) as DateSingleton;
    expect(getRegistrationOpenDate.value).toBe(initialRegistrationOpenDate);
  });

  it('is posted correctly to mongodb', async () => {
    let getRegistrationOpenDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationOpen,
    })) as DateSingleton;
    expect(getRegistrationOpenDate.value).toBe(initialRegistrationOpenDate);

    await ctx.serverDb.singletonDataCollection.updateOne(
      { type: SingletonType.RegistrationOpen },
      {
        $set: { value: updatedRegistrationOpenDate },
      },
      { upsert: true }
    );

    getRegistrationOpenDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationOpen,
    })) as DateSingleton;
    expect(getRegistrationOpenDate.value).toBe(updatedRegistrationOpenDate);
  });

  afterEach(async () => {
    await ctx.client.close();
  });
});
