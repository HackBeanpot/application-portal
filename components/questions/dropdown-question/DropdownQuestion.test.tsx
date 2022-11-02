import { describe, expect, it } from '@jest/globals';
// import { render, screen } from '@testing-library/react';
import DropdownQuestion from './DropdownQuestion';
import { Dropdown, QuestionResponse, QuestionType } from '../../../common/types';
import { Form } from 'antd';

describe('CheckboxesQuestion component', () => {
  const exampleContent = 'How old are you?';

  jest.mock("./DropdownQuestion", () => () => {
    const n = (name: string) => ({ name });
    const exampleQuestion : Dropdown = {
      field: 'adult',
      type: QuestionType.Dropdown,
      id: '1',
      content: exampleContent,
      options: ['1', '2', '3', '4+'].map(n),
      required: true,
    };
    const [exampleForm] = Form.useForm<Record<string, QuestionResponse>>();

    return <DropdownQuestion 
      question={exampleQuestion}
      form={exampleForm}
      disabled={false}
      data-testid="dropdown-question-mock"
    />;
  });
  
  // it('renders', () => {
  //   render(<DropdownQuestion />);
  //   const confirmedDialogText = screen.getByTestId('dropdown-question');

  //   expect(confirmedDialogText).toContain(exampleContent);
  //   expect(confirmedDialogText).toContain("1");
  //   expect(confirmedDialogText).toContain("2");
  //   expect(confirmedDialogText).toContain("3");
  //   expect(confirmedDialogText).toContain("4");
  // });
});
