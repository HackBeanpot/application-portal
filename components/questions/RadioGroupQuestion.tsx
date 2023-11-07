import React, { FC } from 'react';
import { QuestionResponse, RadioGroup } from '../../common/types';
import { FormInstance, Form, Radio } from 'antd';

type RadioGroupQuestionProps = {
    disabled: boolean;
    question: RadioGroup;
    form: FormInstance<Record<string, QuestionResponse>>;
};
const DropdownQuestion: FC<RadioGroupQuestionProps> = ({ question, form, disabled, }) => {
    return (
        <Form.Item
            className="question"
            name={question.id}
            wrapperCol={{ span: 8 }}
            label={question.content}
            rules={[{ required: question.required, message: 'This question is required' }]}
        >
            {question.placeholder}
            <Radio.Group
                disabled={disabled}
                buttonStyle='solid'
                onChange={(e) => { form.setFieldsValue({ [question.field]: e.target.value as string }) }}
            >
                {question.options.map(({ name }) => (
                    <Radio.Button key={name} value={name}>
                        {name}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};
export default DropdownQuestion;
