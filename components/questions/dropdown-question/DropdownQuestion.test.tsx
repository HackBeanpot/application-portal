import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
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

  it('renders', () => {
    render(<DropdownQuestionWrapper />);
    const confirmedDialogText = screen.getByTestId('dropdown-question');

    expect(confirmedDialogText.textContent).toContain(exampleContent);
    expect(confirmedDialogText.textContent).toContain("1");
    expect(confirmedDialogText.textContent).toContain("2");
    expect(confirmedDialogText.textContent).toContain("3");
    expect(confirmedDialogText.textContent).toContain("4");
  });
});
