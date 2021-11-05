import React, { FC } from 'react';
import { Checkboxes } from '../../common/types';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styles from '../../styles/components/Questions.module.scss';

type CheckboxesProps = {
  question: Checkboxes;
  addCheckboxAnswer: (
    question: Checkboxes,
    addCheckboxAnswer: CheckboxValueType[]
  ) => void;
  errorMessage: string;
};
const CheckboxesQuestion: FC<CheckboxesProps> = ({
  question,
  addCheckboxAnswer,
  errorMessage,
}) => {
  const options: string[] = [];
  question.options.map((o) => options.push(o.name));
  return (
    <div className={styles.question}>
      <label htmlFor={question.id}>
        {question.content} {question.required ? '*' : ''}
      </label>
      <br />
      <Checkbox.Group
        name={question.id}
        key={question.id}
        options={options}
        onChange={(e) => addCheckboxAnswer(question, e)}
      />
      <div>{errorMessage}</div>
    </div>
  );
};
export default CheckboxesQuestion;
