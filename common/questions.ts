/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/

import { EXAMPLE_CHECKBOX_1, EXAMPLE_DROPDOWN_1 } from './constants';
import {
  RegistrationApiRequest,
  QuestionIdToResponseMap,
  QuestionDefinition,
  Checkboxes,
  Dropdown,
  LongText,
  QuestionType,
  ShortText,
  QuestionIdToDefinitionMap,
} from './types';

let questionCount = 0;
// constants for min/max length of q + others
const minNumberCheck = 0;
const maxLengthShort = 500;
const minLengthShort = 0;
const maxLengthLong = 3000;
const minLengthLong = 0;

// convenience constructors for questions (constructors in java)
function makeCheckbox(
  content: string,
  options: Array<string>,
  required: boolean,
  maxNumberCheck: number
): Checkboxes {
  questionCount++;
  return {
    type: QuestionType.Checkboxes,
    options: options.map((name) => ({ name })),
    maxNumber: maxNumberCheck,
    minNumber: minNumberCheck,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

function makeShortText(content: string, required: boolean): ShortText {
  questionCount++;
  return {
    type: QuestionType.ShortText,
    maxLength: maxLengthShort,
    minLength: minLengthShort,

    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

function makeDropdown(
  content: string,
  options: Array<string>,
  required: boolean
): Dropdown {
  questionCount++;
  return {
    type: QuestionType.Dropdown,
    options: options.map((name) => ({ name })),

    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

function makeLongText(content: string, required: boolean): LongText {
  questionCount++;
  return {
    type: QuestionType.LongText,
    maxLength: maxLengthLong,
    minLength: minLengthLong,

    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

// write questions for portal here
export const Questions: Array<QuestionDefinition> = [
  makeShortText('What is your name?', true),
  makeDropdown(
    'What year are you?',
    ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Other'],
    true
  ),
  makeLongText('What is your favorite food?', false),
  makeCheckbox(
    'What languages do you speak?',
    ['English', 'Spanish', 'Mandarin', 'Hindi', 'Other'],
    false,
    5
  ),
];

// also export the questions as a mapping, to make it easier to validate
export const toIdMapping = <T extends { id: string }>(
  questions: Array<T>
): Record<string, T> => {
  const mapping: Record<string, T> = {};
  for (const q of questions) {
    mapping[q.id] = q;
  }
  return mapping;
};

export const questionIdToDefinitionMap = toIdMapping(Questions);

// constructors for people writing the portal qs
