import React, { FC, useEffect, useState } from 'react';
import { LongText, QuestionResponse } from '../../../common/types';
import { Input, Form, FormInstance } from 'antd';

type LongTextProps = {
  disabled: boolean;
  question: LongText;
  form: FormInstance<Record<string, QuestionResponse>>;
};

const MAX_WORD_LENGTH = 250;
const LongTextQuestion: FC<LongTextProps> = ({ question, form, disabled }) => {
  const [value, setValue] = useState<string>(form.getFieldValue(question.id) || '');

  const numWords = value.split(' ').filter(String).length;

  const handleOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newWordCount = e.target.value.split(' ').filter(String).length;

    if (newWordCount <= MAX_WORD_LENGTH || newWordCount - numWords < 0) {
      form.setFieldsValue({ [question.id]: e.target.value as string });
      setValue(e.target.value);
    }
  };

  return (
    <>
      <Form.Item
        data-testid="longText-question"
        className="question"
        name={question.id}
        label={question.content}
        rules={[
          { required: question.required, message: 'This question is required' },
          {
            type: 'string',
            min: question.minLength,
            message: `Response must be at least ${question.minLength} characters`,
          },
          {
            type: 'string',
            max: question.maxLength,
            message: `Response is limited to at most ${question.maxLength} characters`,
          },
        ]}
      >
        <>
          <Input.TextArea
            data-testid="inputText"
            disabled={disabled}
            onChange={handleOnChange}
            value={form.getFieldValue(question.id)}
            autoSize={{ minRows: 4 }}
          />
          <div
            style={{ color: 'GrayText', width: '100%', textAlign: 'right' }}
          >{`${numWords}/${MAX_WORD_LENGTH}`}</div>
        </>
      </Form.Item>
    </>
  );
};
export default LongTextQuestion;
