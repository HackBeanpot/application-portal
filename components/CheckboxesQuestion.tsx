import React, { FC } from 'react';
import { Checkboxes } from '../common/types';
type CheckboxesProps = {
  question: Checkboxes;
};
const CheckboxesQuestion: FC<CheckboxesProps> = ({ question }) => {
  return (
    <div>
      <h2>{question.content}</h2>
      {question.required ? '*' : ''}
      {question.options.map((o) => (
        <ul key={question.id}>{o.name}</ul>
      ))}
      min number = {question.minNumber}
      <br />
      max number = {question.maxNumber}
    </div>
  );
};
export default CheckboxesQuestion;
