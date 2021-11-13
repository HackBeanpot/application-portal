import { isBefore } from 'date-fns';

export function isBeforeRegistrationOpens(registrationOpenDate: Date): boolean {
  const NOW = new Date();
  return isBefore(NOW, registrationOpenDate);
}

export function isAfterRegistrationClosed(registrationClosed: Date): boolean {
  const NOW = new Date();
  return isBefore(registrationClosed, NOW);
}
