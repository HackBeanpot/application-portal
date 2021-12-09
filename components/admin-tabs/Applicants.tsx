import React from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { getAllApplicants } from '../../common/apiClient';
import useSWR from 'swr';
import ApplicantRow from './ApplicantRow';

const Applicants = () => {
  const { data: applicants } = useSWR('/api/v1/applicants', getAllApplicants);

  return (
    <div>
      <h3>{ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS}</h3>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>School</th>
            <th>Year</th>
            <th>Application Status</th>
            <th>Edit</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {applicants?.data?.map((a) => (
            <ApplicantRow applicant={a} key={a.email} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Applicants;
