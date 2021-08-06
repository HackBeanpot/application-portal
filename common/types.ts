export interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  gender: Gender;
  school: string;
  education: Education;
  yearOfEducation: YearOfEducation;
  ethnicities: Array<Ethnicity>;
  shirtSize: ShirtSize;
  applicationStatus: ApplicationStatus;
  major: string;
  minor: string;
  resumeLink: string;
  timeZone: string;
  learningGoals: string;
  responses: Array<QuestionResponse>;
}
export interface PortalState {
  openDate: Date;
  closeDate: Date;
  maxAttendees: number;
  numAttendees: number;
  totalConfirmed: number;
}
export enum Gender {
  Nonbinary = 'Nonbinary',
  Female = 'Female',
  Male = 'Male',
  Unspecified = 'Unspecified',
}
export enum Education {
  HighSchool = 'High School',
  Undergraduate = 'Undergraduate',
  Graduate = 'Graduate',
  Doctorate = 'Doctorate',
}
type YearOfEducation = 1 | 2 | 3 | 4 | 5 | '5+';
export enum Ethnicity {
  IndigenousAlaskaNative = 'Indigenous / Alaska Native',
  Asian = 'Asian',
  BlackAfricanAmerican = 'Black / African American',
  HispanicLatino = 'Hispanic / Latino',
  NativeHawaiianPacificIslander = 'Native Hawaiian / Pacific Islander',
  White = 'White',
  Other = 'Other',
}
export enum ShirtSize {
  XSmall = 'XSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge',
}
export enum ApplicationStatus {
  Unverified = 'Unverified',
  IncompleteRegistrationOpen = 'Incomplete / RegistrationOpen',
  IncompleteRegistrationClosed = 'Incomplete / RegistrationClosed',
  SubmittedRegistrationOpen = 'Submitted / RegistrationOpen',
  SubmittedRegistrationClosed = 'Submitted / RegistrationClosed',
  AdmittedUnconfirmed = 'Admitted / Unconfirmed',
  AdmittedConfirmedDeadlinePassed = 'Admitted / Confirmed Deadline Passed',
  Waitlisted = 'Waitlisted',
  Confirmed = 'Confirmed',
  Declined = 'Declined',
}
export enum QuestionType {
  Checkboxes = 'Checkboxes',
  ShortText = 'Short Text',
  Dropdown = 'Dropdown',
  LongText = 'Long Text',
}
export type Question = Checkboxes | ShortText | Dropdown | LongText;
interface IQuestion {
  content: string;
  id: string;
  required: boolean;
}
export interface Checkboxes extends IQuestion {
  type: QuestionType.Checkboxes;
  options: Array<{ name: string }>;
  maxNumber: number;
  minNumber: number;
}
export interface ShortText extends IQuestion {
  type: QuestionType.ShortText;
  maxLength: number;
  minLength: number;
}
export interface Dropdown extends IQuestion {
  type: QuestionType.Dropdown;
  options: Array<{ name: string }>;
}
export interface LongText extends IQuestion {
  type: QuestionType.LongText;
  maxLength: number;
  minLength: number;
}
/**
 * @param response is a single string for text responses, and an array of the choices for multi-select responses
 */
interface QuestionResponse {
  id: string;
  response: string | Array<string>;
}
/**
 * @param responses mapping from question id to response value
 */
export type RegistrationResponse = {
  userId: string;
  /**
   * maps from question id to response value
   */
  responses: Record<string, QuestionResponse['response']>;
};
