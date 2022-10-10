import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ApplicationStatus, DecisionStatus, RSVPStatus } from '../../../common/types';
import { ApplyLater, StatusDialogue } from './StatusDialogue';

describe('StatusDialogue component', () => {
  it('renders the ApplyLater component when registrationState is BeforeOpen', () => {
    render(
      <StatusDialogue
        registrationClosed={new Date('2050-12-01T22:40:02.000Z')}
        registrationOpen={new Date('2050-11-01T22:40:02.000Z')}
        confirmBy={new Date('2050-11-20T22:40:02.000Z')}
        applicationStatus={ApplicationStatus.Incomplete}
        decisionStatus={DecisionStatus.Undecided}
        rsvpStatus={RSVPStatus.Unconfirmed}
        showDecision={false}
      />
    );
    const applyLaterDialogText = screen.getByTestId('apply-later-dialog-text');

    expect(applyLaterDialogText.textContent).toBeTruthy();
  });
  describe(', an Undecided DecisionStatus and registrationState is not BeforeOpen', () => {
    it('renders the Submitted component when the applicationStatus is Submitted', () => {
      render(
        <StatusDialogue
          registrationClosed={new Date('2050-12-01T22:40:02.000Z')}
          registrationOpen={new Date('2020-11-01T22:40:02.000Z')}
          confirmBy={new Date('2050-11-20T22:40:02.000Z')}
          applicationStatus={ApplicationStatus.Submitted}
          decisionStatus={DecisionStatus.Undecided}
          rsvpStatus={RSVPStatus.Unconfirmed}
          showDecision={false}
        />
      );
      const submittedDialogText = screen.getByTestId('submitted-dialog-text');

      expect(submittedDialogText.textContent).toBeTruthy();
    });
    it('renders the Incomplete component when the applicationStatus is Incomplete and registrationState is open', () => {
      render(
        <StatusDialogue
          registrationClosed={new Date('2050-12-01T22:40:02.000Z')}
          registrationOpen={new Date('2020-11-01T22:40:02.000Z')}
          confirmBy={new Date('2050-11-20T22:40:02.000Z')}
          applicationStatus={ApplicationStatus.Incomplete}
          decisionStatus={DecisionStatus.Undecided}
          rsvpStatus={RSVPStatus.Unconfirmed}
          showDecision={false}
        />
      );
      const incompleteDialogText = screen.getByTestId('incomplete-dialog-text');

      expect(incompleteDialogText.textContent).toBeTruthy();
    });
    it('renders the DeadlinePassed component when the applicationStatus is Incomplete and registrationState is closed', () => {
      render(
        <StatusDialogue
          registrationClosed={new Date('2022-10-01T22:40:02.000Z')}
          registrationOpen={new Date('2020-11-01T22:40:02.000Z')}
          confirmBy={new Date('2021-11-20T22:40:02.000Z')}
          applicationStatus={ApplicationStatus.Incomplete}
          decisionStatus={DecisionStatus.Undecided}
          rsvpStatus={RSVPStatus.Unconfirmed}
          showDecision={false}
        />
      );
      const deadlinePassedDialogText = screen.getByTestId('deadline-passed-dialog-text');

      expect(deadlinePassedDialogText.textContent).toBeTruthy();
    });
  });
  describe('does not render any ApplicationStatusDialogue components', () => {
    it('when the DecisionStatus is Admitted', () => {
      render(
        <StatusDialogue
          registrationClosed={new Date('2022-10-01T22:40:02.000Z')}
          registrationOpen={new Date('2020-11-01T22:40:02.000Z')}
          confirmBy={new Date('2021-11-20T22:40:02.000Z')}
          applicationStatus={ApplicationStatus.Incomplete}
          decisionStatus={DecisionStatus.Admitted}
          rsvpStatus={RSVPStatus.Unconfirmed}
          showDecision={false}
        />
      );
      const submittedDialogText = screen.queryByTestId('submitted-dialog-text');
      const incompleteDialogText = screen.queryByTestId('incomplete-dialog-text');
      const deadlinePassedDialogText = screen.queryByTestId('deadline-passed-dialog-text');

      expect(submittedDialogText?.textContent).toBe(undefined);
      expect(incompleteDialogText?.textContent).toBe(undefined);
      expect(deadlinePassedDialogText?.textContent).toBe(undefined);
    });
    it('when the DecisionStatus is Waitlisted', () => {
      render(
        <StatusDialogue
          registrationClosed={new Date('2022-10-01T22:40:02.000Z')}
          registrationOpen={new Date('2020-11-01T22:40:02.000Z')}
          confirmBy={new Date('2021-11-20T22:40:02.000Z')}
          applicationStatus={ApplicationStatus.Incomplete}
          decisionStatus={DecisionStatus.Waitlisted}
          rsvpStatus={RSVPStatus.Unconfirmed}
          showDecision={false}
        />
      );
      const submittedDialogText = screen.queryByTestId('submitted-dialog-text');
      const incompleteDialogText = screen.queryByTestId('incomplete-dialog-text');
      const deadlinePassedDialogText = screen.queryByTestId('deadline-passed-dialog-text');

      expect(submittedDialogText?.textContent).toBe(undefined);
      expect(incompleteDialogText?.textContent).toBe(undefined);
      expect(deadlinePassedDialogText?.textContent).toBe(undefined);
    });
    it('when the DecisionStatus is Declined', () => {
      render(
        <StatusDialogue
          registrationClosed={new Date('2022-10-01T22:40:02.000Z')}
          registrationOpen={new Date('2020-11-01T22:40:02.000Z')}
          confirmBy={new Date('2021-11-20T22:40:02.000Z')}
          applicationStatus={ApplicationStatus.Incomplete}
          decisionStatus={DecisionStatus.Declined}
          rsvpStatus={RSVPStatus.Unconfirmed}
          showDecision={false}
        />
      );
      const submittedDialogText = screen.queryByTestId('submitted-dialog-text');
      const incompleteDialogText = screen.queryByTestId('incomplete-dialog-text');
      const deadlinePassedDialogText = screen.queryByTestId('deadline-passed-dialog-text');

      expect(submittedDialogText?.textContent).toBe(undefined);
      expect(incompleteDialogText?.textContent).toBe(undefined);
      expect(deadlinePassedDialogText?.textContent).toBe(undefined);
    });
  });
});

describe('ApplyLater', () => {
  it('renders the correct text when the ApplyLater component is rendered', () => {
    render(<ApplyLater registrationOpen="Tuesday, November 1, 2022" />);
    const applyLaterDialogText = screen.getByTestId('apply-later-dialog-text');

    expect(applyLaterDialogText.textContent).toBe('Registration Opens Tuesday, November 1, 2022');
  });
});
