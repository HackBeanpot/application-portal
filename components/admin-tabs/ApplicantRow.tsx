import React, { FC } from 'react';

type ApplicantRowProps = {
  applicant: any;
};

const ApplicantRow: FC<ApplicantRowProps> = ({ applicant }) => {
  return (
    <tr>
      <td>
        <input value={applicant.firstName} />
      </td>
      <td>
        <input value={applicant.lastName} />
      </td>
      <td>
        <input value={applicant.email} />
      </td>
      <td>
        <input value={applicant.school} />
      </td>
      <td>
        <input value={applicant.yearOfEducation.toString()} />
      </td>
      <td>
        <input value={applicant.applicationStatus} />
      </td>
      <button>Edit</button>
      <button>Update</button>
    </tr>
  );
};

export default ApplicantRow;
