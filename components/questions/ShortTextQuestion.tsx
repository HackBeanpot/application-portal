import React, { FC } from 'react';
import { ShortText } from '../../common/types';
import { Input } from 'antd';
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
    <div className="question">
      <label htmlFor={question.id}>
        {question.content} {question.required ? '*' : ''}
      </label>
      <Input
        placeholder={question.placeholder}
        name={question.id}
        onChange={(e) => addTextAnswer(question, e.target.value)}
      />
      <div>{errorMessage}</div>
    </div>
  );
};
export default ShortTextQuestion;
