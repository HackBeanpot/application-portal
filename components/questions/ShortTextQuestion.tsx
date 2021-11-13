import React, { FC } from 'react';
import { QuestionResponse, ShortText } from '../../common/types';
import { Form, FormInstance, Input } from 'antd';

type ShortTextProps = {
  question: ShortText;
  form: FormInstance<Record<string, QuestionResponse>>;
};

const ShortTextQuestion: FC<ShortTextProps> = ({ question, form }) => {
  return (
    <Form.Item
      wrapperCol={{ span: 8 }}
      className="question"
      name={question.id}
      label={<div className="short-text-label">{question.content}</div>}
      rules={[
        { required: question.required, message: 'This question is required' },
      ]}
    >
      <Input
        placeholder={question.placeholder}
        onChange={(e) =>
          form.setFieldsValue({ [question.id]: e.target.value as string })
        }
      />
    </Form.Item>
  );
};
export default ShortTextQuestion;
