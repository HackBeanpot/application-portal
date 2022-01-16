import { ReactNode } from 'react';

/**
 * @param applicationStatus deez nuts
 */
export interface User {
  email: string;
  isAdmin: boolean;
  applicationStatus: ApplicationStatus;
  // Decision status might not exist because of backwards compatibility
  decisionStatus?: DecisionStatus;
  rsvpStatus: RSVPStatus;
  teamName?: string;
  responses?: Array<QuestionResponse>;
  postAcceptanceResponses?: Array<QuestionResponse>;
}

export type SingletonDefinition = DateSingleton;

export enum SingletonType {
  RegistrationOpen = 'registration-open',
  RegistrationClosed = 'registration-closed',
  ConfirmBy = 'confirm-by',
}

export interface DateSingleton {
  value: string;
  type: SingletonType.RegistrationClosed | SingletonType.RegistrationOpen | SingletonType.ConfirmBy;
}

export interface Team {
  name: string;
  userEmails: string[];
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
}
export enum RSVPStatus {
  Confirmed = 'Confirmed',
  NotAttending = 'Not Attending',
  Unconfirmed = 'Unconfirmed',
}
export enum DecisionStatus {
  Admitted = 'Admitted',
  Waitlisted = 'Waitlisted',
  Declined = 'Declined',
  Undecided = 'Undecided',
}

export enum QuestionType {
  Checkboxes = 'Checkboxes',
  ShortText = 'Short Text',
  Dropdown = 'Dropdown',
  LongText = 'Long Text',
}
export type QuestionDefinition = Checkboxes | ShortText | Dropdown | LongText;
export type QuestionSection = {
  id: string;
  type: 'SECTION';
  text: ReactNode;
  description?: ReactNode;
};

export type QuestionId = string;

interface IQuestion {
  field: string;
  content: ReactNode;
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
  placeholder?: string;
  maxLength: number;
  minLength: number;
}
export interface Dropdown extends IQuestion {
  type: QuestionType.Dropdown;
  placeholder?: string;
  options: Array<{ name: string }>;
}
export interface LongText extends IQuestion {
  type: QuestionType.LongText;
  maxLength: number;
  minLength: number;
}

export enum ConfirmByState {
  Before = 'Before',
  After = 'After',
}

export enum AttendingState {
  Unspecified = 'Unspecified',
  No = 'No',
  Yes = 'Yes',
}

/**
 * is a single string for text responses, and an array of the choices for multi-select responses
 */
export type QuestionResponse = string | Array<string> | null;

/**
 * @param responses mapping from question id to response value
 */
export type RegistrationApiRequest = {
  responses: Array<QuestionResponse>;
};
export type RegistrationApiResponse = RegistrationApiRequest;

export type StatusApiResponse = {
  applicationStatus: ApplicationStatus;
  rsvpStatus: RSVPStatus;
};

export type TeamApiResponse = Team;

export type DatesApiResponse = string;

export type ApplicantsApiResponse = {
  data: Array<User & { _id: string }>;
  totalCount: number;
  page: number;
  pageSize: number;
};

export type SingleApplicantApiResponse = {
  user: User & { _id: string };
};

export type PostAcceptanceApiRequest = {
  rsvpStatus: Exclude<RSVPStatus, RSVPStatus.Unconfirmed>;
  responses?: Array<QuestionResponse>;
};
