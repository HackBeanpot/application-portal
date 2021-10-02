import React from 'react';
import { adminTabs } from '../../common/constants';
import useSWR from 'swr';
import PortalSettingsRow from './PortalSettingsRow';

const PortalSettings = () => {
  const dummyData = [
    { setting: 'Open Date', value: new Date('2021-12-20').toDateString() },
    { setting: 'Close Date', value: new Date('2021-12-20').toDateString() },
    {
      setting: 'Confirm By Date',
      value: new Date('2021-12-20').toDateString(),
    },
  ];

  return (
    <div>
      <h3>{adminTabs.CONFIGURE_PORTAL_SETTINGS}</h3>
      <table>
        <tr>
          <th>Setting</th>
          <th>Value</th>
        </tr>
        {dummyData.map((curr, k) => (
          <PortalSettingsRow
            setting={curr.setting}
            value={curr.value}
            key={k}
          />
        ))}
      </table>
    </div>
  );
};
export default PortalSettings;
