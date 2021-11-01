import React, { FC } from 'react';
import { LongText } from '../../common/types';
type LongTextProps = {
  question: LongText;
  addTextAnswer: (question: LongText, answer: string) => void;
  errorMessage: string;
};
const LongTextQuestion: FC<LongTextProps> = ({
  question,
  addTextAnswer,
  errorMessage,
}) => {
  return (
    <div>
      <h2>
        {question.content} {question.required ? '*' : ''}
      </h2>
      min-length = {question.minLength}
      <br />
      max-length = {question.maxLength}
      <br />
      <textarea onChange={(e) => addTextAnswer(question, e.target.value)} />
      <div>{errorMessage}</div>
    </div>
  );
};
export default LongTextQuestion;
