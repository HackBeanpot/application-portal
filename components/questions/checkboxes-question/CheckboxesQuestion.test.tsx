import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import CheckboxesQuestion from './CheckboxesQuestion';
import { Checkboxes, QuestionResponse, QuestionType } from '../../../common/types';
import { Form } from 'antd';

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
  const [exampleForm] = Form.useForm<Record<string, QuestionResponse>>();

  it('renders', () => {
    render(<CheckboxesQuestion 
      question={exampleQuestion}
      form={exampleForm}
      disabled={false}
    />);
    const confirmedDialogText = screen.getByTestId('checkboxes-question');

    expect(confirmedDialogText).toContain(exampleContent);
    expect(confirmedDialogText).toContain("English");
    expect(confirmedDialogText).toContain("Java");
    expect(confirmedDialogText).toContain("Typescript");
    expect(confirmedDialogText).toContain("Japanese");
  });
});
