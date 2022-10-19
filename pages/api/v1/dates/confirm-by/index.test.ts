import { expect, it, beforeEach, afterEach } from '@jest/globals';
import { jestConnectToDatabase, JestMongoCtx } from '../../../../../jest';
import { DateSingleton, SingletonType } from '../../../../../common/types';

describe('confirmByDate', () => {
  let ctx: JestMongoCtx;
  const initialConfirmByDate = '2022-10-01T22:40:02.000Z';
  const updatedConfirmByDate = '2022-10-04T22:40:02.000Z';

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

  it('is correctly fetched from mongodb', async () => {
    const getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.ConfirmBy,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(initialConfirmByDate);
  });

  it('is posted correctly to mongodb', async () => {
    let getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.ConfirmBy,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(initialConfirmByDate);

    await ctx.serverDb.singletonDataCollection.updateOne(
      { type: SingletonType.ConfirmBy },
      {
        $set: { value: updatedConfirmByDate },
      },
      { upsert: true }
    );

    getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.ConfirmBy,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(updatedConfirmByDate);
  });

  afterEach(async () => {
    await ctx.serverDb.singletonDataCollection.deleteOne({type: SingletonType.ConfirmBy});
    await ctx.client.close();
  });
});
