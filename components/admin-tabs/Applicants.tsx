import React from 'react';
import { adminTabs } from '../../common/constants';

const Applicants = () => {
  return (
    <div>
      <h3>{adminTabs.VIEW_AND_MODIFY_APPLICANTS}</h3>
      <table>
        <tr>
          <th>Applicant</th>
          <th>Status</th>
        </tr>
      </table>
    </div>
  );
};
export default Applicants;
