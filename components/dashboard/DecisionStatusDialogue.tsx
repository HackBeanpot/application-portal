import { DecisionStatus } from '../../common/types';
import React from 'react';
import { assertUnreachable } from '../../common/utils';
import { Alert, Button } from 'antd';
import { format } from './StatusDialogue';
import Link from 'next/link';
import { ConfirmByState } from '../hooks/useConfirmByState';

type DecisionStatusDialogueProps = {
  decisionStatus: Exclude<DecisionStatus, DecisionStatus.Undecided>;
  confirmBy: Date;
  confirmByState: ConfirmByState;
};

export const DecisionStatusDialogue: React.FC<DecisionStatusDialogueProps> = ({
  decisionStatus,
  confirmBy,
  confirmByState,
}) => {
  if (decisionStatus === DecisionStatus.Admitted) {
    switch (confirmByState) {
      case ConfirmByState.After:
        // maybe we could show a "failed to confirm" in the future
        return <Declined />;
      case ConfirmByState.Before:
        return <Admitted confirmBy={confirmBy} />;
      default:
        assertUnreachable(confirmByState);
    }
  }

  if (decisionStatus === DecisionStatus.Waitlisted) {
    switch (confirmByState) {
      case ConfirmByState.After:
        return <Declined />;
      case ConfirmByState.Before:
        return <Waitlisted />;
      default:
        assertUnreachable(confirmByState);
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
            Congratulations, we would love to have you attend this year{"'"}s event! Please navigate
            to the <b>Application</b> tab to mark your RSVP status. The deadline to confirm your
            attendance is {format(confirmBy)}.
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
