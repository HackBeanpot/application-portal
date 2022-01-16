import React, { ReactElement } from 'react';
import { PageLayout } from '../components/Layout';
import useSWR from 'swr';
import {
  getConfirmBy,
  getRegistrationClosed,
  getRegistrationOpen,
  getUser,
} from '../common/apiClient';
import { Alert, Spin } from 'antd';
import { DecisionStatus, User } from '../common/types';
import { RegistrationState, useRegistrationState } from '../components/hooks/useRegistrationState';
import { ApplicationForm } from '../components/application/ApplicationForm';
import { PostAcceptanceForm } from '../components/application/PostAcceptanceForm';
import { ConfirmByState, useConfirmByState } from '../components/hooks/useConfirmByState';

const Application = (): ReactElement => {
  const { data: user } = useSWR('/api/v1/user', getUser);
  const { data: rOpen } = useSWR('/api/v1/dates/registration-open', getRegistrationOpen);
  const { data: rClosed } = useSWR('/api/v1/dates/registration-closed', getRegistrationClosed);
  const { data: confirmByData } = useSWR('/api/v1/dates/confirm-by', getConfirmBy);

  if (!user || !rOpen || !rClosed || !confirmByData) {
    return (
      <PageLayout currentPage={'application'}>
        <div className="application">
          <Spin size={'large'} />
        </div>
      </PageLayout>
    );
  }

  const registrationOpen = new Date(rOpen.data);
  const registrationClosed = new Date(rClosed.data);
  const confirmBy = new Date(confirmByData.data);
  return (
    <PageLayout currentPage={'application'}>
      <div className="application">
        <FormDecider {...{ registrationOpen, registrationClosed, user: user.data, confirmBy }} />
      </div>
    </PageLayout>
  );
};

type FormDeciderProps = {
  registrationOpen: Date;
  registrationClosed: Date;
  user: User;
  confirmBy: Date;
};
const FormDecider: React.FC<FormDeciderProps> = ({
  registrationOpen,
  registrationClosed,
  user,
  confirmBy,
}) => {
  const registrationState = useRegistrationState({ registrationOpen, registrationClosed });
  const confirmByState = useConfirmByState({ confirmBy });
  const { decisionStatus } = user;
  const noDecision = !decisionStatus || decisionStatus === DecisionStatus.Undecided;
  if (noDecision && registrationState === RegistrationState.Open) {
    return <ApplicationForm />;
  }

  if (confirmByState === ConfirmByState.Before && decisionStatus === DecisionStatus.Admitted) {
    return <PostAcceptanceForm />;
  }

  return <Alert type="info" message={'No form to fill out at this time'} />;
};

export default Application;
