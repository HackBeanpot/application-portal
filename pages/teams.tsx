import React, { ReactElement } from 'react';
import {
  getConfirmBy,
  getRegistrationClosed,
  getRegistrationOpen,
  getStatus,
} from '../common/apiClient';
import { TEAMS_MESSAGE } from '../common/constants';
import useSWR from 'swr';
import { PageLayout } from '../components/Layout';
import { Card, Button } from 'antd';
import { StatusApiResponse } from '../common/types';
import {
  LoadingMessage,
  StatusDialogue,
} from '../components/dashboard/StatusDialogue';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect';

const Teams = (): ReactElement => {
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
  const statusPropsOrNull = getStatusDialogueProps(
    status?.data,
    confirmBy?.data,
    registrationClosed?.data,
    registrationOpen?.data
  );

  return (
    <PageLayout currentPage={'home'}>
      <div className="home">
        <p>{TEAMS_MESSAGE}</p>
        <Card title="Your Status" className="card">
          <div className="card-content">
            {statusPropsOrNull ? (
              <StatusDialogue {...statusPropsOrNull} />
            ) : (
              <LoadingMessage />
            )}
          </div>
        </Card>
        <Button type={'primary'}>Create Team</Button>
      </div>
    </PageLayout>
  );
};

function getStatusDialogueProps(
  status?: StatusApiResponse,
  confirmBy?: string,
  registrationClosed?: string,
  registrationOpen?: string
) {
  if (status && confirmBy && registrationClosed && registrationOpen) {
    return {
      status,
      confirmBy: new Date(confirmBy),
      registrationClosed: new Date(registrationClosed),
      registrationOpen: new Date(registrationOpen),
    };
  }
  return null;
}

export const getServerSideProps: GetServerSideProps =
  getServerSideSessionOrRedirect;

export default Teams;
