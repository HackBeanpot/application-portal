import React, { FC } from 'react';
import { Checkboxes, QuestionResponse } from '../../common/types';
import { Checkbox, Form, FormInstance } from 'antd';
import { questionLayout } from '../../pages/application';

type CheckboxesProps = {
  question: Checkboxes;
  form: FormInstance<Record<string, QuestionResponse>>;
};
const CheckboxesQuestion: FC<CheckboxesProps> = ({ question, form }) => {
  const options: string[] = [];
  question.options.map((o) => options.push(o.name));
  return (
    <Form.Item
      className="question"
      name={question.id}
      {...questionLayout}
      label={question.content}
      rules={[
        { required: question.required, message: 'This question is required' },
        {
          type: 'array',
          min: question.minNumber,
          message: `Select at least ${question.minNumber} option(s)`,
        },
        {
          type: 'array',
          max: question.maxNumber,
          message: `Select at most ${question.maxNumber} option(s)`,
        },
      ]}
    >
      <Checkbox.Group
        key={question.id}
        options={options}
        onChange={(e) => form.setFieldsValue({ [question.id]: e as string[] })}
      />
    </Form.Item>
  );
};
export default CheckboxesQuestion;
