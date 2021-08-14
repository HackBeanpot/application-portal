import {
  User,
  Gender,
  Education,
  Ethnicity,
  ShirtSize,
  ApplicationStatus,
  RegistrationResponse,
  Question,
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
export const EXAMPLE_RESPONSE: RegistrationResponse = {
  userId: EXAMPLE_USER_ID,
  responses: {
    question1: 'Judy Su',
    question2: EXAMPLE_ETHNICITIES,
  },
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
export const EXAMPLE_QUESTIONS: Array<Question> = [
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
