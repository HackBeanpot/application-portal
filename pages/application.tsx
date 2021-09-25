import React, { ReactElement, useState } from 'react';
import { QuestionType } from '../common/types';
import { EXAMPLE_QUESTIONS } from '../common/constants';
import ShortTextQuestion from '../components/questions/ShortTextQuestion';
import LongTextQuestion from '../components/questions/LongTextQuestion';
import CheckboxesQuestion from '../components/questions/CheckboxesQuestion';
import DropdownQuestion from '../components/questions/DropdownQuestion';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import { Answer } from '../common/types';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const Application = (): ReactElement => {
  useSessionOrRedirect();

  const questions = EXAMPLE_QUESTIONS;
  const [textAnswers, updateTextAnswers] = useState<Answer[]>([]);
  const [checkboxAnswers, updateCheckboxAnswers] = useState<Answer[]>([]);
  const [dropdownAnswers, updateDropdownAnswer] = useState<Answer[]>([]);

  const addTextAnswer = (id: string, answer: string) => {
    const exists = textAnswers.find((a) => a.id === id);
    if (exists) {
      const objIndex = textAnswers.findIndex((a) => a.id === id);
      textAnswers[objIndex] = { id, answer };
    } else {
      textAnswers.push({ id, answer });
    }
    updateTextAnswers(textAnswers);
    console.log(textAnswers);
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

  return (
    <>
      <h1>Application Page</h1>
      <div>
        {questions.map((q) => {
          switch (q.type) {
            case QuestionType.ShortText:
              return (
                <ShortTextQuestion question={q} addTextAnswer={addTextAnswer} />
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
