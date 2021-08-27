import React, { FC } from 'react';
import { LongText } from '../../common/types';
type LongTextProps = {
  question: LongText;
};
const LongTextQuestion: FC<LongTextProps> = ({ question }) => {
  return (
    <div>
      <h2>{question.content}</h2>
      {question.required ? '*' : ''}
      min-length = {question.minLength}
      <br />
      max-length = {question.maxLength}
      <br />
      <textarea />
    </div>
  );
};
export default LongTextQuestion;
