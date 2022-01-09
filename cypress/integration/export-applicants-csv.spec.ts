import { createAdminAndLogin } from '../utils';
import { join } from 'path';

export {};

const downloadsFolder = Cypress.config('downloadsFolder');

describe('export applicants to tsv', () => {
  it('downloads tsv', () => {
    createAdminAndLogin();
    cy.visit('/admin');
    // force needed on chrome, see https://github.com/HackBeanpot/application-portal/issues/114
    // not sure why adding a second click made this work (on chrome) but it did
    cy.contains('View / Modify Applicants').click({ force: true });
    cy.contains('View / Modify Applicants').click({ force: true });
    // downloads the csv
    cy.contains('Export All Data').click({ force: true });
    cy.contains('Export All Data').click({ force: true });

    const filename = join(downloadsFolder, 'applicants.csv');
    cy.readFile(filename, { timeout: 15000 }).should('have.length.gt', 50);
  });
});
