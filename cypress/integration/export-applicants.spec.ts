import { createAdminAndLogin } from '../utils';

export {};

describe('export applicants to tsv', () => {
  it('downloads tsv', () => {
    createAdminAndLogin();
    cy.visit('/admin');
    cy.contains('View / Modify Applicants').click();
  });
});
