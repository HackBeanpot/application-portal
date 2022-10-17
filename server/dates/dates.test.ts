import { expect, it } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';
import { SingletonType } from '../../common/types';
import { JestMongoCtx, jestConnectToDatabase } from '../../jest';
import { getDate, queryDate } from './dates';

let ctx: JestMongoCtx;
const initialRegistrationOpenDate = '2022-09-01T22:40:02.000Z';
const initialRegistrationClosedDate = '2022-09-15T22:40:02.000Z';
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
  it('successfully fetches the ConfirmBy date', async () => {
    function mockRequestResponse(method: RequestMethod = 'GET') {
      const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
      return { req, res };
    }
    const { req, res } = mockRequestResponse();
    await getDate(req, res, SingletonType.ConfirmBy);
    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
  it('successfully fetches the RegistrationOpen date', async () => {
    function mockRequestResponse(method: RequestMethod = 'GET') {
      const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
      return { req, res };
    }
    const { req, res } = mockRequestResponse();
    await getDate(req, res, SingletonType.RegistrationOpen);
    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
  it('successfully fetches the RegistrationClosed date', async () => {
    function mockRequestResponse(method: RequestMethod = 'GET') {
      const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
      return { req, res };
    }
    const { req, res } = mockRequestResponse();
    await getDate(req, res, SingletonType.RegistrationClosed);
    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
});
