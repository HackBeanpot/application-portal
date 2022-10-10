import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ApplicationStatus } from '../../../common/types';
import { RegistrationState } from '../../hooks/use-registration-state/useRegistrationState';
import { ApplicationStatusDialogue } from './ApplicationStatusDialogue';

describe('Application Status Dialogue', () => {
  describe('has a submitted application status', () => {
    it('renders the Submitted component when registrationState is open', () => {
      render(
        <ApplicationStatusDialogue
          applicationStatus={ApplicationStatus.Submitted}
          registrationClosed={new Date('2052-10-01T22:40:02.000Z')}
          registrationState={RegistrationState.Open}
        />
      );

      const submittedDialogText = screen.getByTestId('submitted-dialog-text');
      expect(submittedDialogText.textContent).toBe(
        'Thank you for submitting your application! We will notify you by email when there is a change in your application status.'
      );
    });
    it('renders the Submitted component when registrationState is closed', () => {
      render(
        <ApplicationStatusDialogue
          applicationStatus={ApplicationStatus.Submitted}
          registrationClosed={new Date('2052-10-01T22:40:02.000Z')}
          registrationState={RegistrationState.Closed}
        />
      );

      const submittedDialogText = screen.getByTestId('submitted-dialog-text');
      expect(submittedDialogText.textContent).toBe(
        'Thank you for submitting your application! We will notify you by email when there is a change in your application status.'
      );
    });
  });

  describe('has a incomplete application status ', () => {
    it('renders the Submitted component when registrationState is open', () => {
      //expect(positive(vals)).toEqual(pos_vals);
    });

    it('renders the Submitted component when registrationState is closed', () => {
      //expect(negative(vals)).toEqual(neg_vals);
    });
  });

  it('has an unhandled application status', () => {
    //expect(positive(vals)).toEqual(pos_vals);
  });
});
