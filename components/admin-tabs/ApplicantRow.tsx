import React, { FC, useState } from 'react';
import { User } from '../../common/types';

type ApplicantRowProps = {
  applicant: User;
};

const ApplicantRow: FC<ApplicantRowProps> = ({ applicant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currData, setCurrData] = useState({
    firstName: applicant.firstName,
    lastName: applicant.lastName,
    email: applicant.email,
    school: applicant.school,
    yearOfEducation: applicant.yearOfEducation.toString(),
    applicationStatus: applicant.applicationStatus.toString(),
  });

  const updateFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    const newFirstName = e.currentTarget.value;
    const applicant = { ...currData };
    applicant.firstName = newFirstName;
    setCurrData(applicant);
  };

  const updateLastName = (e: React.FormEvent<HTMLInputElement>) => {
    const newLastName = e.currentTarget.value;
    const applicant = { ...currData };
    applicant.lastName = newLastName;
    setCurrData(applicant);
  };

  const updateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const newEmail = e.currentTarget.value;
    const applicant = { ...currData };
    applicant.email = newEmail;
    setCurrData(applicant);
  };

  const updateSchool = (e: React.FormEvent<HTMLInputElement>) => {
    const newSchool = e.currentTarget.value;
    const applicant = { ...currData };
    applicant.school = newSchool;
    setCurrData(applicant);
  };

  const updateYear = (e: React.FormEvent<HTMLInputElement>) => {
    const newYear = e.currentTarget.value;
    const applicant = { ...currData };
    applicant.yearOfEducation = newYear;
    setCurrData(applicant);
  };

  const updateStatus = (e: React.FormEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.value;
    const applicant = { ...currData };
    applicant.applicationStatus = newStatus;
    setCurrData(applicant);
  };

  return (
    <tr>
      <td>
        {isEditing && (
          <input
            value={currData.firstName}
            onChange={(e) => updateFirstName(e)}
          />
        )}
        {!isEditing && <label>{currData.firstName}</label>}
      </td>
      <td>
        {isEditing && (
          <input
            value={currData.lastName}
            onChange={(e) => updateLastName(e)}
          />
        )}
        {!isEditing && <label>{currData.lastName}</label>}
      </td>
      <td>
        {isEditing && (
          <input value={currData.email} onChange={(e) => updateEmail(e)} />
        )}
        {!isEditing && <label>{currData.email}</label>}
      </td>
      <td>
        {isEditing && (
          <input value={currData.school} onChange={(e) => updateSchool(e)} />
        )}
        {!isEditing && <label>{currData.school}</label>}
      </td>
      <td>
        {isEditing && (
          <input
            value={currData.yearOfEducation}
            onChange={(e) => updateYear(e)}
          />
        )}
        {!isEditing && <label>{currData.yearOfEducation}</label>}
      </td>
      <td>
        {isEditing && (
          <input
            value={currData.applicationStatus}
            onChange={(e) => updateStatus(e)}
          />
        )}
        {!isEditing && <label>{currData.applicationStatus}</label>}
      </td>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => setIsEditing(false)}>Update</button>
    </tr>
  );
};

export default ApplicantRow;
