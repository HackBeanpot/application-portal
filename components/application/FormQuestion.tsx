import { QuestionDefinition, QuestionType } from '../../common/types';
import ShortTextQuestion from '../questions/ShortTextQuestion';
import LongTextQuestion from '../questions/LongTextQuestion';
import DropdownQuestion from '../questions/dropdown-question/DropdownQuestion';
import CheckboxesQuestion from '../questions/checkboxes-question/CheckboxesQuestion';
import FileUploadQuestion from '../questions/FileUploadQuestion';
import { assertUnreachable } from '../../common/utils/utils';
import React from 'react';
import { FormInstance } from 'antd';

export const getQuestionComponentFromType = (type: QuestionType) => {
  switch (type) {
    case QuestionType.ShortText:
      return ShortTextQuestion;
    case QuestionType.LongText:
      return LongTextQuestion;
    case QuestionType.Dropdown:
      return DropdownQuestion;
    case QuestionType.Checkboxes:
      return CheckboxesQuestion;
    case QuestionType.FileUpload:
      return FileUploadQuestion;
    default:
      assertUnreachable(type);
  }
};

type FormQuestionProps = {
  q: QuestionDefinition;
  form: FormInstance;
  disabled: boolean;
};

export const FormQuestion: React.FC<FormQuestionProps> = ({ q, form, disabled }) => {
  const QuestionComponent = getQuestionComponentFromType(q.type);
  return React.createElement(QuestionComponent as any, {
    question: q,
    form,
    disabled,
  });
};
