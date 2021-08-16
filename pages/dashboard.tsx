import React, { ReactElement } from 'react';
import { getApplicationStatus, getWelcome } from '../common/apiClient';
import { APPLY_BY_DATE } from '../common/constants';
import useSWR from 'swr';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';

const Dashboard = (): ReactElement => {
  useSessionOrRedirect();
  const { data: welcome } = useSWR('/api/v1/welcome', getWelcome);
  const { data: status } = useSWR('/api/v1/status', getApplicationStatus);

  return (
    <>
      <h1>Dashboard</h1>
      <p>{welcome?.data}</p>
      <p>{`Apply by ${APPLY_BY_DATE}`}</p>
      <p>{status?.data}</p>
    </>
  );
};
export default Dashboard;
