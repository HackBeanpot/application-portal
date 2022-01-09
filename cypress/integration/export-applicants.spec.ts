import { createAdminAndLogin } from '../utils';

export {};

describe('export applicants to tsv', () => {
  it('downloads tsv', () => {
    createAdminAndLogin();
    cy.visit('/admin');
    // force needed on chrome, see https://github.com/HackBeanpot/application-portal/issues/114
    cy.contains('View / Modify Applicants').click({ force: true });
    cy.contains('Export to TSV').click({ force: true });
  });
});
