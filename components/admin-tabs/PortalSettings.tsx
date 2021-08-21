import React from 'react';
import { adminTabs } from '../../common/constants';
import { getWelcome } from '../../common/apiClient';
import useSWR from 'swr';
import PortalSettingsRow from './PortalSettingsRow';

const PortalSettings = () => {
  const { data: welcome } = useSWR('/api/v1/welcome', getWelcome);
  const dummyData = [
    { setting: 'Open Date', value: '12/20/21' },
    { setting: 'Close Date', value: '12/20/21' },
    { setting: 'Confirm By Date', value: '12/20/21' },
    { setting: 'Welcome Message', value: welcome?.data.toString() ?? '' },
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
