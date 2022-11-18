import React, { ReactElement, useEffect, useState } from 'react';
import { ApplicationResponses, ApplicationStatus, QuestionResponse } from '../../common/types';
import {
  addApplicantResponses,
  getApplicantResponses,
  getRegistrationClosed,
  getRegistrationOpen,
  getStatus,
  updateApplicantResponses,
} from '../../common/apiClient';
import { Questions, Sections } from '../../common/questions';
import { Alert, Button, Form, notification } from 'antd';
import useSWR from 'swr';
import { format } from '../dashboard/status-dialogue/StatusDialogue';
import { isAfterRegistrationClosed, isBeforeRegistrationOpens } from '../../common/utils/utils';
import { useWarnIfUnsavedChanges } from '../hooks/useWarnIfUnsavedChanges';
import { FormSectionsAndQuestions } from './FormSectionsAndQuestions';

const getStatusData = () => getStatus().then((d) => d.data);

export const ApplicationForm = (): ReactElement => {
  // data
  const { data: status } = useSWR('/api/v1/status', getStatus);
  const { data: registrationOpen } = useSWR('/api/v1/dates/registration-open', getRegistrationOpen);
  const { data: registrationClosed } = useSWR(
    '/api/v1/dates/registration-closed',
    getRegistrationClosed
  );
  const { data: userResponses, mutate: fetchUserResponses } = useSWR(
    '/api/v1/registration',
    getApplicantResponses
  );

  // state
  const [disabled, setDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm<Record<string, QuestionResponse>>();
  const [appStatus, setAppStatus] = useState(status?.data?.applicationStatus);

  // observations
  const alreadySubmitted =
    status?.data.applicationStatus === ApplicationStatus.Submitted &&
    (userResponses?.data?.responses.length ?? 0) > 0;
  const submittedFormData: Record<string, QuestionResponse> = {};
  console.log(userResponses);
  console.log(Questions);
  userResponses?.data?.responses?.forEach((response, index) => {
    // get index of question with corresponding field, in case we added a question in the middle of the application
    let questionIndex = Questions.findIndex((q) => q.field === userResponses?.data?.fields[index]);
    if (questionIndex === -1) {
      questionIndex = index;
    }
    // use question index in submittedFormData
    submittedFormData[String(questionIndex + 1)] = response;
  });
  const isEditing = alreadySubmitted && !disabled;
  const registrationOpenDate = registrationOpen?.data && new Date(registrationOpen?.data);
  const registrationCloseDate = registrationClosed?.data && new Date(registrationClosed?.data);
  const isBeforeRegistration = Boolean(
    registrationOpenDate && isBeforeRegistrationOpens(registrationOpenDate)
  );
  const isAfterRegistration = Boolean(
    registrationCloseDate && isAfterRegistrationClosed(registrationCloseDate)
  );

  // effects
  const resetFields = form.resetFields;
  useEffect(() => {
    if (alreadySubmitted || isBeforeRegistration || isAfterRegistration) {
      setDisabled(true);
      resetFields();
    }
    getStatusData().then((status) => {
      setAppStatus(status?.applicationStatus);
    });
  }, [alreadySubmitted, isAfterRegistration, isBeforeRegistration, resetFields]);

  useWarnIfUnsavedChanges(isEditing || appStatus === ApplicationStatus.Incomplete);

  const onSubmit = async (values: Record<string, QuestionResponse>) => {
    const fields = Questions.map((q) => q.field) as Array<keyof ApplicationResponses>;
    const responses = Questions.map((q) => values[q.id] ?? null);
    setIsSubmitting(true);
    const response = alreadySubmitted
      ? await updateApplicantResponses({ fields, responses })
      : await addApplicantResponses({ fields, responses });
    setIsSubmitting(false);
    if (200 <= response.status && response.status < 300) {
      getStatusData().then((status) => {
        setAppStatus(status?.applicationStatus);
      });
      await fetchUserResponses();
      window?.scrollTo({ top: 0, behavior: 'smooth' });
      setDisabled(true);
      notification.success({
        message: 'Application Successfully Submitted',
        placement: 'bottomRight',
        duration: 5,
      });
    } else {
      notification.error({
        message: 'Error Submitting Application',
        description: response.data,
        placement: 'bottomRight',
        duration: 30,
      });
    }
  };

  return (
    <>
      <h1 className="app-header">Application Page</h1>
      <div>
        <ul>
          <li>The application takes around 15-20 mins to complete.</li>
          <li>It is advised to complete it in one sitting because you can not save changes.</li>
          <li>
            After submitting, you can re-submit your application as many times as you want before
            the deadline.
          </li>
          <li>If you have questions please reach out to team@hackbeanpot.com.</li>
        </ul>
      </div>
      {registrationCloseDate && registrationOpenDate && alreadySubmitted && (
        <Alert
          className="alert"
          type="info"
          description={
            <>
              You have already submitted your application, but you may edit and resubmit your
              responses as many times as you{"'"}d like before registration closes on{' '}
              <strong>{registrationCloseDate && format(registrationCloseDate)}</strong>.
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
                      form.resetFields();
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
      )}
      <Form
        initialValues={submittedFormData}
        form={form}
        onFinish={onSubmit}
        scrollToFirstError={{ behavior: 'smooth' }}
        layout="vertical"
      >
        <FormSectionsAndQuestions sectionsAndQuestions={Sections} form={form} disabled={disabled} />
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
              {alreadySubmitted ? 'Resubmit Application' : 'Submit Application'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
