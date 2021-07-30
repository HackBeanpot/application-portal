import {
  User,
  Gender,
  Education,
  Ethnicity,
  ShirtSize,
  ApplicationStatus,
  RegistrationResponse,
} from './types'

export const EXAMPLE_GENDER = Gender.Female
export const EXAMPLE_EDUCATION = Education.Undergraduate
export const EXAMPLE_ETHNICITIES = [Ethnicity.Asian]
export const EXAMPLE_SHIRTSIZE = ShirtSize.Small
export const EXAMPLE_APPLICATION_STATUS = ApplicationStatus.Declined
/**
 * example json User to use for now
 */
export const EXAMPLE_USER_ID = 'user12231'
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
}

export const EXAMPLE_RESPONSE: RegistrationResponse = {
  userId: EXAMPLE_USER_ID,
  responses: {
    question1: 'Judy Su',
    question2: EXAMPLE_ETHNICITIES,
  },
}
