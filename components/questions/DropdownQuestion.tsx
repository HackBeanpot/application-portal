import React, { FC, useState } from 'react';
import { Dropdown as DropdownType } from '../../common/types';
import { Menu, Dropdown, message, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

type DropdownProps = {
  question: DropdownType;
  addDropdownAnswer: (id: string, addDropdownAnswer: string) => void;
};
const DropdownQuestion: FC<DropdownProps> = ({
  question,
  addDropdownAnswer,
}) => {
  const [selectedOption, updateSelectedOption] = useState(
    question.options[0].name
  );
  const menu = (
    <Menu
      selectable
      onClick={(e) => {
        updateSelectedOption(e.key);
        addDropdownAnswer(question.id, e.key);
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
          {/* {question.options.map((o) => (
        <ul key={question.id}>{o.name}</ul>
      ))} */}
        </Button>
      </Dropdown>
    </>
  );
};
export default DropdownQuestion;
