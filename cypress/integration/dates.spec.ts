import { createAdminAndLogin, createApplicantAndLogin } from '../utils';
import { ConfigurePortalDateArg } from '../types';
import { SingletonType } from '../../common/types';

// tests for portal dates
const PATH_REG_OPEN = '/api/v1/dates/registration-open';
const PATH_REG_CLOSED = '/api/v1/dates/registration-closed';
const PATH_RSVP_BY = '/api/v1/dates/confirm-by';

context('portal dates', () => {
  beforeEach(() => {
    createAdminAndLogin('user@admin.com');
  });

  specify('registration open', () => {
    const before = cy.request('GET', PATH_REG_OPEN);
    const toSet = JSON.stringify(new Date('1999-12-01'));
    expect(before).not.to.equal(toSet);
    cy.request('POST');
  });
});
