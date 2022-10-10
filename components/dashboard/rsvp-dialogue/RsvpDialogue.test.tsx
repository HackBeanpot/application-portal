import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { RSVPStatus } from '../../../common/types';
import { RsvpDialogue } from './RsvpDialogue';

describe('Rsvp Dialogue', () => {
  it('renders the Confirmed component when RSVPStatus is Confirmed', () => {
    render(<RsvpDialogue rsvpStatus={RSVPStatus.Confirmed} />);
    const confirmedDialogText = screen.getByTestId('confirmed-dialog-text');
    expect(confirmedDialogText.textContent).toBe(
      "We look forward to seeing you the weekend of the event! Stay on the lookout for emails regarding logistics closer to the date of the event, and in the meantime if you have any questions, don't hesitate to email us at team@hackbeanpot.com!"
    );
  });
  it('renders the NotAttending component when RSVPStatus is NotAttending', () => {
    render(<RsvpDialogue rsvpStatus={RSVPStatus.NotAttending} />);
    const notAttendingDialogText = screen.getByTestId('not-attending-dialog-text');
    expect(notAttendingDialogText.textContent).toBe(
      "We're sorry that you are not able to attend HackBeanpot 2022, and appreciate you letting us know. We hope that you continue to apply to our events in the future!"
    );
  });
});
