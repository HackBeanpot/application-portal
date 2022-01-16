import { DecisionStatus } from '../../common/types';
import { RegistrationState } from '../hooks/useRegistrationState';
import React from 'react';
import { assertUnreachable } from '../../common/utils';
import { Alert, Button } from 'antd';
import { format } from './StatusDialogue';

type DecisionStatusDialogueProps = {
  decisionStatus: Exclude<DecisionStatus, DecisionStatus.Undecided>;
  confirmBy: Date;
  registrationState: Exclude<RegistrationState, RegistrationState.BeforeOpen>;
};

export const DecisionStatusDialogue: React.FC<DecisionStatusDialogueProps> = ({
  decisionStatus,
  registrationState,
  confirmBy,
}) => {
  if (decisionStatus === DecisionStatus.Admitted) {
    switch (registrationState) {
      case RegistrationState.Closed:
        // maybe we could show a "failed to confirm" in the future
        return <Declined />;
      case RegistrationState.Open:
        return <Admitted confirmBy={confirmBy} />;
      default:
        assertUnreachable(registrationState);
    }
  }

  if (decisionStatus === DecisionStatus.Waitlisted) {
    switch (registrationState) {
      case RegistrationState.Closed:
        return <Declined />;
      case RegistrationState.Open:
        return <Waitlisted />;
      default:
        assertUnreachable(registrationState);
    }
  }

  if (decisionStatus === DecisionStatus.Declined) {
    return <Declined />;
  }

  assertUnreachable(decisionStatus);
};

type AdmittedProps = {
  confirmBy: Date;
};
const Admitted: React.FC<AdmittedProps> = ({ confirmBy }) => {
  return (
    <>
      <Alert
        type="success"
        message="Admitted"
        description={
          <>
            Congratulations, we would love to have you attend this year{"'"}s event! Please confirm
            your RSVP status below. The deadline to confirm your attendance is {format(confirmBy)}.
          </>
        }
      />
      <div className="button-container">
        <Button type="primary" className="button">
          Confirm Attendance
        </Button>
        <Button type="primary" danger className="button`">
          Reject Attendance
        </Button>
      </div>
    </>
  );
};

const Waitlisted: React.FC = () => {
  return (
    <Alert
      type="warning"
      message={'Waitlisted'}
      description={
        'You are currently on the waitlist. However if spots open up, we will notify you by email!'
      }
    />
  );
};

const Declined: React.FC = () => {
  return (
    <Alert
      type={'error'}
      message={'Declined'}
      description={
        <>
          Unfortunately, we had more applicants than we could accept. However, we would still love
          for you to apply next year. In the meantime, please sign up for our mailing list to stay
          up to get notified when applications open for next year{"'"}s event!
        </>
      }
    />
  );
};
