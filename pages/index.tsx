import React, { ReactElement } from 'react';
import {
  getConfirmBy,
  getRegistrationClosed,
  getRegistrationOpen,
  getStatus,
} from '../common/apiClient';
import { WELCOME_MESSAGE } from '../common/constants';
import useSWR from 'swr';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import { PageLayout } from '../components/Layout';
import { Alert, AlertProps, Button, Card } from 'antd';
import { ApplicationStatus, RSVPStatus } from '../common/types';
import { isBefore } from 'date-fns';
import Link from 'next/link';

const dateOrNull = (d: string | undefined) =>
  d === undefined ? undefined : new Date(d);

const Home = (): ReactElement => {
  useSessionOrRedirect();
  const { data: status } = useSWR('/api/v1/status', getStatus);
  const { data: confirmBy } = useSWR('/api/v1/dates/confirm-by', getConfirmBy);
  const { data: registrationClosed } = useSWR(
    '/api/v1/dates/registration-closed',
    getRegistrationClosed
  );
  const { data: registrationOpen } = useSWR(
    '/api/v1/dates/registration-open',
    getRegistrationOpen
  );

  const messageProps = status &&
    confirmBy && {
      rsvpStatus: status?.data.rsvpStatus,
      applicationStatus: status?.data.applicationStatus,
      confirmBy: dateOrNull(confirmBy?.data),
      registrationClosed: dateOrNull(registrationClosed?.data),
      registrationOpen: dateOrNull(registrationOpen?.data),
    };

  return (
    <PageLayout currentPage={'home'}>
      <div className="home">
        <p>{WELCOME_MESSAGE}</p>
        <Card title="Your Status" className="card">
          <div className="card-content">
            <Message {...messageProps} />
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

type MessageProps = {
  rsvpStatus?: RSVPStatus;
  applicationStatus?: ApplicationStatus;
  confirmBy?: Date;
  registrationClosed?: Date;
  registrationOpen?: Date;
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
const INCOMPLETE_MESSAGE = (d: string) => (
  <>
    You still need to complete your application! If you do not complete your
    application before <b>{d}</b>, you will not be considered for admission.
  </>
);
const DEADLINE_PASSED = (d: string) => (
  <>
    Unfortunately, the deadline to apply to this year{"'"}s event was <b>{d}</b>
    . In the meantime, please sign up for our mailing list to stay up to get
    notified when applications open for next year{"'"}s event!
  </>
);
const SUBMITTED_MESSAGE = () => (
  <>
    Thank you for submitting your application! We will notify you by email when
    there is a change in your application status.
  </>
);
const SHOW_DECISIONS = false;
const OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;
const format = (d: Date) => d.toLocaleDateString('en-US', OPTIONS);
const Message: React.FC<MessageProps> = ({
  registrationClosed,
  registrationOpen,
  confirmBy,
  applicationStatus,
  rsvpStatus,
}) => {
  const NOW = new Date();
  if (
    !registrationClosed ||
    !registrationOpen ||
    !confirmBy ||
    !rsvpStatus ||
    !applicationStatus
  ) {
    return <LoadingMessage />;
  }
  if (isBefore(NOW, registrationOpen)) {
    // before registration opens case
    return <ApplyLater registrationOpen={registrationOpen} />;
  } else if (isBefore(NOW, registrationClosed)) {
    // between registration opens and closes case
    if (applicationStatus === ApplicationStatus.Incomplete) {
      return (
        <>
          <Incomplete registrationClosed={registrationClosed} />
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
    return <DeadlinePassed registrationClosed={registrationClosed} />;
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

const LoadingMessage = () =>
  ShortAlert(
    'info',
    'Loading, please wait...',
    'Loading deadlines and application status, please wait...'
  );
const ApplyLater = ({ registrationOpen }: { registrationOpen: Date }) =>
  ShortAlert(
    'info',
    <>
      Registration Opens <b>{format(registrationOpen)}</b>
    </>,
    'Please come back after registration opens to complete your application!'
  );
const Incomplete = ({ registrationClosed }: { registrationClosed: Date }) =>
  ShortAlert(
    'warning',
    'Incomplete',
    INCOMPLETE_MESSAGE(format(registrationClosed))
  );
const Submitted = () =>
  ShortAlert('info', 'Application Submitted', SUBMITTED_MESSAGE());
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
const DeadlinePassed = ({ registrationClosed }: { registrationClosed: Date }) =>
  ShortAlert(
    'error',
    'Apply-By Deadline Passed',
    DEADLINE_PASSED(format(registrationClosed))
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
export default Home;
