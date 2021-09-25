import React, { FC } from 'react';
import { LongText } from '../../common/types';
type LongTextProps = {
  question: LongText;
  addTextAnswer: (id: string, answer: string) => void;
};
const LongTextQuestion: FC<LongTextProps> = ({ question, addTextAnswer }) => {
  return (
    <div>
      <h2>{question.content}</h2>
      {question.required ? '*' : ''}
      min-length = {question.minLength}
      <br />
      max-length = {question.maxLength}
      <br />
      <textarea onChange={(e) => addTextAnswer(question.id, e.target.value)} />
    </div>
  );
};
export default LongTextQuestion;
