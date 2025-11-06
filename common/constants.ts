import { ApplicationStatus, RSVPStatus, User } from './types';

export const RESPONSE_BY_DATE = new Date('02/01/2023'); // TODO: MAKE SINGLETON IN DB
export const EXAMPLE_APPLICATION_STATUS = ApplicationStatus.Submitted;
/**
 * example json User to use for now
 */
export const EXAMPLE_USER_ID = 'user12231';
export const EXAMPLE_USER: User = {
  email: 'judysu@gmail.com',
  applicationStatus: EXAMPLE_APPLICATION_STATUS,
  isAdmin: true,
  rsvpStatus: RSVPStatus.Unconfirmed,
  applicationResponses: {},
};
// switch case where you check the type, then you can check it's required (same for all qs)
// if required == true, and response is null -> return 404
// if response valid, keep going, then check if answer type matches expected answer type
// response is string? -> good then keep going, if length of string in boundaries

export const ADMIN_TABS = {
  VIEW_STATS: 'View Stats',
  CONFIGURE_PORTAL_SETTINGS: 'Configure Portal Settings',
  VIEW_AND_MODIFY_APPLICANTS: 'View / Modify Applicants',
};
