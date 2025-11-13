import React, { FC } from 'react';
import { Dropdown as DropdownType, QuestionResponse } from '../../common/types';
import { FormInstance, Select, Form } from 'antd';

type DropdownProps = {
  disabled: boolean;
  question: DropdownType;
  form: FormInstance<Record<string, QuestionResponse>>;
};

const DropdownQuestion: FC<DropdownProps> = ({ question, form, disabled }) => {
  return (
    <Form.Item
      className="question"
      name={question.id}
      label={question.content}
      rules={[{ required: question.required, message: 'This question is required' }]}
    >
      <Select
        disabled={disabled}
        placeholder={question.placeholder ?? 'Select'}
        allowClear
        onChange={(e) => form.setFieldsValue({ [question.id]: e as string })}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{
          overflowY: 'auto',
          zIndex: 2000,
        }}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        listHeight={256}
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
