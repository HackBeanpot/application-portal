import React, { ReactElement } from 'react';
import {
  getConfirmBy,
  getRegistrationClosed,
  getRegistrationOpen,
  getShowDecision,
  getStatus,
} from '../common/apiClient';
import useSWR from 'swr';
import { PageLayout } from '../components/Layout';
import { Card } from 'antd';
import { StatusApiResponse } from '../common/types';
import { LoadingMessage, StatusDialogue } from '../components/dashboard/StatusDialogue';
import { GetServerSideProps } from 'next';
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect';

const Home = (): ReactElement => {
  const { data: status } = useSWR('/api/v1/status', getStatus);
  const { data: confirmBy } = useSWR('/api/v1/dates/confirm-by', getConfirmBy);
  const { data: registrationClosed } = useSWR(
    '/api/v1/dates/registration-closed',
    getRegistrationClosed
  );
  const { data: registrationOpen } = useSWR('/api/v1/dates/registration-open', getRegistrationOpen);
  const { data: showDecision } = useSWR('/api/v1/show-decision', getShowDecision);
  const statusPropsOrNull = getStatusDialogueProps(
    status?.data,
    confirmBy?.data,
    registrationClosed?.data,
    registrationOpen?.data,
    showDecision?.data
  );

  return (
    <PageLayout currentPage={'home'}>
      <div className="home">
        <h1>HackBeanpot Application Portal</h1>
        <Card title="Your Status" className="card">
          <div className="card-content">
            {statusPropsOrNull ? <StatusDialogue {...statusPropsOrNull} /> : <LoadingMessage />}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

function getStatusDialogueProps(
  status?: StatusApiResponse,
  confirmBy?: string,
  registrationClosed?: string,
  registrationOpen?: string,
  showDecision?: boolean
) {
  if (status && confirmBy && registrationClosed && registrationOpen && showDecision) {
    return {
      status,
      confirmBy: new Date(confirmBy),
      registrationClosed: new Date(registrationClosed),
      registrationOpen: new Date(registrationOpen),
      showDecision,
    };
  }
  return null;
}

export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect;

export default Home;
