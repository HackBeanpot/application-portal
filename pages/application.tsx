import React, { ReactElement, useEffect, useState } from 'react';
import {
  ApplicationStatus,
  QuestionDefinition,
  QuestionResponse,
  QuestionType,
} from '../common/types';
import ShortTextQuestion from '../components/questions/ShortTextQuestion';
import LongTextQuestion from '../components/questions/LongTextQuestion';
import CheckboxesQuestion from '../components/questions/CheckboxesQuestion';
import DropdownQuestion from '../components/questions/DropdownQuestion';
import {
  getApplicantResponses,
  getRegistrationClosed,
  getRegistrationOpen,
  getStatus,
  updateApplicantResponses,
} from '../common/apiClient';
import { PageLayout } from '../components/Layout';
import { Questions, Sections } from '../common/questions';
import { Alert, Button, Form, notification } from 'antd';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import {
  ApplyLater,
  DeadlinePassed,
  format,
  Submitted,
} from '../components/dashboard/StatusDialogue';
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect';
import Router from 'next/router';
import {
  isAfterRegistrationClosed,
  isBeforeRegistrationOpens,
} from '../common/dateUtils';
import { useWarnIfUnsavedChanges } from '../components/hooks/useWarnIfUnsavedChanges';

const getQuestionComponentFromType = (type: QuestionType) => {
  switch (type) {
    case QuestionType.ShortText:
      return ShortTextQuestion;
    case QuestionType.LongText:
      return LongTextQuestion;
    case QuestionType.Dropdown:
      return DropdownQuestion;
    case QuestionType.Checkboxes:
      return CheckboxesQuestion;
    default:
      const _q: never = type;
      throw new Error('unexpected question type: ' + type);
  }
};

const Application = (): ReactElement => {
  // data
  const { data: registrationOpen } = useSWR(
    '/api/v1/dates/registration-open',
    getRegistrationOpen
  );
  const { data: status } = useSWR('/api/v1/status', getStatus);
  const { data: registrationClosed } = useSWR(
    '/api/v1/dates/registration-closed',
    getRegistrationClosed
  );
  const { data: userResponses, mutate: fetchUserResponses } = useSWR(
    '/api/v1/applicants',
    getApplicantResponses
  );

  // state
  const [disabled, setDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm<Record<string, QuestionResponse>>();

  // observations
  const alreadySubmitted =
    status?.data.applicationStatus === ApplicationStatus.Submitted &&
    (userResponses?.data?.responses?.length ?? 0) > 0;
  const submittedFormData: Record<string, QuestionResponse> = {};
  userResponses?.data?.responses?.forEach((response, index) => {
    submittedFormData[String(index + 1)] = response;
  });
  const isEditing = alreadySubmitted && !disabled;
  const registrationOpenDate =
    registrationOpen?.data && new Date(registrationOpen?.data);
  const registrationCloseDate =
    registrationClosed?.data && new Date(registrationClosed?.data);
  const isBeforeRegistration = Boolean(
    registrationOpenDate && isBeforeRegistrationOpens(registrationOpenDate)
  );
  const isAfterRegistration = Boolean(
    registrationCloseDate && isAfterRegistrationClosed(registrationCloseDate)
  );

  // effects
  useEffect(() => {
    if (alreadySubmitted || isBeforeRegistration || isAfterRegistration) {
      setDisabled(true);
      form.resetFields();
    }
  }, [alreadySubmitted, isAfterRegistration, isBeforeRegistration]);
  useWarnIfUnsavedChanges(isEditing);

  const onSubmit = async (values: Record<string, QuestionResponse>) => {
    const responses = Questions.map((q) => values[q.id] ?? null);
    setIsSubmitting(true);
    const response = await updateApplicantResponses({ responses });
    setIsSubmitting(false);
    if (200 <= response.status && response.status < 300) {
      notification.success({
        message: 'Application Successfully Submitted',
        placement: 'bottomRight',
        duration: 5,
      });
      fetchUserResponses();
      if (!alreadySubmitted) {
        await Router.push('/');
      } else {
        window?.scrollTo({ top: 0, behavior: 'smooth' });
        setDisabled(true);
      }
    } else {
      notification.error({
        message: 'Error Submitting Application',
        description: response.data,
        placement: 'bottomRight',
        duration: 30,
      });
    }
  };

  const FormQuestion = ({ q }: { q: QuestionDefinition }) => {
    const QuestionComponent = getQuestionComponentFromType(q.type);
    return React.createElement(QuestionComponent as any, {
      question: q,
      form: form,
      disabled,
    });
  };

  return (
    <PageLayout currentPage={'application'}>
      <div className="application">
        <h1>Application Page</h1>
        {registrationCloseDate && registrationOpenDate && (
          <StatusDialogue
            disabled={disabled}
            setDisabled={setDisabled}
            alreadySubmitted={alreadySubmitted}
            isBeforeRegistration={isBeforeRegistration}
            isAfterRegistration={isAfterRegistration}
            registrationCloseDate={registrationCloseDate}
            registrationOpenDate={registrationOpenDate}
            resetFields={() => form.resetFields()}
          />
        )}
        <Form
          initialValues={submittedFormData}
          form={form}
          onFinish={onSubmit}
          scrollToFirstError={{ behavior: 'smooth' }}
          layout="vertical"
        >
          {Sections.map((sectionOrQuestion) => {
            if (sectionOrQuestion.type === 'SECTION') {
              return (
                <Form.Item key={sectionOrQuestion.id} noStyle>
                  <div className="section">{sectionOrQuestion.text}</div>
                </Form.Item>
              );
            }
            return (
              <FormQuestion key={sectionOrQuestion.id} q={sectionOrQuestion} />
            );
          })}
          <Form.Item noStyle>
            <div className="submit-container">
              <Button
                disabled={disabled}
                className="button"
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                size="large"
              >
                {alreadySubmitted
                  ? 'Resubmit Application'
                  : 'Submit Application'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  getServerSideSessionOrRedirect;

type StatusDialogueProps = {
  disabled: boolean;
  setDisabled: (d: boolean) => void;
  alreadySubmitted: boolean;
  registrationOpenDate: Date;
  registrationCloseDate: Date;
  isBeforeRegistration: boolean;
  isAfterRegistration: boolean;
  resetFields: () => void;
};
const StatusDialogue: React.FC<StatusDialogueProps> = ({
  alreadySubmitted,
  registrationCloseDate,
  registrationOpenDate,
  disabled,
  setDisabled,
  isBeforeRegistration,
  isAfterRegistration,
  resetFields,
}) => {
  if (isBeforeRegistration) {
    return <ApplyLater registrationOpen={format(registrationOpenDate)} />;
  } else if (isAfterRegistration) {
    if (!alreadySubmitted) {
      return (
        <DeadlinePassed registrationClosed={format(registrationCloseDate)} />
      );
    }
    return <Submitted />;
  } else if (alreadySubmitted) {
    return (
      <Alert
        className="alert"
        type="info"
        description={
          <>
            You have already submitted your application, but you may edit and
            resubmit your responses as many times as you{"'"}d like before
            registration closes on{' '}
            <b>{registrationCloseDate && format(registrationCloseDate)}</b>.
            <div className="edit-button-container">
              <Button
                className="edit-button"
                disabled={!disabled}
                onClick={() => setDisabled(false)}
              >
                Edit my responses
              </Button>
              {!disabled && (
                <Button
                  danger
                  className="cancel-edit-button"
                  onClick={() => {
                    setDisabled(true);
                    resetFields();
                  }}
                >
                  Cancel editing
                </Button>
              )}
            </div>
          </>
        }
        message={<>Application already submitted</>}
        showIcon
      />
    );
  } else {
    return null;
  }
};

export default Application;
