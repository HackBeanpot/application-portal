/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/

import { EXAMPLE_CHECKBOX_1, EXAMPLE_DROPDOWN_1 } from './constants'
import { RegistrationResponse, QuestionResponse } from './types'

const questionCount = 0

// convenience constructors for questions

// expor big object mapping of id -> question
export const Questions: Record<string, QuestionResponse['response']> = {
  questionid1: EXAMPLE_CHECKBOX_1,
  questionid2: EXAMPLE_DROPDOWN_1,
}
