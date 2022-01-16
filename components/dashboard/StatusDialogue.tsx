import { ApplicationStatus, DecisionStatus, RSVPStatus } from '../../common/types';
import { Alert } from 'antd';
import React from 'react';
import { RegistrationState, useRegistrationState } from '../hooks/useRegistrationState';
import { ApplicationStatusDialogue } from './ApplicationStatusDialogue';
import { DecisionStatusDialogue } from './DecisionStatusDialogue';
import { RsvpDialogue } from './RsvpDialogue';

type StatusDialogueProps = {
  applicationStatus: ApplicationStatus;
  // might not exist because of backwards compatibility
  decisionStatus?: DecisionStatus;
  rsvpStatus: RSVPStatus;
  confirmBy: Date;
  registrationClosed: Date;
  registrationOpen: Date;
};

export const StatusDialogue: React.FC<StatusDialogueProps> = ({
  registrationClosed,
  registrationOpen,
  confirmBy,
  applicationStatus,
  decisionStatus,
  rsvpStatus,
}) => {
  const registrationState = useRegistrationState({ registrationClosed, registrationOpen });

  if (registrationState === RegistrationState.BeforeOpen) {
    return <ApplyLater registrationOpen={format(registrationOpen)} />;
  }

  // if they don't yet have a decision, render their application status
  if (!decisionStatus || decisionStatus === DecisionStatus.Undecided) {
    return (
      <ApplicationStatusDialogue
        applicationStatus={applicationStatus}
        registrationClosed={registrationClosed}
        registrationState={registrationState}
      />
    );
  }

  // if they don't yet have an rsvp, render their decision
  if (!rsvpStatus || rsvpStatus === RSVPStatus.Unconfirmed) {
    return (
      <DecisionStatusDialogue
        decisionStatus={decisionStatus}
        confirmBy={confirmBy}
        registrationState={registrationState}
      />
    );
  }

  // they must have an rsvp, so render that
  return <RsvpDialogue rsvpStatus={rsvpStatus} registrationState={registrationState} />;
};

const ApplyLater = ({ registrationOpen }: { registrationOpen: string }) => {
  return (
    <Alert
      type="info"
      message={
        <>
          Registration Opens <b>{registrationOpen}</b>
        </>
      }
      description="Please come back after registration opens to complete your application!"
    />
  );
};

const OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;
export const format = (d: Date): string => d.toLocaleDateString('en-US', OPTIONS);
