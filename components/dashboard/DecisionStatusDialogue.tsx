import { ConfirmByState, DecisionStatus } from '../../common/types';
import React from 'react';
import { assertUnreachable } from '../../common/utils';
import { Alert, Button } from 'antd';
import { format } from './StatusDialogue';
import Link from 'next/link';

type DecisionStatusDialogueProps = {
  decisionStatus: Exclude<DecisionStatus, DecisionStatus.Undecided>;
  confirmBy: Date;
  confirmByState: ConfirmByState;
  showDecision: boolean;
};

export const DecisionStatusDialogue: React.FC<DecisionStatusDialogueProps> = ({
  decisionStatus,
  confirmBy,
  confirmByState,
  showDecision,
}) => {
  if (!showDecision) {
    return <Pending />;
  }
  if (decisionStatus === DecisionStatus.Admitted) {
    switch (confirmByState) {
      case ConfirmByState.After:
        // maybe we could show a "failed to confirm" in the future
        return <FailedToConfirm confirmBy={confirmBy} />;
      case ConfirmByState.Before:
        return <Admitted confirmBy={confirmBy} />;
      default:
        assertUnreachable(confirmByState);
    }
  }

  if (decisionStatus === DecisionStatus.Waitlisted) {
    return <Waitlisted />;
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
        showIcon
        message="Admitted"
        description={
          <>
            <p>
              Congratulations, we would love to have you attend this year{"'"}s event! Please
              navigate to the <strong>Application</strong> tab to mark your RSVP status. The
              deadline to confirm your attendance is {format(confirmBy)}.
            </p>
            Please note: if you don{"'"}t complete the RSVP form by{' '}
            <strong>{format(confirmBy)}</strong>, you will be ineligible for swag.
          </>
        }
      />
      <Link href="/application" passHref>
        <Button type={'primary'} style={{ marginTop: '10px' }}>
          Go to RSVP form
        </Button>
      </Link>
    </>
  );
};

const Waitlisted: React.FC = () => {
  return (
    <Alert
      type="warning"
      showIcon
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
        <div>
          Unfortunately, we had more applicants than we could accept. However, we would still love
          for you to apply next year! In the meantime, please sign up for our mailing list to stay
          up to get notified when applications open for next year{"'"}s event on our website:{' '}
          <a target="_blank" href="https://hackbeanpot.com/" rel="noopener noreferrer">
            https://hackbeanpot.com
          </a>
        </div>
      }
    />
  );
};

const FailedToConfirm: React.FC<AdmittedProps> = ({ confirmBy }) => {
  return (
    <Alert
      type={'success'}
      showIcon
      message={'Accepted'}
      description={
        <div>
          <p>
            Congratulations, you have been accepted to attend HackBeanpot. However, because you did
            not finish your RSVP form by <strong>{format(confirmBy)}</strong>, you are ineligible
            for swag.
          </p>
          However, if you would still like to attend the event, please email{' '}
          <a href="mailto:team@hackbeanpot.com">team@hackbeanpot.com</a> letting us know of your
          status so we can send you the appropriate details to join the event.
        </div>
      }
    />
  );
};

const Pending: React.FC = () => {
  return (
    <Alert
      type="warning"
      message={'Pending'}
      showIcon
      description={
        <div>Thank you for submitting your application, we are currently reviewing it!</div>
      }
    />
  );
};
