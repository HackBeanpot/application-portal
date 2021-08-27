import { DatePicker } from 'antd';
import React, { FC, useState } from 'react';

type PortalSettingsRowProps = {
  setting: string;
  value: string;
};

const PortalSettingsRow: FC<PortalSettingsRowProps> = ({ setting, value }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currValue, setCurrValue] = useState({
    val: value,
  });
  const isDate = Number.isInteger(Date.parse(value));
  const [newDate, setNewDate] = useState('');

  const updateCurrString = (e: React.FormEvent<HTMLInputElement>) => {
    const newStr = e.currentTarget.value;
    const currStr = { ...currValue };
    currStr.val = newStr;
    setCurrValue(currStr);
  };

  const updateCurrDate = () => {
    if (newDate == '') {
      alert('Please enter date');
    } else {
      setCurrValue({ ...currValue, val: newDate });
    }
  };

  return (
    <tr>
      <td>{setting}</td>
      {!isDate && (
        <>
          <td>
            {isEditing && (
              <input
                value={currValue.val}
                onChange={(e) => updateCurrString(e)}
              />
            )}
            {!isEditing && <label>{currValue.val}</label>}
          </td>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => setIsEditing(false)}>Update</button>
        </>
      )}
      {isDate && (
        <>
          <td>
            <label>{currValue.val}</label>
          </td>
          <td>
            <DatePicker onChange={(m, ds) => setNewDate(ds)} />
            <button onClick={() => updateCurrDate()}>Update</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default PortalSettingsRow;
