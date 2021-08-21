import React, { FC, useState } from 'react';
import { User } from '../../common/types';

type PortalSettingsRowProps = {
  setting: string;
  value: string;
};

const PortalSettingsRow: FC<PortalSettingsRowProps> = ({ setting, value }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currValue, setCurrValue] = useState({
    val: value,
  });

  return (
    <tr>
      <td>{setting}</td>
      <td>
        {isEditing && <input value={currValue.val} />}
        {!isEditing && <label>{currValue.val}</label>}
      </td>
    </tr>
  );
};

export default PortalSettingsRow;
