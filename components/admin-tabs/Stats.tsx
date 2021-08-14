import React from 'react';
import { adminTabs } from '../../common/constants';

const Stats = () => {
  return (
    <div>
      <h3>{adminTabs.VIEW_STATS}</h3>
      <table>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Total</td>
          <td>250</td>
        </tr>
        <tr>
          <td>Verified</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Submitted</td>
          <td>150</td>
        </tr>
        <tr>
          <td>Admitted</td>
          <td>140</td>
        </tr>
        <tr>
          <td>Confirmed</td>
          <td>150</td>
        </tr>
        <tr>
          <td>Declined</td>
          <td>150</td>
        </tr>
        <tr>
          <td>Checked in</td>
          <td>150</td>
        </tr>
        <tr>
          <td>T-Shirt XS</td>
          <td>20</td>
        </tr>
        <tr>
          <td>T-Shirt S</td>
          <td>20</td>
        </tr>
        <tr>
          <td>T-Shirt M</td>
          <td>20</td>
        </tr>
        <tr>
          <td>T-Shirt L</td>
          <td>20</td>
        </tr>
        <tr>
          <td>T-Shirt XL</td>
          <td>20</td>
        </tr>
      </table>
    </div>
  );
};
export default Stats;
