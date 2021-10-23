import React, { ReactElement } from 'react';
import { QuestionType } from '../common/types';
import { EXAMPLE_QUESTIONS } from '../common/constants';
import ShortTextQuestion from '../components/questions/ShortTextQuestion';
import LongTextQuestion from '../components/questions/LongTextQuestion';
import CheckboxesQuestion from '../components/questions/CheckboxesQuestion';
import DropdownQuestion from '../components/questions/DropdownQuestion';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import { PageLayout } from '../components/Layout';
import { Questions } from '../common/questions';

const Application = (): ReactElement => {
  useSessionOrRedirect();
  return (
    <PageLayout currentPage={'application'}>
      <h1>Application Page</h1>
      <div>
        {Questions.map((q) => {
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
    </PageLayout>
  );
};
export default Application;
