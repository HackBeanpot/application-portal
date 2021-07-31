import React, { FC } from 'react'
import { ShortText } from '../common/types'
type ShortTextProps = {
  question: ShortText
}
const ShortTextQuestion: FC<ShortTextProps> = ({ question }) => {
  return (
    <div>
      <h2>{question.content}</h2>
      {question.required ? '*' : ''}
      min-length = {question.minLength}
      <br />
      max-length = {question.maxLength}
      <br />
      <textarea />
    </div>
  )
}
export default ShortTextQuestion
