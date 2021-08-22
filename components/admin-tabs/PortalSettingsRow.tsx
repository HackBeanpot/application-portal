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

  const updateCurrVal = (e: React.FormEvent<HTMLInputElement>) => {
    const newCurrVal = e.currentTarget.value;
    const currVal = { ...currValue };
    currVal.val = newCurrVal;
    setCurrValue(currVal);
  };

  return (
    <tr>
      <td>{setting}</td>
      <td>
        {isEditing && (
          <input value={currValue.val} onChange={(e) => updateCurrVal(e)} />
        )}
        {!isEditing && <label>{currValue.val}</label>}
      </td>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => setIsEditing(false)}>Update</button>
    </tr>
  );
};

export default PortalSettingsRow;
