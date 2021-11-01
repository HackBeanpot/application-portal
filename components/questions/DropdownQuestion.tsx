import React, { FC, useState } from 'react';
import { Dropdown as DropdownType } from '../../common/types';
import { Menu, Dropdown, message, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

type DropdownProps = {
  question: DropdownType;
  addDropdownAnswer: (
    question: DropdownType,
    addDropdownAnswer: string
  ) => void;
  errorMessage: string;
};
const DropdownQuestion: FC<DropdownProps> = ({
  question,
  addDropdownAnswer,
  errorMessage,
}) => {
  const [selectedOption, updateSelectedOption] = useState('select');
  const menu = (
    <Menu
      style={{
        maxHeight: 300,
        overflow: 'auto',
      }}
      selectable
      onClick={(e) => {
        updateSelectedOption(e.key);
        addDropdownAnswer(question, e.key);
      }}
    >
      {question.options.map((o) => (
        <Menu.Item key={o.name}>{o.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <h2>
        {question.content} {question.required ? '*' : ''}
      </h2>
      <Dropdown overlay={menu}>
        <Button>
          <a className="ant-dropdown-link"> {selectedOption} </a>
          <DownOutlined />
        </Button>
      </Dropdown>
      <div>{errorMessage}</div>
    </>
  );
};
export default DropdownQuestion;
