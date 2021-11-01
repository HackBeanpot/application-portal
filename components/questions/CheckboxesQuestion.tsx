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
    <div>
      <h2>
        {question.content} {question.required ? '*' : ''}
      </h2>
      <Checkbox.Group
        key={question.id}
        options={options}
        onChange={(e) => addCheckboxAnswer(question, e)}
      />
      min number = {question.minNumber}
      <br />
      max number = {question.maxNumber}
      <div>{errorMessage}</div>
    </div>
  );
};
export default CheckboxesQuestion;
