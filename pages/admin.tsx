import React, { ReactElement } from 'react';
import Applicants from '../components/admin-tabs/Applicants';
import PortalSettings from '../components/admin-tabs/PortalSettings';
import Stats from '../components/admin-tabs/Stats';
import { PageLayout } from '../components/Layout';
import { GetServerSideProps } from 'next';
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect';
import { Tabs } from 'antd';
import { ADMIN_TABS } from '../common/constants';

const Admin = (): ReactElement => {
  return (
    <PageLayout currentPage="admin">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={ADMIN_TABS.VIEW_STATS} key="1">
          <Stats />
        </Tabs.TabPane>
        <Tabs.TabPane tab={ADMIN_TABS.CONFIGURE_PORTAL_SETTINGS} key="2">
          <PortalSettings />
        </Tabs.TabPane>
        <Tabs.TabPane tab={ADMIN_TABS.VIEW_STATS} key="3">
          <Applicants />
        </Tabs.TabPane>
      </Tabs>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  getServerSideSessionOrRedirect;

export default Admin;
