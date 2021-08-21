import React from 'react';
import { adminTabs } from '../../common/constants';
import { getAllApplicants } from '../../common/apiClient';
import useSWR from 'swr';
import ApplicantRow from './ApplicantRow';

const Applicants = () => {
  const { data: applicants } = useSWR('/api/v1/applicants', getAllApplicants);

  return (
    <div>
      <h3>{adminTabs.VIEW_AND_MODIFY_APPLICANTS}</h3>
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>School</th>
          <th>Year</th>
          <th>Application Status</th>
        </tr>
        {applicants?.data.map((a, k) => (
          <ApplicantRow applicant={a} key={k} />
        ))}
      </table>
    </div>
  );
};
export default Applicants;
