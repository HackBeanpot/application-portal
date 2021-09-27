import React, { ReactElement, useState } from 'react';
import { QuestionType, Answer, Error, ShortText } from '../common/types';
import { EXAMPLE_QUESTIONS } from '../common/constants';
import ShortTextQuestion from '../components/questions/ShortTextQuestion';
import LongTextQuestion from '../components/questions/LongTextQuestion';
import CheckboxesQuestion from '../components/questions/CheckboxesQuestion';
import DropdownQuestion from '../components/questions/DropdownQuestion';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const Application = (): ReactElement => {
  //useSessionOrRedirect();

  const questions = EXAMPLE_QUESTIONS;
  const [textAnswers, updateTextAnswers] = useState<Answer[]>([]);
  const [checkboxAnswers, updateCheckboxAnswers] = useState<Answer[]>([]);
  const [dropdownAnswers, updateDropdownAnswer] = useState<Answer[]>([]);
  const [errors, updateErrors] = useState<Error[]>([]);

  const addTextAnswer = (id: string, answer: string) => {
    const question = questions.find((q) => q.id === id)!;
    const wordCount = answer.split(' ').length;
    let minLength = 0;
    let maxLength = 0;
    if (
      question.type === QuestionType.LongText ||
      question.type === QuestionType.ShortText
    ) {
      minLength = question.minLength;
      maxLength = question.maxLength;
    }

    if (wordCount <= maxLength && answer.split(' ').length >= minLength) {
      addError(id, '');
    }

    if (wordCount < minLength) {
      addError(id, 'Required minimum word length is ' + minLength);
    }

    if (wordCount > maxLength) {
      addError(id, 'Required maximum word length is ' + maxLength);
    }

    const exists = textAnswers.find((a) => a.id === id);
    if (exists) {
      const objIndex = textAnswers.findIndex((a) => a.id === id);
      textAnswers[objIndex] = { id, answer };
    } else {
      textAnswers.push({ id, answer });
    }
    updateTextAnswers(textAnswers);
  };

  const addCheckboxAnswer = (id: string, answer: CheckboxValueType[]) => {
    const exists = checkboxAnswers.find((a) => a.id === id);
    if (exists) {
      const objIndex = checkboxAnswers.findIndex((a) => a.id === id);
      checkboxAnswers[objIndex] = { id, answer };
    } else {
      checkboxAnswers.push({ id, answer });
    }
    updateCheckboxAnswers(checkboxAnswers);
    console.log(checkboxAnswers);
  };

  const addDropdownAnswer = (id: string, answer: string) => {
    const exists = dropdownAnswers.find((a) => a.id === id);
    if (exists) {
      const objIndex = dropdownAnswers.findIndex((a) => a.id === id);
      dropdownAnswers[objIndex] = { id, answer };
    } else {
      dropdownAnswers.push({ id, answer });
    }
    updateDropdownAnswer(dropdownAnswers);
    console.log(dropdownAnswers);
  };

  const addError = (id: string, error: string) => {
    const exists = errors.find((e) => e.id === id);
    if (exists) {
      const objIndex = errors.findIndex((e) => e.id === id);
      errors[objIndex] = { id, error };
    } else {
      errors.push({ id, error });
    }
    updateErrors(errors);
  };

  const findError = (id: string) => {
    const exists = errors.find((e) => e.id === id);
    console.log(errors);
    if (exists) {
      console.log(errors.find((e) => e.id === id)!.error);
      return errors.find((e) => e.id === id)!.error;
    } else {
      return 'does not have error';
    }
  };

  return (
    <>
      <h1>Application Page</h1>
      <div>
        {questions.map((q) => {
          switch (q.type) {
            case QuestionType.ShortText:
              return (
                <ShortTextQuestion
                  question={q}
                  addTextAnswer={addTextAnswer}
                  errorMessage={(id: string) => findError(id)}
                />
              );
            case QuestionType.LongText:
              return (
                <LongTextQuestion question={q} addTextAnswer={addTextAnswer} />
              );
            case QuestionType.Checkboxes:
              return (
                <CheckboxesQuestion
                  question={q}
                  addCheckboxAnswer={addCheckboxAnswer}
                />
              );
            case QuestionType.DropDown:
              return (
                <DropdownQuestion
                  question={q}
                  addDropdownAnswer={addDropdownAnswer}
                />
              );
          }
        })}
      </div>
      <button onClick={() => console.log(textAnswers)}>Submit</button>
    </>
  );
};
export default Application;
