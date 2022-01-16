import React, { ReactElement } from 'react';
import { PageLayout } from '../components/Layout';
import useSWR from 'swr';
import { getRegistrationClosed, getRegistrationOpen, getUser } from '../common/apiClient';
import { Alert, Spin } from 'antd';
import { DecisionStatus, User } from '../common/types';
import { RegistrationState, useRegistrationState } from '../components/hooks/useRegistrationState';
import { ApplicationForm } from '../components/application/ApplicationForm';
import { PostAcceptanceForm } from '../components/application/PostAcceptanceForm';

const Application = (): ReactElement => {
  const { data: user } = useSWR('/api/v1/user', getUser);
  const { data: rOpen } = useSWR('/api/v1/dates/registration-open', getRegistrationOpen);
  const { data: rClosed } = useSWR('/api/v1/dates/registration-closed', getRegistrationClosed);

  if (!user || !rOpen || !rClosed) {
    return (
      <PageLayout currentPage={'application'}>
        <Spin size={'large'} />
      </PageLayout>
    );
  }

  const registrationOpen = new Date(rOpen.data);
  const registrationClosed = new Date(rClosed.data);
  return (
    <PageLayout currentPage={'application'}>
      <FormDecider {...{ registrationOpen, registrationClosed, user: user.data }} />
    </PageLayout>
  );
};

type FormDeciderProps = {
  registrationOpen: Date;
  registrationClosed: Date;
  user: User;
};
const FormDecider: React.FC<FormDeciderProps> = ({
  registrationOpen,
  registrationClosed,
  user,
}) => {
  const registrationState = useRegistrationState({ registrationOpen, registrationClosed });
  const { decisionStatus } = user;
  const noDecision = !decisionStatus || decisionStatus === DecisionStatus.Undecided;

  if (noDecision && registrationState === RegistrationState.Open) {
    return <ApplicationForm />;
  }

  const showPostAcceptanceForm = decisionStatus === DecisionStatus.Admitted;
  if (showPostAcceptanceForm) {
    return <PostAcceptanceForm />;
  }

  return <Alert type="info" message={'No form to fill out at this time'} />;
};

export default Application;
