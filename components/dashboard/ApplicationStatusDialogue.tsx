import { ApplicationStatus } from '../../common/types';
import { Alert, Button } from 'antd';
import Link from 'next/link';
import { format } from './StatusDialogue';
import React from 'react';
import { RegistrationState } from '../hooks/useRegistrationState';
import { assertUnreachable } from '../../common/utils';

type ApplicationStatusDialogueProps = {
  applicationStatus: ApplicationStatus;
  registrationClosed: Date;
  registrationState: Exclude<RegistrationState, RegistrationState.BeforeOpen>;
};

export const ApplicationStatusDialogue: React.FC<ApplicationStatusDialogueProps> = ({
  applicationStatus,
  registrationClosed,
  registrationState,
}) => {
  if (applicationStatus === ApplicationStatus.Submitted) {
    return <Submitted />;
  }

  if (applicationStatus === ApplicationStatus.Incomplete) {
    switch (registrationState) {
      case RegistrationState.Closed:
        return <DeadlinePassed registrationClosed={registrationClosed} />;
      case RegistrationState.Open:
        return <Incomplete registrationClosed={registrationClosed} />;
      default:
        assertUnreachable(registrationState);
    }
  }

  assertUnreachable(applicationStatus);
};

type IncompleteProps = {
  registrationClosed: Date;
};
const Incomplete: React.FC<IncompleteProps> = ({ registrationClosed }) => {
  const date = format(registrationClosed);
  return (
    <>
      <Alert
        type="warning"
        message="Incomplete"
        description={
          <>
            You still need to complete your application! If you do not complete your application
            before <b>{date}</b>, you will not be considered for admission.
          </>
        }
      />
      <Link href="/application" passHref>
        <Button type={'primary'} style={{ marginTop: '10px' }}>
          Go to application
        </Button>
      </Link>
    </>
  );
};

const DeadlinePassed: React.FC<IncompleteProps> = ({ registrationClosed }) => {
  const date = format(registrationClosed);
  return (
    <Alert
      type="error"
      message="Registration Deadline Passed"
      description={
        <>
          Unfortunately, the deadline to apply to this year{"'"}s event was <b>{date}</b>. In the
          meantime, please sign up for our mailing list to stay up to get notified when applications
          open for next year{"'"}s event!
        </>
      }
    />
  );
};

const Submitted: React.FC = () => {
  return (
    <Alert
      type="info"
      message="Application Submitted"
      description={
        <>
          Thank you for submitting your application! We will notify you by email when there is a
          change in your application status.
        </>
      }
    />
  );
};
