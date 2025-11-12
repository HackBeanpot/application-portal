import { ReactNode } from 'react';
import {
  Aspirations,
  Club,
  DuringClass,
  HangingWithFriends,
  SocialMedia,
  StuckInElevator,
  Study,
  TakeOverNation,
  ZombieApocalypse,
} from './postAcceptanceTypes';
import { z } from 'zod';

/**
 * @param applicationStatus deez nuts :0
 */
export interface User {
  email: string;
  applicationResponses: ApplicationResponsesType;
  postAcceptanceResponses?: PostAcceptanceResponses;
  isAdmin: boolean;
  applicationStatus: ApplicationStatus;
  postAcceptanceStatus?: ApplicationStatus;
  // Decision status might not exist because of backwards compatibility
  decisionStatus?: DecisionStatus;
  rsvpStatus: RSVPStatus;
  responses?: Array<QuestionResponse>; // legacy
  appSubmissionTime?: Date;
  rsvpSubmissionTime?: Date;
}

export interface SharedResponses {
  firstName?: string;
  lastName?: string;
}

export interface PostAcceptanceResponses extends SharedResponses {
  adult?: string;
  adultSignature?: string;
  minorSignature?: string;
  guardianSignature?: string;
  hangingWithFriends?: HangingWithFriends;
  zombieApocalypse?: ZombieApocalypse;
  takeOverNation?: TakeOverNation;
  aspirations?: Aspirations;
  study?: Study;
  stuckInElevator?: StuckInElevator;
  club?: Club;
  socialMedia?: SocialMedia;
  duringClass?: DuringClass;
}

export type QuestionResponseField = keyof ApplicationResponsesType | keyof PostAcceptanceResponses;

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
  Nonbinary = 'Non-binary',
  Female = 'Female',
  Male = 'Male',
  Genderqueer = 'Genderqueer',
  Unlisted = 'Unlisted',
  PreferNotToSay = 'Prefer not to say',
}

export enum YearOfEducation {
  first = '1st year',
  second = '2nd year',
  third = '3rd year',
  fourth = '4th year',
  fifthOrAbove = '5th year +',
}

export enum Race {
  IndigenousAlaskaNative = 'Indigenous American or Alaska Native',
  Asian = 'Asian (East, Southeast, South)',
  BlackAfricanAmerican = 'Black or African American',
  HispanicLatinx = 'Hispanic or Latinx',
  NativeHawaiianPacificIslander = 'Native Hawaiian or Other Pacific Islander',
  White = 'White',
  Unlisted = 'Unlisted',
  PreferNotToSay = 'Prefer not to say',
}
export enum ShirtSize {
  XSmall = 'XS',
  Small = 'S',
  Medium = 'M',
  Large = 'L',
  XLarge = 'XL',
  XXLarge = '2XL',
}

export enum NumberOf {
  Zero = '0',
  OneToTwo = '1-2',
  ThreeToFive = '3-5',
  SixOrAbove = '6+',
}

export enum InterestLevel {
  None = "I don't want to do that at HackBeanpot",
  Not = "That's not important to me",
  Somewhat = "That's somewhat important to me",
  Very = "That's very important to me",
}

export enum Referrer {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  TikTok = 'TikTok',
  EmailOrNewsletter = 'HackBeanpot email / newsletter',
  WordOfMouth = 'Word of mouth / friends',
  OutreachEvents = 'HackBeanpot outreach events',
  SchoolCommunications = 'School communications / newsletter features',
  Other = 'Other',
}

export enum WorkshopTopics {
  'Mobile App Development' = 'Mobile App Development',
  'Web Development' = 'Web Development',
  'UI/UX' = 'UI/UX',
  'Backend' = 'Backend',
  'Frontend' = 'Frontend',
  'Data Science' = 'Data Science',
  'Cybersecurity' = 'Cybersecurity',
  'AI/Machine Learning' = 'AI/Machine Learning',
  'Product Management' = 'Product Management',
  'Entrepreneurship' = 'Entrepreneurship',
}

export enum YesOrNo {
  Yes = 'Yes',
  No = 'No',
}

export enum Lgbtq {
  Yes = 'Yes',
  No = 'No',
  PreferNotToSay = 'Prefer not to say',
  Unsure = 'Unsure',
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
  RadioGroup = 'RadioGroup',
}

export type QuestionDefinition =
  | Checkboxes
  | ShortText
  | Dropdown
  | LongText
  | FileUpload
  | RadioGroup;
export type QuestionSection = {
  id: string;
  type: 'SECTION';
  text: ReactNode;
  description?: ReactNode;
};

export type QuestionId = string;

interface IQuestion {
  field: QuestionResponseField;
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

export interface RadioGroup extends IQuestion {
  type: QuestionType.RadioGroup;
  options: Array<{ name: string }>;
}

export interface FileUpload extends IQuestion {
  type: QuestionType.FileUpload;
  accept: string;
  multiple: boolean;
  limit: number;
  submittedText: string;
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
export type QuestionResponse = string | Array<string> | undefined | null;

/**
 * @param responses mapping from question id to response value
 */
export type RegistrationApiRequest = {
  fields: Array<keyof ApplicationResponsesType>;
  responses: Array<QuestionResponse>;
};
export type RegistrationApiResponse = RegistrationApiRequest;

export type UpdateRegistrationApiRequest = {
  fields: Array<keyof Partial<ApplicationResponsesType>>;
  responses: Array<Partial<QuestionResponse>>;
};

export type StatusApiResponse = {
  applicationStatus: ApplicationStatus;
  postAcceptanceStatus: ApplicationStatus;
  rsvpStatus: RSVPStatus;
};

export type DatesApiResponse = string;

export type ApplicantsApiResponse = {
  data: Array<User & { _id: string }>;
  totalCount: number;
  page: number;
  pageSize: number;
  searchQuery?: string;
};

export type SingleApplicantApiResponse = {
  user: User & { _id: string };
};

export type PostAcceptanceApiRequest = {
  rsvpStatus: Exclude<RSVPStatus, RSVPStatus.Unconfirmed>;
  fields?: Array<keyof PostAcceptanceResponses>;
  responses?: Array<QuestionResponse>;
};

export enum School {
  'Northeastern University' = 'Northeastern University',
  'Boston University' = 'Boston University',
  'MIT' = 'MIT',
  'Harvard University' = 'Harvard University',
  'Tufts University' = 'Tufts University',
  'University of Massachusetts Amherst' = 'University of Massachusetts Amherst',
  'Boston College' = 'Boston College',
  'Emerson College' = 'Emerson College',
  'Suffolk University' = 'Suffolk University',
  'Brandeis University' = 'Brandeis University',
  'Wellesley College' = 'Wellesley College',
  'Wentworth Institute of Technology' = 'Wentworth Institute of Technology',
  'Olin College of Engineering' = 'Olin College of Engineering',
  'Simmons University' = 'Simmons University',
  'Benjamin Franklin Institute of Technology' = 'Benjamin Franklin Institute of Technology',
  'University of Massachusetts Boston' = 'University of Massachusetts Boston',
  'Bunker Hill Community College' = 'Bunker Hill Community College',
  'Bristol Community College' = 'Bristol Community College',
  'Worcester Polytechnic Institute' = 'Worcester Polytechnic Institute',
  'Other' = 'Other',
}

export enum CabinGroupings {
  'NewFriends' = 'Making new friends outside of your team',
  'TechnicalWorkshops' = 'Attending technical workshops',
  'HavingFun' = 'Having fun',
  'NetworkingOpportunities' = 'Engaging in professional networking opportunities',
  'ExchangingKnowledge' = 'Exchanging technical knowledge with others',
  'CoopJobSearch' = 'Preparing for co-op/internship/job search',
}

const GenderSchema = z.nativeEnum(Gender);
const LgbtqSchema = z.nativeEnum(Lgbtq);
const SchoolSchema = z.nativeEnum(School);
const RaceSchema = z.nativeEnum(Race);
const YearOfEducationSchema = z.nativeEnum(YearOfEducation);
const ShirtSizeSchema = z.nativeEnum(ShirtSize);
const NumberOfSchema = z.nativeEnum(NumberOf);
const InterestLevelSchema = z.nativeEnum(InterestLevel);
const ReferrerSchema = z.nativeEnum(Referrer);
const YesOrNoSchema = z.nativeEnum(YesOrNo);
const YesSchema = z.enum([YesOrNo.Yes]);
const WorkshopTopicSchema = z.nativeEnum(WorkshopTopics);

const SharedResponsesSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const applicationResponsesSchema = SharedResponsesSchema.extend({
  preferredName: z.string().optional(),
  homeTown: z.string().optional(),
  pronouns: z.string().optional(),
  gender: GenderSchema.optional(),
  unlistedGender: z.string().optional(),
  lgbtq: LgbtqSchema.optional(),
  lgbtqIdentity: z.string().optional(),
  races: z.array(RaceSchema).optional(),
  unlistedRace: z.string().optional(),
  school: SchoolSchema.optional(),
  unlistedSchool: z.string().optional(),
  yearOfEducation: YearOfEducationSchema.optional(),
  majors: z.string().optional(),
  minors: z.string().optional(),
  resumeLink: z.string().optional(),
  github: z.string().optional(),
  linkedIn: z.string().optional(),
  personalWebsite: z.string().optional(),
  shirtSize: ShirtSizeSchema.optional(),
  accomodations: z.string().optional(),
  hackathonsAttended: NumberOfSchema.optional(),
  csClassesTaken: NumberOfSchema.optional(),
  workshopTopics: z.array(WorkshopTopicSchema).optional(),
  hackBeanGoals: z.string().optional(),
  tedTalkTopic: z.string().optional(),
  prevHackathonFeedback: z.string().optional(),
  referrers: z.array(ReferrerSchema).optional(),
  unListedReferrer: z.string().optional(),
  NewFriends: InterestLevelSchema.optional(),
  TechnicalWorkshops: InterestLevelSchema.optional(),
  HavingFun: InterestLevelSchema.optional(),
  NetworkingOpportunities: InterestLevelSchema.optional(),
  ExchangingKnowledge: InterestLevelSchema.optional(),
  CoopJobSearch: InterestLevelSchema.optional(),
  commentsQuestionsSuggestions: z.string().optional(),
  howCanCoreTeamHelp: z.string().optional(),
  mlhCodeOfConduct: YesSchema.optional(),
  mlhApplicationSharingAuthorization: YesSchema.optional(),
  mlhMarketingAuthorization: YesOrNoSchema.optional(),
});

export type ApplicationResponsesType = z.infer<typeof applicationResponsesSchema>;
