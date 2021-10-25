import React, { FC } from 'react';
import { ShortText } from '../../common/types';
type ShortTextProps = {
  question: ShortText;
  addTextAnswer: (question: ShortText, answer: string) => void;
  errorMessage: string;
};

const ShortTextQuestion: FC<ShortTextProps> = ({
  question,
  addTextAnswer,
  errorMessage,
}) => {
  return (
    <div>
      <h2>{question.content}</h2>
      {question.required ? '*' : ''}
      min-length = {question.minLength}
      <br />
      max-length = {question.maxLength}
      <br />
      <textarea onChange={(e) => addTextAnswer(question, e.target.value)} />
      <div>{errorMessage}</div>
    </div>
  );
};
export default ShortTextQuestion;
