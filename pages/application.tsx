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
  const [answers, updateAnswers] = useState<Answer[]>([]);
  const [hasSubmitted, updateSubmit] = useState<boolean>(false);

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

    if (wordCount <= maxLength && wordCount >= minLength) {
      removeError(id);
    }

    if (wordCount < minLength) {
      addError(id, 'Required minimum word length is ' + minLength);
    }

    if (wordCount > maxLength) {
      addError(id, 'Maximum word length is ' + maxLength);
    }

    const exists = textAnswers.find((a) => a.id === id);
    const updatedTextAnswers = textAnswers.slice();
    if (exists) {
      const objIndex = textAnswers.findIndex((a) => a.id === id);
      updatedTextAnswers[objIndex] = { id, answer };
    } else {
      updatedTextAnswers.push({ id, answer });
    }
    updateTextAnswers(updatedTextAnswers);
  };

  const addCheckboxAnswer = (id: string, answer: CheckboxValueType[]) => {
    const question = questions.find((q) => q.id === id)!;
    const selectedNumber = answer.length;
    let minNumber = 0;
    let maxNumber = 0;
    if (question.type === QuestionType.Checkboxes) {
      minNumber = question.minNumber;
      maxNumber = question.maxNumber;
    }

    if (selectedNumber <= maxNumber && selectedNumber >= minNumber) {
      removeError(id);
    }

    if (selectedNumber < minNumber) {
      addError(id, 'Required minimum checkboxes selected is ' + minNumber);
    }

    if (selectedNumber > maxNumber) {
      addError(id, 'Maximum checkboxes selected is ' + maxNumber);
    }

    const exists = checkboxAnswers.find((a) => a.id === id);
    const updatedCheckboxAnswers = checkboxAnswers.slice();
    if (exists) {
      const objIndex = checkboxAnswers.findIndex((a) => a.id === id);
      updatedCheckboxAnswers[objIndex] = { id, answer };
    } else {
      updatedCheckboxAnswers.push({ id, answer });
    }
    updateCheckboxAnswers(updatedCheckboxAnswers);
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
  };

  const addError = (id: string, error: string) => {
    const exists = errors.find((e) => e.id === id);
    const updatedErrors = errors.slice();
    if (exists) {
      const objIndex = updatedErrors.findIndex((e) => e.id === id);
      updatedErrors[objIndex] = { id, error };
    } else {
      updatedErrors.push({ id, error });
    }
    updateErrors(updatedErrors);
  };

  const removeError = (id: string) => {
    const exists = errors.find((e) => e.id === id);
    const updatedErrors = errors.slice();
    if (exists) {
      const objIndex = updatedErrors.findIndex((e) => e.id === id);
      updatedErrors.splice(objIndex, 1);
    }
    updateErrors(updatedErrors);
  };

  const findError = (id: string) => {
    const exists = errors.find((e) => e.id === id);
    if (exists) {
      return errors.find((e) => e.id === id)!.error;
    } else {
      return '';
    }
  };

  const validate = () => {
    const updatedAnswers = textAnswers.concat(checkboxAnswers, dropdownAnswers);
    updateAnswers(updatedAnswers);

    for (let i = 0; i < questions.length; i++) {
      const isRequired = questions[i].required;
      const currId = questions[i].id;

      if (isRequired) {
        const exists = answers.find((e) => e.id === currId);
        // add error if question is required
        if (exists) {
          // remove error if previous error was that the question is required
          removeError(currId);
        } else {
          addError(currId, 'This question is required');
        }
      }
    }
    updateSubmit(errors.length > 0);
    console.log('answers', answers);
    console.log('errors', errors);
    console.log('questions', questions);
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
                  key={q.id}
                  question={q}
                  addTextAnswer={addTextAnswer}
                  errorMessage={findError(q.id)}
                />
              );
            case QuestionType.LongText:
              return (
                <LongTextQuestion
                  key={q.id}
                  question={q}
                  addTextAnswer={addTextAnswer}
                  errorMessage={findError(q.id)}
                />
              );
            case QuestionType.Checkboxes:
              return (
                <CheckboxesQuestion
                  key={q.id}
                  question={q}
                  addCheckboxAnswer={addCheckboxAnswer}
                  errorMessage={findError(q.id)}
                />
              );
            case QuestionType.Dropdown:
              return (
                <DropdownQuestion
                  key={q.id}
                  question={q}
                  addDropdownAnswer={addDropdownAnswer}
                  errorMessage={findError(q.id)}
                />
              );
          }
        })}
      </div>
      <button onClick={validate}>Submit</button>
      {hasSubmitted && <div>Please fix errors before submitting.</div>}
    </>
  );
};
export default Application;
