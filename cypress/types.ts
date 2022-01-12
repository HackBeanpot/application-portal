/**
 * Represents a cypress task handler generic over the argument and return type. Note:
 * the return value must not be 'undefined' (but can be 'null').
 */
import { SingletonType } from '../common/types';

export type TaskHandler<Arg, Result = null> = (
  arg: Arg,
  config: Cypress.PluginConfigOptions
) => Promise<Result> | Result;

/**
 * Represents the argument for the `createUserInBackend` task.
 *
 * When using the task, first declare the arg with this type, so that
 * if it gets changed later, all the usages of the task can be easily
 * found and updated.
 */
export type CreateUserInBackendArg = {
  email: string;
  token: string;
  isAdmin: boolean;
};

/**
 * Argument for the `configurePortalDate` task.
 */
export type ConfigurePortalDateArg = {
  dateName: SingletonType;
  value: Date;
};
