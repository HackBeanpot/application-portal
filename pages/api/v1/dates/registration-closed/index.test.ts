import { expect, it } from '@jest/globals';
import { jestConnectToDatabase, JestMongoCtx } from '../../../../../jest';
import { DateSingleton, SingletonType } from '../../../../../common/types';

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

afterEach(async () => {
  await ctx.client.close();
});

describe('confirmByDate', () => {
  it('is correctly fetched from mongodb', async () => {
    const getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.ConfirmBy,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(initialRegistrationClosedDate);
  });

  it('is posted correctly to mongodb', async () => {
    let getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.ConfirmBy,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(initialRegistrationClosedDate);

    await ctx.serverDb.singletonDataCollection.updateOne(
      { type: SingletonType.ConfirmBy },
      {
        $set: { value: updatedRegistrationClosedDate },
      },
      { upsert: true }
    );

    getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
      type: SingletonType.ConfirmBy,
    })) as DateSingleton;
    expect(getConfirmByDate.value).toBe(updatedRegistrationClosedDate);
  });
});
