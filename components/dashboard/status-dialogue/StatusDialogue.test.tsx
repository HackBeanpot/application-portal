import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ApplyLater } from './StatusDialogue';

describe('Rsvp Dialogue', () => {
  it('renders the ApplyLater component when registrationState is BeforeOpen', () => {
    //render(<StatusDialogue />);
  });
});

describe('ApplyLater', () => {
  it('renders the correct text when the ApplyLater component is rendered', () => {
    render(<ApplyLater registrationOpen="Tuesday, November 1, 2022" />);
    const applyLaterDialogText = screen.getByTestId('apply-later-dialog-text');

    expect(applyLaterDialogText.textContent).toBe('Registration Opens Tuesday, November 1, 2022');
  });
});
