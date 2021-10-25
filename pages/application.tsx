import React, { ReactElement, useState } from 'react';
import {
  QuestionType,
  Answer,
  ShortText,
  LongText,
  Checkboxes,
  Dropdown,
  QuestionDefinition,
} from '../common/types';
import ShortTextQuestion from '../components/questions/ShortTextQuestion';
import LongTextQuestion from '../components/questions/LongTextQuestion';
import CheckboxesQuestion from '../components/questions/CheckboxesQuestion';
import DropdownQuestion from '../components/questions/DropdownQuestion';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { updateApplicantResponses } from '../common/apiClient';
import { PageLayout } from '../components/Layout';
import { Questions } from '../common/questions';

export interface Error {
  id: string;
  error: string;
}

const createOrUpdateAnswer = (
  prevAnswers: Answer[],
  id: string,
  answer: string | CheckboxValueType[]
) => {
  const updatedAnswers = prevAnswers.slice();
  const prevAnswerIndex = prevAnswers.findIndex((a) => a.id === id);
  if (prevAnswerIndex !== -1) {
    updatedAnswers[prevAnswerIndex] = { id, answer };
  } else {
    updatedAnswers.push({ id, answer });
  }
  return updatedAnswers;
};

const Application = (): ReactElement => {
  useSessionOrRedirect();

  const [textAnswers, setTextAnswers] = useState<Answer[]>([]);
  const [checkboxAnswers, setCheckboxAnswers] = useState<Answer[]>([]);
  const [dropdownAnswers, setDropdownAnswer] = useState<Answer[]>([]);
  const [errors, setErrors] = useState<Error[]>([]);
  const [hasErrorsOnSubmit, setHasErrorsOnSubmit] = useState<boolean>(false);
  const answers = textAnswers.concat(checkboxAnswers, dropdownAnswers);

  const addTextAnswer = (question: ShortText | LongText, answer: string) => {
    const characterLength = answer.length;
    const minLength = question.minLength;
    const maxLength = question.maxLength;
    const tooShort = characterLength < minLength;
    const tooLong = maxLength < characterLength;

    if (!tooShort && !tooLong) {
      removeError(question.id);
    } else if (tooShort) {
      addError(
        question.id,
        'Required minimum response length is ' + minLength + ' characters.'
      );
    } else if (tooLong) {
      addError(
        question.id,
        'Maximum response length is ' + maxLength + ' characters.'
      );
    }

    setTextAnswers(createOrUpdateAnswer(textAnswers, question.id, answer));
  };

  const addCheckboxAnswer = (
    question: Checkboxes,
    answer: CheckboxValueType[]
  ) => {
    const selectedNumber = answer.length;
    const minNumber = question.minNumber;
    const maxNumber = question.maxNumber;

    if (selectedNumber <= maxNumber && selectedNumber >= minNumber) {
      removeError(question.id);
    }

    if (selectedNumber < minNumber) {
      addError(
        question.id,
        'Required minimum checkboxes selected is ' + minNumber
      );
    }

    if (selectedNumber > maxNumber) {
      addError(question.id, 'Maximum checkboxes selected is ' + maxNumber);
    }

    setCheckboxAnswers(
      createOrUpdateAnswer(checkboxAnswers, question.id, answer)
    );
  };

  const addDropdownAnswer = (question: Dropdown, answer: string) => {
    setDropdownAnswer(
      createOrUpdateAnswer(dropdownAnswers, question.id, answer)
    );
  };

  const addError = (id: string, error: string) => {
    const existingErrorIndex = errors.findIndex((e) => e.id === id);
    const updatedErrors = errors.slice();
    if (existingErrorIndex !== -1) {
      updatedErrors[existingErrorIndex] = { id, error };
    } else {
      updatedErrors.push({ id, error });
    }
    setErrors(updatedErrors);
  };

  const removeError = (id: string) => {
    const existingErrorIndex = errors.findIndex((e) => e.id === id);
    if (existingErrorIndex !== -1) {
      const updatedErrors = errors.slice();
      updatedErrors.splice(existingErrorIndex, 1);
      setErrors(updatedErrors);
    }
  };

  const validate = () => {
    const updatedErrors = errors.slice();

    for (let i = 0; i < Questions.length; i++) {
      const isRequired = Questions[i].required;
      const currId = Questions[i].id;
      if (isRequired) {
        const answerExists = answers.find((a) => a.id === currId);
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

    setErrors(updatedErrors);
    setHasErrorsOnSubmit(updatedErrors.length > 0);
    return updatedErrors;
  };

  const submitIfValid = () => {
    const errors = validate();

    if (errors.length == 0) {
      const responses = Questions.map(({ id }) => {
        const answer = answers.find((e) => e.id === id);
        if (!answer) {
          return null;
        } else {
          if (Array.isArray(answer.answer)) {
            // cast every element of list to a string
            return answer.answer.map((curr) => curr.toString());
          } else {
            return answer.answer;
          }
        }
      });
      updateApplicantResponses({ responses });
    }
  };

  const renderAll = (q: QuestionDefinition) => {
    const errorMessage = errors.find((e) => e.id === q.id)?.error ?? '';
    switch (q.type) {
      case QuestionType.ShortText:
        return (
          <ShortTextQuestion
            key={q.id}
            question={q}
            addTextAnswer={addTextAnswer}
            errorMessage={errorMessage}
          />
        );
      case QuestionType.LongText:
        return (
          <LongTextQuestion
            key={q.id}
            question={q}
            addTextAnswer={addTextAnswer}
            errorMessage={errorMessage}
          />
        );
      case QuestionType.Checkboxes:
        return (
          <CheckboxesQuestion
            key={q.id}
            question={q}
            addCheckboxAnswer={addCheckboxAnswer}
            errorMessage={errorMessage}
          />
        );
      case QuestionType.Dropdown:
        return (
          <DropdownQuestion
            key={q.id}
            question={q}
            addDropdownAnswer={addDropdownAnswer}
            errorMessage={errorMessage}
          />
        );
    }
  };

  return (
    <PageLayout currentPage={'application'}>
      <h1>Application Page</h1>
      <div>{Questions.map((q) => renderAll(q))}</div>
      <button onClick={submitIfValid}>Submit</button>
      {hasErrorsOnSubmit && <div>Please fix errors before submitting.</div>}
    </PageLayout>
  );
};
export default Application;
