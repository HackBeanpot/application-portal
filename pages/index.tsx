import React, { ReactElement } from 'react';
import { getApplicationStatus, getWelcome } from '../common/apiClient';
import { APPLY_BY_DATE, WELCOME_MESSAGE } from '../common/constants';
import useSWR from 'swr';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import { PageLayout } from '../components/Layout';

const Home = (): ReactElement => {
  useSessionOrRedirect();
  const { data: status } = useSWR('/api/v1/status', getApplicationStatus);

  return (
    <PageLayout currentPage={'home'}>
      <h1>Dashboard</h1>
      <p>{WELCOME_MESSAGE}</p>
      <p>{`Apply by ${APPLY_BY_DATE}`}</p>
      <p>{status?.data}</p>
    </PageLayout>
  );
};
export default Home;
