import React, { FC } from 'react';
import { ShortText } from '../../common/types';
type ShortTextProps = {
  question: ShortText;
  addTextAnswer: (id: string, answer: string) => void;
};

const ShortTextQuestion: FC<ShortTextProps> = ({ question, addTextAnswer }) => {
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
export default ShortTextQuestion;
