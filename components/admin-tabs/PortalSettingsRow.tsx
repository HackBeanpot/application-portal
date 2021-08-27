import { DatePicker } from 'antd';
import React, { FC, useState } from 'react';
import moment from 'moment';

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

  const updateCurrVal = (e: React.FormEvent<HTMLInputElement>) => {
    const newCurrVal = e.currentTarget.value;
    const currVal = { ...currValue };
    currVal.val = newCurrVal;
    setCurrValue(currVal);
  };

  console.log(new Date('2021-12-20'));

  return (
    <tr>
      <td>{setting}</td>
      <td>
        {!isDate && isEditing && (
          <input value={currValue.val} onChange={(e) => updateCurrVal(e)} />
        )}
        {!isDate && !isEditing && <label>{currValue.val}</label>}
        {isDate && (
          <DatePicker
            defaultValue={moment(Date.parse(currValue.val), 'YYYY-MM-DD')}
          />
        )}
      </td>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => setIsEditing(false)}>Update</button>
    </tr>
  );
};

export default PortalSettingsRow;
