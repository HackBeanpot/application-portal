import React from 'react';
import { adminTabs } from '../../common/constants';

const PortalSettings = () => {
  return (
    <div>
      <h3>{adminTabs.CONFIGURE_PORTAL_SETTINGS}</h3>
      <table>
        <tr>
          <th>Setting</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Open Date</td>
          <td>12/20/21</td>
          <td>
            <input />
            <button>Update</button>
          </td>
        </tr>
        <tr>
          <td>Close Date</td>
          <td>2/20/22</td>
          <td>
            <input />
            <button>Update</button>
          </td>
        </tr>
        <tr>
          <td>Confirm By Date</td>
          <td>1/20/21</td>
          <td>
            <input />
            <button>Update</button>
          </td>
        </tr>
        <tr>
          <td>Weclome Message</td>
          <td>Welcome to the HackBeanpot Application Portal!</td>
          <td>
            <input />
            <button>Update</button>
          </td>
        </tr>
      </table>
    </div>
  );
};
export default PortalSettings;
