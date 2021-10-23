import React, { ReactElement, useState } from 'react';
import { QuestionType, Answer, Error, ShortText } from '../common/types';
import { EXAMPLE_QUESTIONS } from '../common/constants';
import ShortTextQuestion from '../components/questions/ShortTextQuestion';
import LongTextQuestion from '../components/questions/LongTextQuestion';
import CheckboxesQuestion from '../components/questions/CheckboxesQuestion';
import DropdownQuestion from '../components/questions/DropdownQuestion';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { updateApplicantResponses } from '../common/apiClient';
import { PageLayout } from '../components/Layout';

const Application = (): ReactElement => {
  //useSessionOrRedirect();

  const questions = EXAMPLE_QUESTIONS;
  const [textAnswers, updateTextAnswers] = useState<Answer[]>([]);
  const [checkboxAnswers, updateCheckboxAnswers] = useState<Answer[]>([]);
  const [dropdownAnswers, updateDropdownAnswer] = useState<Answer[]>([]);
  const [errors, updateErrors] = useState<Error[]>([]);
  const [answers, updateAnswers] = useState<Answer[]>([]);
  const [isErrorsOnSubmit, updateErrorsOnSubmit] = useState<boolean>(false);

  const addTextAnswer = (id: string, answer: string) => {
    const question = questions.find((q) => q.id === id)!;
    const charcterLength = answer.length;
    let minLength = 0;
    let maxLength = 0;
    if (
      question.type === QuestionType.LongText ||
      question.type === QuestionType.ShortText
    ) {
      minLength = question.minLength;
      maxLength = question.maxLength;
    }

    if (charcterLength <= maxLength && charcterLength >= minLength) {
      removeError(id);
    }

    if (charcterLength < minLength) {
      addError(
        id,
        'Required minimum response length is ' + minLength + ' characters.'
      );
    }

    if (charcterLength > maxLength) {
      addError(id, 'Maximum response length is ' + maxLength + ' characters.');
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
    const updatedDropdownAnswers = dropdownAnswers.slice();
    if (exists) {
      const objIndex = dropdownAnswers.findIndex((a) => a.id === id);
      updatedDropdownAnswers[objIndex] = { id, answer };
    } else {
      updatedDropdownAnswers.push({ id, answer });
    }
    // add a remove error
    updateDropdownAnswer(updatedDropdownAnswers);
  };

  const addError = (id: string, error: string) => {
    const exists = errors.find((e) => e.id === id);
    const updatedErrors = errors.slice();
    if (exists) {
      const objIndex = errors.findIndex((e) => e.id === id);
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
    const updatedErrors = errors.slice();

    for (let i = 0; i < questions.length; i++) {
      const isRequired = questions[i].required;
      const currId = questions[i].id;
      if (isRequired) {
        const answerExists = updatedAnswers.find((a) => a.id === currId);
        const requiredErrorExists = errors.find(
          (e) => e.error === 'This question is required' && e.id == currId
        );
        const previousErrorExists = errors.find((e) => e.id == currId);
        // remove error if previous error was that the question is required
        if (answerExists && requiredErrorExists) {
          const objIndex = updatedErrors.findIndex((e) => e.id === currId);
          updatedErrors.splice(objIndex, 1);
        }
        // add error if no answerExists and there is no previous error
        if (!answerExists && !previousErrorExists) {
          updatedErrors.push({
            id: currId,
            error: 'This question is required',
          });
        }
      }
    }

    updateErrors(updatedErrors);
    updateErrorsOnSubmit(updatedErrors.length > 0);
  };

  const submitIfValid = () => {
    validate();

    if (errors.length == 0) {
      const responses = questions.map(({ id }) => {
        const answer = answers.find((e) => e.id === id);
        if (!answer) {
          return null;
        } else {
          if (Array.isArray(answer.answer)) {
            // cast every element of list to a string
            return answer.answer.map(toString);
          } else {
            return answer.answer;
          }
        }
      });

      updateApplicantResponses({ responses });
    }
  };

  return (
    <PageLayout currentPage={'application'}>
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
      <button onClick={submitIfValid}>Submit</button>
      {isErrorsOnSubmit && <div>Please fix errors before submitting.</div>}
    </PageLayout>
  );
};
export default Application;
