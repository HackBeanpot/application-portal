import React, { ReactElement } from 'react'
import { useSession } from 'next-auth/client'
import Router, { useRouter } from 'next/router'
import { QuestionType } from '../common/types'
import { EXAMPLE_QUESTIONS } from '../common/constants'
import ShortTextQuestion from '../components/ShortTextQuestion'
import LongTextQuestion from '../components/LongTextQuestion'
import CheckboxesQuestion from '../components/CheckboxesQuestion'
import DropdownQuestion from '../components/CheckboxesQuestion'

const Application = (): ReactElement => {
  const session = useSignIn()
  return (
    <>
      <h1>Application Page</h1>
      <div>
        {EXAMPLE_QUESTIONS.map((q) => {
          switch (q.type) {
            case QuestionType.ShortText:
              return <ShortTextQuestion question={q} />
            case QuestionType.LongText:
              return <LongTextQuestion question={q} />
            case QuestionType.Checkboxes:
              return <CheckboxesQuestion question={q} />
            case QuestionType.Dropdown:
              return <DropdownQuestion question={q} />
          }
        })}
      </div>
    </>
  )
}
export default Application

export function useSignIn() {
  const [session, loading] = useSession()
  const { pathname } = useRouter()

  if (session) {
    return session
  } else if (!loading && pathname !== '/login') {
    Router.push('/login')
  }
}
