import { ApplicationStatus, RSVPStatus } from '../../common/types';
import { CreateUserInBackendArg, TaskHandler } from '../types';
import { cypressConnectToDatabase } from './database';

export const createUserInBackend: TaskHandler<CreateUserInBackendArg> = async (arg, config) => {
  const ctx = await cypressConnectToDatabase(config.env);
  // make sure there are no duplicate tokens/users
  const deleteUserTask = ctx.serverDb.userDataCollection.deleteMany({ email: arg.email });
  const deleteTokenTask = ctx.nextAuthDb.verificationTokens.deleteMany({
    identifier: arg.email,
  });
  await Promise.all([deleteUserTask, deleteTokenTask]);
  const insertUserTask = ctx.serverDb.userDataCollection.insertOne({
    email: arg.email,
    isAdmin: arg.isAdmin,
    applicationStatus: ApplicationStatus.Incomplete,
    rsvpStatus: RSVPStatus.Unconfirmed,
  });
  const insertTokenTask = ctx.nextAuthDb.verificationTokens.insertOne({
    identifier: arg.email,
    token: arg.token,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  await Promise.all([insertUserTask, insertTokenTask]);
  return null;
};
