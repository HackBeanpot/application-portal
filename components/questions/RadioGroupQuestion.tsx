import React, { FC } from 'react';
import { QuestionResponse, RadioGroup } from '../../common/types';
import { FormInstance, Select, Form } from 'antd';

type RadioGroupQuestionProps = {
  disabled: boolean;
  question: RadioGroup;
  form: FormInstance<Record<string, QuestionResponse>>;
};
const DropdownQuestion: FC<RadioGroupQuestionProps> = ({ question, form, disabled }) => {
  return (
    <Form.Item
      className="question"
      name={question.id}
      wrapperCol={{ span: 8 }}
      label={question.content}
      rules={[{ required: question.required, message: 'This question is required' }]}
    ></Form.Item>
  );
};
export default DropdownQuestion;
