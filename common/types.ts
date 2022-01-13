import { ReactNode } from 'react';

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
  teamName?: string;
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
  Admitted = 'Admitted',
  Waitlisted = 'Waitlisted',
  Declined = 'Declined',
}
export enum RSVPStatus {
  Attending="Attending",
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
export type QuestionSection = {
  id: string;
  type: 'SECTION';
  text: ReactNode;
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
