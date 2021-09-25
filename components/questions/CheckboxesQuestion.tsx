import React, { FC } from 'react';
import { Checkboxes } from '../../common/types';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

type CheckboxesProps = {
  question: Checkboxes;
  addCheckboxAnswer: (
    id: string,
    addCheckboxAnswer: CheckboxValueType[]
  ) => void;
};
const CheckboxesQuestion: FC<CheckboxesProps> = ({
  question,
  addCheckboxAnswer,
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
        onChange={(e) => addCheckboxAnswer(question.id, e)}
      />
      min number = {question.minNumber}
      <br />
      max number = {question.maxNumber}
    </>
  );
};
export default CheckboxesQuestion;
