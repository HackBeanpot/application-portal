import { CreateUserInBackendArg } from './types';

const CLIENT_TOKEN = Cypress.env('test-client-nextauth-token');
const SERVER_TOKEN = Cypress.env('test-server-nextauth-token');

const createUserAndLogin = async ({ email, isAdmin }: { email: string; isAdmin: boolean }) => {
  const createUserInBackendArgs: CreateUserInBackendArg = { email, isAdmin, token: SERVER_TOKEN };
  cy.task('createUserInBackend', createUserInBackendArgs);
  // should log user in and redirect to '/'
  cy.visit('/api/auth/callback/email', { qs: { token: CLIENT_TOKEN, email } });
};

export const createAdminAndLogin = async (email: string): Promise<void> => {
  await createUserAndLogin({ email, isAdmin: true });
};

export const createApplicantAndLogin = async (email: string): Promise<void> => {
  await createUserAndLogin({ email, isAdmin: false });
};

export const checkLoggedIn = () => {
  cy.get('header').should('contain', 'Application');
  cy.get('header').should('contain', 'Team');
};
