import React, { ReactElement, useState } from 'react';
import { adminTabs } from '../common/constants';
import Applicants from '../components/admin-tabs/Applicants';
import PortalSettings from '../components/admin-tabs/PortalSettings';
import Stats from '../components/admin-tabs/Stats';
import { populateSchoolsList } from '../common/constants';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';

const Admin = (): ReactElement => {
  useSessionOrRedirect();
  const [currTab, setCurrTab] = useState(adminTabs.VIEW_STATS);
  //populateSchoolsList();

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
      {currTab == adminTabs.VIEW_AND_MODIFY_APPLICANTS && <Applicants />}
    </>
  );
};
export default Admin;
