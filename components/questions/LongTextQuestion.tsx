import React, { FC } from 'react';
import { LongText } from '../../common/types';
import { Input } from 'antd';
import styles from '../../styles/components/Questions.module.scss';

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
    <div className={styles.question}>
      <label htmlFor={question.id}>
        {question.content} {question.required ? '*' : ''}
      </label>
      <Input.TextArea
        name={question.id}
        onChange={(e) => addTextAnswer(question, e.target.value)}
      />
      <div>{errorMessage}</div>
    </div>
  );
};
export default LongTextQuestion;
