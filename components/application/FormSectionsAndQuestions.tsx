import { QuestionDefinition, QuestionSection } from '../../common/types';
import { Form, FormInstance } from 'antd';
import { FormQuestion } from './FormQuestion';
import React from 'react';

type FormSectionsAndQuestionsProps = {
  sectionsAndQuestions: Array<QuestionSection | QuestionDefinition>;
  form: FormInstance;
  disabled: boolean;
};

export const FormSectionsAndQuestions: React.FC<FormSectionsAndQuestionsProps> = ({
  sectionsAndQuestions,
  form,
  disabled,
}) => {
  return (
    <>
      {sectionsAndQuestions.map((sectionOrQuestion) => {
        if (sectionOrQuestion.type === 'SECTION') {
          return (
            <Form.Item key={sectionOrQuestion.id} noStyle>
              <div className="section">{sectionOrQuestion.text}</div>
              <div className="section-description">{sectionOrQuestion.description}</div>
              {sectionOrQuestion.description != '' && <br />}
            </Form.Item>
          );
        }
        return (
          <FormQuestion
            key={sectionOrQuestion.id}
            q={sectionOrQuestion}
            form={form}
            disabled={disabled}
          />
        );
      })}
    </>
  );
};
