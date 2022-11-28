import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DropdownQuestion from './DropdownQuestion';
import { Dropdown, QuestionResponse, QuestionType } from '../../../common/types';
import { Form } from 'antd';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('CheckboxesQuestion component', () => {
  const n = (name: string) => ({ name });
  const exampleContent = 'How old are you?';
  const exampleQuestion: Dropdown = {
    field: 'adult',
    type: QuestionType.Dropdown,
    id: '1',
    content: exampleContent,
    options: ['1', '2', '3', '4+'].map(n),
    required: true,
  };
  
  const DropdownQuestionWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];

    return <DropdownQuestion question={exampleQuestion} form={form} disabled={false} />;
  };

  const DisabledDropdownQuestionWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];

    return <DropdownQuestion question={exampleQuestion} form={form} disabled={true} />;
  };

  it('renders', () => {
    render(<DropdownQuestionWrapper />);
    const confirmedDialogText = screen.getByTestId('dropdown-question');

    expect(confirmedDialogText.textContent).toContain(exampleContent);
    expect(confirmedDialogText.textContent).toContain("Select");
  });

  // it('renders the correct dropdown values', async () => {
  //   render(<DropdownQuestionWrapper />);
  //   const confirmedDialogText = screen.getByTestId('dropdown-question');

  //   if (confirmedDialogText instanceof Element) {
  //     fireEvent.mouseDown(confirmedDialogText);
  //   }
  //   await waitFor(() => expect(screen.getAllByText('1')).toHaveLength(2));

  //   if (confirmedDialogText instanceof Element) {
  //     fireEvent.mouseDown(confirmedDialogText);
  //   }
  //   await waitFor(() => expect(screen.getAllByText('2')).toHaveLength(2));
  // });

  it('does not render options when clicked, if it is disabled', async () => {
    render(<DisabledDropdownQuestionWrapper />);
    const confirmedDialogText = screen.getByTestId('dropdown-question').firstElementChild;

    if (confirmedDialogText instanceof Element) {
      fireEvent.mouseDown(confirmedDialogText);
    }
    await waitFor(() => expect(screen.getAllByText('1')).toHaveLength(0));
  });
});
