import React, { FC } from 'react'
import { Dropdown } from '../common/types'
type DropdownProps = {
  question: Dropdown
}
const DropdownQuestion: FC<DropdownProps> = ({ question }) => {
  return (
    <div>
      <h2>{question.content}</h2>
      {question.required ? '*' : ''}
      {question.options.map((o) => (
        <ul key={question.id}>{o.name}</ul>
      ))}
    </div>
  )
}
export default DropdownQuestion
