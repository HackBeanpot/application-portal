import React, { FC } from 'react';
import { Dropdown as DropdownType } from '../../common/types';
import { Select } from 'antd';

type DropdownProps = {
  question: DropdownType;
  addDropdownAnswer: (
    question: DropdownType,
    addDropdownAnswer: string
  ) => void;
  errorMessage: string;
};
const DropdownQuestion: FC<DropdownProps> = ({
  question,
  addDropdownAnswer,
  errorMessage,
}) => {
  return (
    <div className="question">
      <label htmlFor={question.id}>
        {question.content} {question.required ? '*' : ''}
      </label>
      <br />
      <Select
        placeholder={question.placeholder ?? 'Select'}
        allowClear
        onChange={(value) =>
          value && addDropdownAnswer(question, value.toString())
        }
        dropdownMatchSelectWidth={false}
      >
        {question.options.map(({ name }) => (
          <Select.Option key={name} value={name}>
            {name}
          </Select.Option>
        ))}
      </Select>
      <div>{errorMessage}</div>
    </div>
  );
};
export default DropdownQuestion;
