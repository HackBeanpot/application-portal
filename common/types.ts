import { ReactNode } from 'react';

/**
 * @param applicationStatus deez nuts :0
 */
export interface User {
  name?: string;
  gender?: Gender;
  unlistedGender?: string;
  school?: string;
  unlistedSchool?: string;
  email: string;
  ethnicities?: Array<Ethnicity>;
  education?: Education;
  yearOfEducation?: YearOfEducation;
  majors?: string;
  minors?: string;
  resumeLink?: string;
  shirtSize?: ShirtSize;
  hackathonsAttended?: string;
  prevHackathonFeedback?: string;
  hackBeanGoals?: string;
  tedTalkTopic?: string;
  meetAlienSpeech?: string;
  referrers?: Array<string>;
  interestedWorkshops?: Array<string>;
  applyingWithTeam?: string;
  interestedInTeamFormation?: string;
  firstName?: string;
  lastName?: string;
  adult?: string;
  adultSignature?: string;
  minorSignature?: string;
  guardianSignature?: string;
  swag?: string[];
  accomodations?: string;
  pickUpSwag?: string;
  address?: string;
  careerInTech?: string;
  personAtParty?: string;
  wonLottery?: string;
  themePark?: string;
  celebrity?: string;
  isAdmin: boolean;
  applicationStatus: ApplicationStatus;
  // Decision status might not exist because of backwards compatibility
  decisionStatus?: DecisionStatus;
  rsvpStatus: RSVPStatus;
  responses?: Array<QuestionResponse>;
  postAcceptanceResponses?: Array<QuestionResponse>;
}

export type SingletonDefinition = DateSingleton | ShowDecisionSingleton;

export enum SingletonType {
  RegistrationOpen = 'registration-open',
  RegistrationClosed = 'registration-closed',
  ConfirmBy = 'confirm-by',
  ShowDecision = 'show-decision',
}

export interface ShowDecisionSingleton {
  value: boolean;
  type: SingletonType.ShowDecision;
}

export interface DateSingleton {
  value: string;
  type: SingletonType.RegistrationClosed | SingletonType.RegistrationOpen | SingletonType.ConfirmBy;
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
type YearOfEducation = '1' | '2' | '3' | '4' | '5' | '5+';
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
  FileUpload = 'File Upload',
}
export type QuestionDefinition = Checkboxes | ShortText | Dropdown | LongText | FileUpload;
export type QuestionSection = {
  id: string;
  type: 'SECTION';
  text: ReactNode;
  description?: ReactNode;
};

export type QuestionId = string;

interface IQuestion {
  field: keyof User;
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

export interface FileUpload extends IQuestion {
  type: QuestionType.FileUpload;
  accept: string;
  multiple: boolean;
  limit: number;
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
  fields: Array<keyof User | string>;
  responses: Array<QuestionResponse>;
};
export type RegistrationApiResponse = RegistrationApiRequest;

export type StatusApiResponse = {
  applicationStatus: ApplicationStatus;
  rsvpStatus: RSVPStatus;
};

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
