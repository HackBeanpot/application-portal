import React, { useState } from 'react';
import { Button, Form, notification, Popconfirm } from 'antd';
import { useWarnIfUnsavedChanges } from '../hooks/useWarnIfUnsavedChanges';
import { AttendingState, QuestionResponse, RSVPStatus } from '../../common/types';
import { PostAcceptanceFormQuestions, PostAcceptanceFormSections } from '../../common/questions';
import { updatePostAcceptanceFormResponses } from '../../common/apiClient';
import { FormSectionsAndQuestions } from './FormSectionsAndQuestions';
import { mutate } from 'swr';

// assume this is the first time they're filling out the form
export const PostAcceptanceForm: React.FC = () => {
  const [attendingState, setAttendingState] = useState<AttendingState>(AttendingState.Unspecified);

  return (
    <>
      <h1 className="app-header">Application Page</h1>
      {attendingState === AttendingState.Unspecified ? (
        <AttendingForm setAttendingState={setAttendingState} />
      ) : null}
      {attendingState === AttendingState.Yes ? <FullForm /> : null}
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
      <p>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  useWarnIfUnsavedChanges(true);

  const onSubmit = async (values: Record<string, QuestionResponse>) => {
    const responses = PostAcceptanceFormQuestions.map((q) => values[q.id] ?? null);
    setIsSubmitting(true);
    const response = await updatePostAcceptanceFormResponses({
      rsvpStatus: RSVPStatus.Confirmed,
      responses,
    });
    if (200 <= response.status && response.status < 300) {
      success();
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
        disabled={false}
      />
      <Form.Item noStyle>
        <div className="submit-container">
          <Button
            className="button"
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            size="large"
          >
            Continue
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
