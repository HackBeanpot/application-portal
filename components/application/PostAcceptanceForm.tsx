import React, { useEffect, useState } from 'react';
import { Button, Form, notification, Popconfirm } from 'antd';
import { useWarnIfUnsavedChanges } from '../hooks/useWarnIfUnsavedChanges';
import {
  ApplicationStatus,
  AttendingState,
  PostAcceptanceResponses,
  QuestionResponse,
  RSVPStatus,
} from '../../common/types';
import { PostAcceptanceFormQuestions, PostAcceptanceFormSections } from '../../common/questions';
import { getConfirmBy, getStatus, updatePostAcceptanceFormResponses } from '../../common/apiClient';
import { FormSectionsAndQuestions } from './FormSectionsAndQuestions';
import useSWR, { mutate } from 'swr';

// assume this is the first time they're filling out the form
export const PostAcceptanceForm: React.FC = () => {
  const [attendingState, setAttendingState] = useState<AttendingState>(AttendingState.Unspecified);
  const { data: confirmByData } = useSWR('/api/v1/dates/confirm-by', getConfirmBy);
  const { data: submitted } = useSWR('/api/v1/status', getStatus);

  return (
    <>
      <h1 className="app-header">Application Page</h1>
      {submitted?.data.postAcceptanceStatus === ApplicationStatus.Submitted && (
        <div>you already submitted, nice</div>
      )}
      {submitted?.data.postAcceptanceStatus !== ApplicationStatus.Submitted && (
        <div>
          <Form.Item noStyle>
            {confirmByData && (
              <p>This RSVP form is DUE {new Date(confirmByData.data).toString()}.</p>
            )}
          </Form.Item>
          {attendingState === AttendingState.Unspecified ? (
            <AttendingForm setAttendingState={setAttendingState} />
          ) : null}
          {attendingState === AttendingState.Yes ? <FullForm /> : null}
        </div>
      )}
    </>
  );
};

type AttendingFormProps = {
  setAttendingState: (a: AttendingState) => void;
};
const AttendingForm: React.FC<AttendingFormProps> = ({ setAttendingState }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitAttending = () => setAttendingState(AttendingState.Yes);
  const submitNotAttending = async () => {
    setIsSubmitting(true);
    const response = await updatePostAcceptanceFormResponses({
      rsvpStatus: RSVPStatus.NotAttending,
    });
    if (200 <= response.status && response.status < 300) {
      success();
    } else {
      error(response.data);
    }
    await mutate('/api/v1/user');
    setAttendingState(AttendingState.No);
  };
  return (
    <>
      <p style={{ textAlign: 'center' }}>
        Please select if you will be attending HackBeanpot on the weekend of February 11 - 13th,
        2022. If you cannot make it, please select {'"No"'} so that we can admit others on the wait
        list instead.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Popconfirm
          title={
            <h3>
              Are you sure you would like to RSVP as {'"Not Attending"'}? Note: you will not be able
              to change your RSVP status after you submit.
            </h3>
          }
          onConfirm={submitNotAttending}
          okText="Yes"
          cancelText="No"
        >
          <Button danger style={{ marginRight: '10px' }} disabled={isSubmitting}>
            No (Not Attending)
          </Button>
        </Popconfirm>
        <Button type="primary" onClick={submitAttending} disabled={isSubmitting}>
          Yes (Attending)
        </Button>
      </div>
    </>
  );
};

const FullForm: React.FC = () => {
  const { data: status } = useSWR('/api/v1/status', getStatus);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [form] = Form.useForm();

  const submitted = status?.data?.postAcceptanceStatus === ApplicationStatus.Submitted;

  useEffect(() => {
    if (submitted) {
      setDisabled(true);
    }
  }, [submitted]);

  useWarnIfUnsavedChanges(
    status?.data?.postAcceptanceStatus === ApplicationStatus.Incomplete || disabled
  );

  const onSubmit = async (values: Record<string, QuestionResponse>) => {
    const fields = PostAcceptanceFormQuestions.map((q) => q.field) as Array<
      keyof PostAcceptanceResponses
    >;
    const responses = PostAcceptanceFormQuestions.map((q) => values[q.id] ?? null);
    setIsSubmitting(true);
    const response = await updatePostAcceptanceFormResponses({
      rsvpStatus: RSVPStatus.Confirmed,
      fields,
      responses,
    });
    setIsSubmitting(false);
    if (200 <= response.status && response.status < 300) {
      success();
      setDisabled(true);
    } else {
      error(response.data);
    }
    await mutate('/api/v1/user');
  };

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      scrollToFirstError={{ behavior: 'smooth' }}
      layout="vertical"
      key="full"
    >
      <FormSectionsAndQuestions
        sectionsAndQuestions={PostAcceptanceFormSections}
        form={form}
        disabled={disabled}
        submittedResume={false}
      />
      <Form.Item noStyle>
        <div className="submit-container">
          <Button
            className="button"
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            disabled={disabled}
            size="large"
          >
            Submit RSVP
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

const success = () => {
  notification.success({
    message: 'Post Acceptance Form Successfully Submitted!',
    placement: 'bottomRight',
    duration: 30,
  });
  window?.scrollTo({ top: 0, behavior: 'smooth' });
};

const error = (data: string) => {
  notification.error({
    message: 'Error Submitting Application',
    description: data,
    placement: 'bottomRight',
    duration: 30,
  });
};
