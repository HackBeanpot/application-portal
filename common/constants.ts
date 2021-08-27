import {
  User,
  Gender,
  Education,
  Ethnicity,
  ShirtSize,
  ApplicationStatus,
  RegistrationApiRequest,
  QuestionDefinition,
  Checkboxes,
  ShortText,
  Dropdown,
  LongText,
  QuestionType,
} from './types';

export const APPLY_BY_DATE = '12/20/2021';

export const EXAMPLE_GENDER = Gender.Female;
export const EXAMPLE_EDUCATION = Education.Undergraduate;
export const EXAMPLE_ETHNICITIES = [Ethnicity.Asian];
export const EXAMPLE_SHIRTSIZE = ShirtSize.Small;
export const EXAMPLE_APPLICATION_STATUS = ApplicationStatus.Declined;
/**
 * example json User to use for now
 */
export const EXAMPLE_USER_ID = 'user12231';
export const EXAMPLE_USER: User = {
  email: 'judysu@gmail.com',
  firstName: 'Judy',
  lastName: 'Su',
  id: EXAMPLE_USER_ID,
  gender: EXAMPLE_GENDER,
  school: 'Northeastern',
  education: EXAMPLE_EDUCATION,
  yearOfEducation: 4,
  ethnicities: EXAMPLE_ETHNICITIES,
  shirtSize: EXAMPLE_SHIRTSIZE,
  applicationStatus: EXAMPLE_APPLICATION_STATUS,
  major: 'cs',
  minor: 'cs',
  resumeLink: 'cs',
  timeZone: 'cs',
  learningGoals: 'cs',
  responses: [],
};
export const EXAMPLE_RESPONSE: RegistrationApiRequest = {
  responses: ['Judy Su', EXAMPLE_ETHNICITIES],
};
export const EXAMPLE_CHECKBOX_1: Checkboxes = {
  id: '1',
  content: 'Who is the sassiest?',
  required: true,
  type: QuestionType.Checkboxes,
  options: [
    { name: 'Alex' },
    { name: 'Jess' },
    { name: 'Jamie' },
    { name: 'Karen' },
  ],
  maxNumber: 1,
  minNumber: 1,
};
export const EXAMPLE_SHORT_TEXT_1: ShortText = {
  id: '2',
  content: "What's your favorite food?",
  required: false,
  type: QuestionType.ShortText,
  minLength: 200,
  maxLength: 500,
};

// with arrays, dropdown, has to be one of 5 choices, ORMAP over options to see if
// at least one of the options is equal to the response
// make function that validates a function
export const EXAMPLE_DROPDOWN_1: Dropdown = {
  id: '3',
  content: "What's your favorite color?",
  required: true,
  type: QuestionType.Dropdown,
  options: [
    { name: 'blue' },
    { name: 'green' },
    { name: 'purple' },
    { name: 'orange' },
    { name: 'pink' },
  ],
};
export const EXAMPLE_LONG_TEXT_1: LongText = {
  id: '4',
  content: 'Why do you want to participate in Hackbeanpot?',
  required: true,
  type: QuestionType.LongText,
  minLength: 500,
  maxLength: 1000,
};

// switch case where you check the type, then you can check it's required (same for all qs)
// if required == true, and response is null -> return 404
// if response valid, keep going, then check if answer type matches expected answer type
// response is string? -> good then keep going, if length of string in boundaries

export const EXAMPLE_QUESTIONS: Array<QuestionDefinition> = [
  EXAMPLE_CHECKBOX_1,
  EXAMPLE_SHORT_TEXT_1,
  EXAMPLE_DROPDOWN_1,
  EXAMPLE_LONG_TEXT_1,
];

export const adminTabs = {
  VIEW_STATS: 'View Stats',
  CONFIGURE_PORTAL_SETTINGS: 'Configure Portal Settings',
  VIEW_AND_MODIFY_APPLICANTS: 'View / Modify Applicants',
};
