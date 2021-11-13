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
  getStatus,
  updateApplicantResponses,
} from '../common/apiClient';
import { PageLayout } from '../components/Layout';
import { Questions } from '../common/questions';
import { Alert, Button, Form, notification } from 'antd';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { format } from '../components/dashboard/StatusDialogue';
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect';
import Router from 'next/router';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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
  const { data: status } = useSWR('/api/v1/status', getStatus);
  const { data: registrationClosed } = useSWR(
    '/api/v1/dates/registration-closed',
    getRegistrationClosed
  );
  const { data: userResponses } = useSWR(
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
    (userResponses?.data.responses.length ?? 0) > 0;
  const submittedFormData: Record<string, QuestionResponse> = {};
  userResponses?.data.responses.forEach((response, index) => {
    submittedFormData[String(index + 1)] = response;
  });

  // effects
  useEffect(() => {
    if (alreadySubmitted) {
      setDisabled(true);
    }
  }, [alreadySubmitted]);

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
        {alreadySubmitted && (
          <Alert
            className="alert"
            type="info"
            description={
              <>
                You have already submitted your application, but you may edit
                and resubmit your responses as many times as you{"'"}d like
                before registration closes on{' '}
                <b>
                  {registrationClosed?.data &&
                    format(new Date(registrationClosed.data))}
                </b>
                .
                <div className="edit-button-container">
                  <Button
                    className="edit-button"
                    disabled={!disabled}
                    onClick={() => setDisabled(false)}
                  >
                    {disabled
                      ? 'Edit my responses'
                      : 'Currently editing responses'}
                  </Button>
                </div>
              </>
            }
            message={<>Application already submitted</>}
            showIcon
          />
        )}
        <Form
          key={String(alreadySubmitted) + String(isSubmitting)}
          initialValues={submittedFormData}
          form={form}
          onFinish={onSubmit}
          scrollToFirstError={{ behavior: 'smooth' }}
          layout="vertical"
        >
          {Questions.map((q) => (
            <FormQuestion key={q.id} q={q} />
          ))}
          <Form.Item {...tailLayout}>
            <Button
              disabled={disabled}
              className="button"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              size="large"
            >
              {alreadySubmitted ? 'Resubmit Application' : 'Submit Application'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  getServerSideSessionOrRedirect;

export default Application;
