import React, { FC } from 'react';
import { Dropdown as DropdownType } from '../../common/types';
import { Select } from 'antd';
import styles from '../../styles/components/Questions.module.scss';

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
    <div>
      <label htmlFor={question.id}>
        {question.content} {question.required ? '*' : ''}
      </label>
      <br />
      <Select
        className={styles.question}
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
