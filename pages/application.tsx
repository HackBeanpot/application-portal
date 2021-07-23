import React, { ReactElement } from 'react'
import {
  QuestionType,
  ShortText,
  LongText,
  Dropdown,
  Checkboxes,
} from '../common/types'
import { EXAMPLE_QUESTIONS } from '../common/constants'
// export async function getStaticProps() {
//   return {
//     props: { EXAMPLE_QUESTIONS }
//   }
// }
const shortText = (q: ShortText) => {
  return (
    <div>
      <h2>{q.content}</h2>
      {q.required ? '*' : ''}
      min-length = {q.minLength}
      <br />
      max-length = {q.maxLength}
      <br />
      <textarea />
    </div>
  )
}
const longText = (q: LongText) => {
  return (
    <div>
      <h2>{q.content}</h2>
      {q.required ? '*' : ''}
      min-length = {q.minLength}
      <br />
      max-length = {q.maxLength}
      <br />
      <textarea />
    </div>
  )
}
const dropDown = (q: Dropdown) => {
  return (
    <div>
      <h2>{q.content}</h2>
      {q.required ? '*' : ''}
      {q.options.map((o) => (
        <ul key={q.id}>{o.name}</ul>
      ))}
    </div>
  )
}
const checkBoxes = (q: Checkboxes) => {
  return (
    <div>
      <h2>{q.content}</h2>
      {q.required ? '*' : ''}
      {q.options.map((o) => (
        <ul key={q.id}>{o.name}</ul>
      ))}
      min number = {q.minNumber}
      <br />
      max number = {q.maxNumber}
    </div>
  )
}
const Application = (): ReactElement => {
  return (
    <>
      <h1>Application Page</h1>
      <div>
        {EXAMPLE_QUESTIONS.map((q) => {
          switch (q.type) {
            case QuestionType.ShortText:
              return shortText(q)
            case QuestionType.LongText:
              return longText(q)
            case QuestionType.Checkboxes:
              return checkBoxes(q)
            case QuestionType.Dropdown:
              return dropDown(q)
          }
        })}
      </div>
    </>
  )
}
export default Application
