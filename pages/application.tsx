import React, { ReactElement } from 'react';
import { QuestionType } from '../common/types';
import { EXAMPLE_QUESTIONS } from '../common/constants';
import ShortTextQuestion from '../components/questions/ShortTextQuestion';
import LongTextQuestion from '../components/questions/LongTextQuestion';
import CheckboxesQuestion from '../components/questions/CheckboxesQuestion';
import DropdownQuestion from '../components/questions/DropdownQuestion';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';

const Application = (): ReactElement => {
  useSessionOrRedirect();
  return (
    <>
      <h1>Application Page</h1>
      <div>
        {EXAMPLE_QUESTIONS.map((q) => {
          switch (q.type) {
            case QuestionType.ShortText:
              return <ShortTextQuestion question={q} />;
            case QuestionType.LongText:
              return <LongTextQuestion question={q} />;
            case QuestionType.Checkboxes:
              return <CheckboxesQuestion question={q} />;
            case QuestionType.Dropdown:
              return <DropdownQuestion question={q} />;
          }
        })}
      </div>
    </>
  );
};
export default Application;
