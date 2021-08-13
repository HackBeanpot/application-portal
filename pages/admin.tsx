import React, { ReactElement, useState } from 'react';
import { getApplicationStatus, getWelcome } from '../common/apiClient';
import { APPLY_BY_DATE } from '../common/constants';
import useSWR from 'swr';

const Admin = (): ReactElement => {
  const adminTabs = {
    VIEW_STATS: 'View Stats',
    CONFIGURE_PORTAL_SETTINGS: 'Configure Portal Settings',
    VIEW_AND_MODIFY_APPLICANTS: 'View / Modify Applicants',
  };
  const [currTab, setCurrTab] = useState('');

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
      {currTab === adminTabs.VIEW_STATS && (
        <div>
          <h3>{adminTabs.VIEW_STATS}</h3>
        </div>
      )}
      {currTab === adminTabs.CONFIGURE_PORTAL_SETTINGS && (
        <div>
          <h3>{adminTabs.CONFIGURE_PORTAL_SETTINGS}</h3>
        </div>
      )}
      {currTab == adminTabs.VIEW_AND_MODIFY_APPLICANTS && (
        <div>
          <h3>{adminTabs.VIEW_AND_MODIFY_APPLICANTS}</h3>
        </div>
      )}
    </>
  );
};
export default Admin;
