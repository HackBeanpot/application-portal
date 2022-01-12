import { ConfigurePortalDateArg, TaskHandler } from '../types';
import { cypressConnectToDatabase } from './database';

export const configurePortalDate: TaskHandler<ConfigurePortalDateArg> = async (arg, config) => {
  const newDate: string = JSON.stringify(arg.value);
  const { serverDb } = await cypressConnectToDatabase(config.env);
  await serverDb.singletonDataCollection.updateOne(
    { type: arg.dateName },
    { $set: { value: newDate } },
    { upsert: true }
  );
  return null;
};
