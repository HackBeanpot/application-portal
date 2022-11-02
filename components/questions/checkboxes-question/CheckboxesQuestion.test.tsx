import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import CheckboxesQuestion from './CheckboxesQuestion';
import { Checkboxes, QuestionResponse, QuestionType } from '../../../common/types';
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
  const exampleContent = 'Your top two most proficient languages. Select at least 1, but no more than 2.';
  const exampleQuestion: Checkboxes = {
    field: 'education',
    type: QuestionType.Checkboxes,
    id: '1',
    content: exampleContent,
    minNumber: 1,
    maxNumber: 2,
    options: ['English', 'Java', 'Typescript', 'Japanese'].map(n),
    required: true,
  };

  const CheckboxesQuestionWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];

    return <CheckboxesQuestion question={exampleQuestion} form={form} disabled={false} />;
  };

  it('renders', () => {
    render(<CheckboxesQuestionWrapper />);
    const confirmedDialogText = screen.getByTestId('checkboxes-question');

    expect(confirmedDialogText.textContent).toContain(exampleContent);
    expect(confirmedDialogText.textContent).toContain("English");
    expect(confirmedDialogText.textContent).toContain("Java");
    expect(confirmedDialogText.textContent).toContain("Typescript");
    expect(confirmedDialogText.textContent).toContain("Japanese");
  });
});
