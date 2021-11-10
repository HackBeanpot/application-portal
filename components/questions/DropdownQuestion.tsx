import React, { FC } from 'react';
import { Dropdown as DropdownType, QuestionResponse } from '../../common/types';
import { FormInstance, Select, Form } from 'antd';

type DropdownProps = {
  question: DropdownType;
  form: FormInstance<Record<string, QuestionResponse>>;
};
const DropdownQuestion: FC<DropdownProps> = ({ question, form }) => {
  return (
    <Form.Item
      className="question"
      name={question.id}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      label={question.content}
      rules={[
        { required: question.required, message: 'This question is required' },
      ]}
    >
      <Select
        placeholder={question.placeholder ?? 'Select'}
        allowClear
        onChange={(e) => form.setFieldsValue({ [question.id]: e as string })}
        dropdownMatchSelectWidth={false}
      >
        {question.options.map(({ name }) => (
          <Select.Option key={name} value={name}>
            {name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
export default DropdownQuestion;
