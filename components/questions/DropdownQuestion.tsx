import React, { FC, useState } from 'react';
import { Dropdown as DropdownType } from '../../common/types';
import { Menu, Dropdown, message, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../../styles/components/Questions.module.scss';

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
  const [selectedOption, updateSelectedOption] = useState(
    question.placeholder ?? 'Select'
  );
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
    <div className={styles.question}>
      <label htmlFor={question.id}>
        {question.content} {question.required ? '*' : ''}
      </label>
      <br />
      <Dropdown overlay={menu}>
        <Button name={question.id}>
          {selectedOption} <DownOutlined />
        </Button>
      </Dropdown>
      <div>{errorMessage}</div>
    </div>
  );
};
export default DropdownQuestion;
