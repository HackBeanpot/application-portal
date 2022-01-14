import { User } from '../common/types';
import { CreateUserInBackendArg } from './types';

const CLIENT_TOKEN = Cypress.env('test-client-nextauth-token');
const SERVER_TOKEN = Cypress.env('test-server-nextauth-token');

const createUserAndLogin = async ({
  email,
  isAdmin,
  user,
}: {
  email: string;
  isAdmin: boolean;
  user?: Partial<User>;
}) => {
  const createUserInBackendArgs: CreateUserInBackendArg = {
    email,
    isAdmin,
    token: SERVER_TOKEN,
    user,
  };
  cy.task('createUserInBackend', createUserInBackendArgs);
  // should log user in and redirect to '/'
  cy.visit('/api/auth/callback/email', { qs: { token: CLIENT_TOKEN, email } });
};

export const createAdminAndLogin = async (email = 'admin@domain.com'): Promise<void> => {
  await createUserAndLogin({ email, isAdmin: true });
};

export const createApplicantAndLogin = async (
  email = 'applicant@domain.com',
  user?: Partial<User>
): Promise<void> => {
  await createUserAndLogin({ email, isAdmin: false, user });
};

export const checkLoggedIn = (): void => {
  cy.get('header').should('contain', 'Application');
  cy.get('header').should('contain', 'Team');
};
