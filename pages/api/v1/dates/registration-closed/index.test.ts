import { expect, it, beforeEach, afterEach } from '@jest/globals';
import { jestConnectToDatabase, JestMongoCtx } from '../../../../../jest';
import { DateSingleton, SingletonType } from '../../../../../common/types';

describe('registrationClosedDate', () => {
  let ctx: JestMongoCtx;
  const initialRegistrationClosedDate = '2022-10-01T22:40:02.000Z';
  const updatedRegistrationClosedDate = '2022-10-04T22:40:02.000Z';

  beforeEach(async () => {
    ctx = await jestConnectToDatabase();
    await ctx.serverDb.singletonDataCollection.updateOne(
      { type: SingletonType.RegistrationClosed },
      {
        $set: { value: initialRegistrationClosedDate },
      },
      { upsert: true }
    );
  });

  it('is correctly fetched from mongodb', async () => {
    const getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationClosed,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(initialRegistrationClosedDate);
  });

  it('is posted correctly to mongodb', async () => {
    let getRegistrationClosedDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationClosed,
    })) as DateSingleton;
    expect(getRegistrationClosedDate.value).toBe(initialRegistrationClosedDate);

    await ctx.serverDb.singletonDataCollection.updateOne(
      { type: SingletonType.RegistrationClosed },
      {
        $set: { value: updatedRegistrationClosedDate },
      },
      { upsert: true }
    );

    getRegistrationClosedDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.RegistrationClosed,
    })) as DateSingleton;
    expect(getRegistrationClosedDate.value).toBe(updatedRegistrationClosedDate);
  });

  afterEach(async () => {
    await ctx.serverDb.singletonDataCollection.deleteOne({type: SingletonType.RegistrationClosed});
    await ctx.client.close();
  });
});
