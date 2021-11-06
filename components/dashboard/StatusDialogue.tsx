import { ApplicationStatus, StatusApiResponse } from '../../common/types';
import { Alert, AlertProps, Button } from 'antd';
import { isBefore } from 'date-fns';
import Link from 'next/link';
import React from 'react';

// whether or not decisions should be show in the portal
// toggle this to true after the decision process is over
const SHOW_DECISIONS = false;

type StatusDialogueProps = {
  status: StatusApiResponse;
  confirmBy: Date;
  registrationClosed: Date;
  registrationOpen: Date;
};

export const StatusDialogue: React.FC<StatusDialogueProps> = ({
  registrationClosed,
  registrationOpen,
  confirmBy,
  status: { applicationStatus },
}) => {
  const NOW = new Date();
  if (isBefore(NOW, registrationOpen)) {
    // before registration opens case
    return <ApplyLater registrationOpen={format(registrationOpen)} />;
  } else if (isBefore(NOW, registrationClosed)) {
    // between registration opens and closes case
    if (applicationStatus === ApplicationStatus.Incomplete) {
      return (
        <>
          <Incomplete registrationClosed={format(registrationClosed)} />
          <Link href="/application" passHref>
            <Button type={'primary'}>Finish Registration</Button>
          </Link>
        </>
      );
    }
    return <Submitted />;
  }
  // after registration has already closed
  if (applicationStatus === ApplicationStatus.Incomplete) {
    return <DeadlinePassed registrationClosed={format(registrationClosed)} />;
  } else if (!SHOW_DECISIONS) {
    return <Submitted />;
  } else {
    // after registration closed, and we are showing decisions
    if (applicationStatus === ApplicationStatus.Submitted) {
      return <PleaseEmailUs />;
    } else if (applicationStatus === ApplicationStatus.Admitted) {
      // todo: implement RSVPing
      return (
        <>
          <Admitted confirmBy={confirmBy} />
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
    } else if (applicationStatus === ApplicationStatus.Declined) {
      return <Declined />;
    } else if (applicationStatus === ApplicationStatus.Waitlisted) {
      return <Waitlisted />;
    }
    const _: never = applicationStatus;
    throw new Error(
      'please add a new case for this application status: ' + applicationStatus
    );
  }
};

const ShortAlert = (
  type: AlertProps['type'],
  message: AlertProps['message'],
  description: AlertProps['description']
) => (
  <Alert
    className="alert"
    showIcon
    type={type}
    message={message}
    description={description}
  />
);
export const LoadingMessage: React.FC = () =>
  ShortAlert(
    'info',
    'Loading, please wait...',
    'Loading deadlines and application status, please wait...'
  );
const ApplyLater = ({ registrationOpen }: { registrationOpen: string }) =>
  ShortAlert(
    'info',
    <>
      Registration Opens <b>{registrationOpen}</b>
    </>,
    'Please come back after registration opens to complete your application!'
  );
const Incomplete = ({ registrationClosed }: { registrationClosed: string }) =>
  ShortAlert(
    'warning',
    'Incomplete',
    <>
      You still need to complete your application! If you do not complete your
      application before <b>{registrationClosed}</b>, you will not be considered
      for admission.
    </>
  );
const Submitted = () =>
  ShortAlert(
    'info',
    'Application Submitted',
    <>
      Thank you for submitting your application! We will notify you by email
      when there is a change in your application status.
    </>
  );
const PleaseEmailUs = () =>
  ShortAlert(
    'info',
    'Application Submitted',
    <>
      Your application is still marked as {"'submitted'"}, but the decisions
      period is over. Please email us at team@hackbeanpot.com so we can update
      your application status!
    </>
  );
const DeadlinePassed = ({
  registrationClosed,
}: {
  registrationClosed: string;
}) =>
  ShortAlert(
    'error',
    'Apply-By Deadline Passed',

    <>
      Unfortunately, the deadline to apply to this year{"'"}s event was{' '}
      <b>{registrationClosed}</b>. In the meantime, please sign up for our
      mailing list to stay up to get notified when applications open for next
      year{"'"}s event!
    </>
  );
const Admitted = ({ confirmBy }: { confirmBy: Date }) =>
  ShortAlert(
    'success',
    'Admitted',
    <>
      Congratulations, we would love to have you attend this year{"'"}s event!
      Please confirm your RSVP status below. The deadline to confirm your
      attendance is {format(confirmBy)}.
    </>
  );
const Waitlisted = () =>
  ShortAlert(
    'warning',
    'Waitlisted',
    'You are currently on the waitlist. However if spots open up, we will notify you by email!'
  );
const Declined = () =>
  ShortAlert(
    'error',
    'Declined',
    <>
      Unfortunately, we had more applicants than we could accept. However, we
      would still love for you to apply next year. In the meantime, please sign
      up for our mailing list to stay up to get notified when applications open
      for next year{"'"}s event!
    </>
  );

const OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;
export const format = (d: Date) => d.toLocaleDateString('en-US', OPTIONS);
