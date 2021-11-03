import React, { FC } from 'react';
import { ShortText } from '../../common/types';
import styles from '../../styles/components/Questions.module.scss';
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
    <div className={styles.question}>
      <label htmlFor={question.id}>
        {question.content} {question.required ? '*' : ''}
      </label>
      <Input
        name={question.id}
        className={styles.textarea}
        onChange={(e) => addTextAnswer(question, e.target.value)}
      />
      <div>{errorMessage}</div>
    </div>
  );
};
export default ShortTextQuestion;
