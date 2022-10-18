import { expect, it } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';
import { DateSingleton, SingletonType } from '../../common/types';
import { JestMongoCtx, jestConnectToDatabase } from '../../jest';
import * as protect from '../protect';
import { getDate, postDate, queryDate } from './dates';

let ctx: JestMongoCtx;
const initialRegistrationOpenDate = '2022-09-01T22:40:02.000Z';
const initialRegistrationClosedDate = '2022-09-15T22:40:02.000Z';
const initialConfirmByDate = '2022-10-01T22:40:02.000Z';
const updatedConfirmByDate = '2022-11-01T22:40:02.000Z';

beforeEach(async () => {
  ctx = await jestConnectToDatabase();
  await ctx.serverDb.singletonDataCollection.updateOne(
    { type: SingletonType.ConfirmBy },
    {
      $set: { value: initialConfirmByDate },
    },
    { upsert: true }
  );
  await ctx.serverDb.singletonDataCollection.updateOne(
    { type: SingletonType.RegistrationOpen },
    {
      $set: { value: initialRegistrationOpenDate },
    },
    { upsert: true }
  );
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
  jest.clearAllMocks();
});

describe('queryDate', () => {
  it('fetches the correct ConfirmBy date', async () => {
    const date = await queryDate(SingletonType.ConfirmBy);
    expect(date).toBe(initialConfirmByDate);
  });
  it('fetches the correct RegistrationOpen date', async () => {
    const date = await queryDate(SingletonType.RegistrationOpen);
    expect(date).toBe(initialRegistrationOpenDate);
  });
  it('fetches the correct RegistrationClosed date', async () => {
    const date = await queryDate(SingletonType.RegistrationClosed);
    expect(date).toBe(initialRegistrationClosedDate);
  });
});

describe('getDate', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    return { req, res };
  }
  const { req, res } = mockRequestResponse();
  it('successfully fetches the ConfirmBy date', async () => {
    await getDate(req, res, SingletonType.ConfirmBy);
    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
  it('successfully fetches the RegistrationOpen date', async () => {
    await getDate(req, res, SingletonType.RegistrationOpen);
    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
  it('successfully fetches the RegistrationClosed date', async () => {
    await getDate(req, res, SingletonType.RegistrationClosed);
    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
});

describe('postDate', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    return { req, res };
  }
  const { req, res } = mockRequestResponse();
  describe('ConfirmBy date', () => {
    it('fails to post when isAdmin is false', async () => {
      jest.spyOn(protect, 'isAdmin').mockResolvedValueOnce(false);
      req.body.date = updatedConfirmByDate;
      await postDate(req, res, SingletonType.ConfirmBy);
      const getConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
        type: SingletonType.ConfirmBy,
      })) as DateSingleton;
      expect(res.statusCode).toBe(401);
      expect(res.statusMessage).toEqual('OK');
      expect(getConfirmByDate.value).toBe(initialConfirmByDate);
    });
    it('successfully posts when isAdmin is true', async () => {
      jest.spyOn(protect, 'isAdmin').mockResolvedValueOnce(true);
      req.body.date = updatedConfirmByDate;
      await postDate(req, res, SingletonType.ConfirmBy);
      const getUpdatedConfirmByDate = (await ctx.serverDb.singletonDataCollection.findOne({
        type: SingletonType.ConfirmBy,
      })) as DateSingleton;
      expect(res.statusCode).toBe(200);
      expect(res.statusMessage).toEqual('OK');
      expect(getUpdatedConfirmByDate.value).toBe(`"${updatedConfirmByDate}"`);
    });
  });
});
