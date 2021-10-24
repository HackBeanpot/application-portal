import React, { FC } from 'react';
import { Checkboxes } from '../../common/types';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

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
    <>
      <h2>{question.content}</h2>
      {question.required ? '*' : ''}
      <Checkbox.Group
        key={question.id}
        options={options}
        onChange={(e) => addCheckboxAnswer(question, e)}
      />
      min number = {question.minNumber}
      <br />
      max number = {question.maxNumber}
      <div>{errorMessage}</div>
    </>
  );
};
export default CheckboxesQuestion;
