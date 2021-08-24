import React from 'react';
import { adminTabs } from '../../common/constants';
import { getWelcome } from '../../common/apiClient';
import useSWR from 'swr';
import PortalSettingsRow from './PortalSettingsRow';
import 'moment/locale/zh-cn';

const PortalSettings = () => {
  const { data: welcome } = useSWR('/api/v1/welcome', getWelcome);
  const dummyData = [
    { setting: 'Open Date', value: new Date('2021-12-20').toDateString() },
    { setting: 'Close Date', value: new Date('2021-12-20').toDateString() },
    {
      setting: 'Confirm By Date',
      value: new Date('2021-12-20').toDateString(),
    },
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
