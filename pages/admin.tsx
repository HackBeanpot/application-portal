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
      <div className="admin">
        <Tabs defaultActiveKey="1" className="tabs">
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
      </div>
    </PageLayout>
  );
};

export default Admin;
