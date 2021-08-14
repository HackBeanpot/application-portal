import React, { ReactElement, useState } from 'react';
import { adminTabs } from '../common/constants';
import PortalSettings from '../components/admin-tabs/PortalSettings';
import Stats from '../components/admin-tabs/Stats';

const Admin = (): ReactElement => {
  const [currTab, setCurrTab] = useState(adminTabs.VIEW_STATS);

  return (
    <>
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
      {currTab == adminTabs.VIEW_AND_MODIFY_APPLICANTS && (
        <div>
          <h3>{adminTabs.VIEW_AND_MODIFY_APPLICANTS}</h3>
        </div>
      )}
    </>
  );
};
export default Admin;
