import React from 'react';
import { ADMIN_TABS } from '../../common/constants';

const Stats = () => {
  return (
    <div>
      <h3>{ADMIN_TABS.VIEW_STATS}</h3>
      <table>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
        <br />
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
        <br />
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
        <br />
        <tr>
          <td>Year 1</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Year 2</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Year 3</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Year 4</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Year 5</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Year 5+</td>
          <td>20</td>
        </tr>
      </table>
    </div>
  );
};
export default Stats;
