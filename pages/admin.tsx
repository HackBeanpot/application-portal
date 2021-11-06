import React, { ReactElement, useState } from 'react';
import { adminTabs } from '../common/constants';
import Applicants from '../components/admin-tabs/Applicants';
import PortalSettings from '../components/admin-tabs/PortalSettings';
import Stats from '../components/admin-tabs/Stats';
import { PageLayout } from '../components/Layout';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const Admin = (): ReactElement => {
  const [currTab, setCurrTab] = useState(adminTabs.VIEW_STATS);

  return (
    <PageLayout currentPage="admin">
      <div>
        <button onClick={() => setCurrTab(adminTabs.VIEW_STATS)}>
          {adminTabs.VIEW_STATS}
        </button>
        <button onClick={() => setCurrTab(adminTabs.CONFIGURE_PORTAL_SETTINGS)}>
          {adminTabs.CONFIGURE_PORTAL_SETTINGS}
        </button>
        <button
          onClick={() => setCurrTab(adminTabs.VIEW_AND_MODIFY_APPLICANTS)}
        >
          {adminTabs.VIEW_AND_MODIFY_APPLICANTS}
        </button>
      </div>
      {currTab === adminTabs.VIEW_STATS && <Stats />}
      {currTab === adminTabs.CONFIGURE_PORTAL_SETTINGS && <PortalSettings />}
      {currTab == adminTabs.VIEW_AND_MODIFY_APPLICANTS && <Applicants />}
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { session: await getSession(ctx) } };
};

export default Admin;
