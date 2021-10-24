import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export interface User {
  email: string;
  rsvpStatus: RSVPStatus;
  isAdmin: boolean;
  applicationStatus: ApplicationStatus;
  firstName?: string;
  lastName?: string;
  id?: string;
  gender?: Gender;
  school?: string;
  education?: Education;
  yearOfEducation?: YearOfEducation;
  ethnicities?: Array<Ethnicity>;
  shirtSize?: ShirtSize;
  major?: string;
  minor?: string;
  resumeLink?: string;
  timeZone?: string;
  learningGoals?: string;
  responses?: Array<QuestionResponse>;
}
export type SingletonDefinition = DateSingleton;

export enum SingletonType {
  RegistrationOpen = 'registration-open',
  RegistrationClosed = 'registration-closed',
  ConfirmBy = 'confirm-by',
}

export interface DateSingleton {
  value: string;
  type:
    | SingletonType.RegistrationClosed
    | SingletonType.RegistrationOpen
    | SingletonType.ConfirmBy;
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
  Incomplete = 'Incomplete',
  Submitted = 'Submitted',
  Admitted = 'Admitted',
  Waitlisted = 'Waitlisted',
  Declined = 'Declined',
}
export enum RSVPStatus {
  InPerson = 'In Person',
  Virtual = 'Virtual',
  NotAttending = 'Not Attending',
  Unconfirmed = 'Unconfirmed',
}
export enum QuestionType {
  Checkboxes = 'Checkboxes',
  ShortText = 'Short Text',
  Dropdown = 'Dropdown',
  LongText = 'Long Text',
}
export type QuestionDefinition = Checkboxes | ShortText | Dropdown | LongText;

export type QuestionId = string;

interface IQuestion {
  content: string;
  id: QuestionId;
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
 * is a single string for text responses, and an array of the choices for multi-select responses
 */
export type QuestionResponse = string | Array<string> | null;

export type QuestionIdToDefinitionMap = Record<QuestionId, QuestionDefinition>;
export type QuestionIdToResponseMap = Record<QuestionId, QuestionResponse>;

/**
 * @param responses mapping from question id to response value
 */
export type RegistrationApiRequest = {
  responses: Array<QuestionResponse>;
};

export interface Answer {
  id: string;
  answer: string | CheckboxValueType[];
}

export interface Error {
  id: string;
  error: string;
}
export type StatusApiResponse = {
  applicationStatus: ApplicationStatus;
  rsvpStatus: RSVPStatus;
};
