import { ReactNode } from 'react';

/**
 * @param applicationStatus deez nuts :0
 */
export interface User {
  email: string;
  applicationResponses?: ApplicationResponses;
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

export interface ApplicationResponses extends SharedResponses {
  preferredName?: string;
  pronouns?: string;
  gender?: Gender;
  unlistedGender?: string;
  lgbtq?: Lgbtq;
  school?: School;
  unlistedSchool?: string;
  races?: Array<Race>;
  unlistedRace?: string;
  education?: Education;
  yearOfEducation?: YearOfEducation;
  majors?: string;
  minors?: string;
  resumeLink?: string;
  shirtSize?: ShirtSize;
  hackathonsAttended?: NumberOf;
  csClassesTaken?: NumberOf;
  mobileAppDevelopmentFamiliarity?: Familiarity;
  webDevelopmentFamiliarity?: Familiarity;
  uiUxFamiliarity?: Familiarity;
  backendFamiliarity?: Familiarity;
  frontendFamiliarity?: Familiarity;
  dataScienceFamiliarity?: Familiarity;
  cybersecurityFamiliarity?: Familiarity;
  mobileAppDevelopmentInterestLevel?: InterestLevel;
  webDevelopmentInterestLevel?: InterestLevel;
  uiUxInterestLevel?: InterestLevel;
  backendInterestLevel?: InterestLevel;
  frontendInterestLevel?: InterestLevel;
  dataScienceInterestLevel?: InterestLevel;
  cybersecurityInterestLevel?: InterestLevel;
  interestedWorkshops?: Array<Workshop>;
  unlistedWorkshops?: string;
  prevHackathonFeedback?: string;
  hackBeanGoals?: string;
  tedTalkTopic?: string;
  meetAlienSpeech?: string;
  referrers?: Array<Referrer>;
  unListedReferrer?: string;
  premadeTeam?: string;
  interestedInTeamFormation?: YesOrNo;
  accomodations?: string;
  questionsToAdd?: string;
  commentsQuestionsSuggestions?: string;
  howCanCoreTeamHelp?: string;
}

export interface PostAcceptanceResponses extends SharedResponses {
  adult?: string;
  adultSignature?: string;
  minorSignature?: string;
  guardianSignature?: string;
  swag?: Array<string>;
  accomodations?: string;
  pickUpSwag?: string;
  address?: string;
  careerInTech?: string;
  personAtParty?: string;
  wonLottery?: string;
  themePark?: string;
  celebrity?: string;
}

export type QuestionResponseField = keyof ApplicationResponses | keyof PostAcceptanceResponses;

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
  Genderqueer = 'Genderqueer',
  Unlisted = 'Unspecified',
  PreferNotToSay = 'Prefer not to say',
}

export enum School {
  NortheasternUniversity = 'Northeastern University',
  BostonUniversity = 'Boston University',
  MIT = 'MIT',
  HarvardUniversity = 'Harvard University',
  TuftsUniversity = 'Tufts University',
  UniversityOfMassachusettsAmherst = 'University of Massachusetts Amherst',
  BostonCollege = 'Boston College',
  EmersonCollege = 'Emerson College',
  SuffolkUniversity = 'Suffolk University',
  BrandeisUniversity = 'Brandeis University',
  WellesleyCollege = 'Wellesley College',
  WentworthInstituteOfTechnology = 'Wentworth Institute of Technology',
  OlinCollegeOfEngineering = 'Olin College of Engineering',
  BenjaminFranklinInstituteOfTechnology = 'Benjamin Franklin Institute of Technology',
  SimmonsUniversity = 'Simmons University',
  BristolCommunityCollege = 'Bristol Community College',
  WorcesterPolytechnicInstitute = 'Worcester Polytechnic Institute',
  Other = 'Other',
}

export enum Education {
  HighSchool = 'High School',
  Undergraduate = 'Undergraduate',
  Graduate = 'Graduate',
}

export enum YearOfEducation {
  first = '1st year',
  second = '2nd year',
  third = '3rd year',
  fourth = '4th year',
  fifthOrAbove = '5th year +',
}

export enum Race {
  IndigenousAlaskaNative = 'Indigenous / Alaska Native',
  Asian = 'Asian (East, Southeast, South)',
  BlackAfricanAmerican = 'Black or African American',
  HispanicLatinx = 'Hispanic or Latinx',
  NativeHawaiianPacificIslander = 'Native Hawaiian or Pacific Islander',
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

export enum Familiarity {
  CompletelyUnfamiliar = 'Completely unfamiliar',
  VeryBasicKnowledge = 'Very basic knowledge',
  Proficient = 'Proficient',
  Expert = 'Expert',
}

export enum InterestLevel {
  NotInterested = 'Not Interested',
  SomewhatInterested = 'Somewhat Interested',
  VeryInterested = 'Very Interested',
}

export enum Workshop {
  Git = 'Intro to Git',
  WebDev = 'Intro to Web Dev (HTML / CSS / JS)',
  IntermediateWebDev = 'Intermediate Web Dev',
  React = 'Intro to React',
  Apis = 'Intro to APIs',
  GameDev = 'Intro to Game Dev',
  HBPPanel = 'HackBeanpot Panel',
  ResumesAndInternships = 'Resumes and Internships',
  Backend = 'Backend Workshop',
  MobileAppDev = 'Intro to Mobile App Dev',
  MachineLearning = 'Intro to Machine Learning',
  Docker = 'Intro to Docker',
  Go = 'Intro to Go',
  DemoAProject = 'How to Demo a Project for Judging',
  CareersInTech = 'Careers in Tech',
  DiversityInTech = 'Diversity in Tech',
  TechForSocialGood = 'Tech for Social Good',
  None = 'None',
}

export enum Referrer {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  Medium = 'Medium',
  EmailOrNewsletter = 'HackBeanpot email / newsletter',
  WordOfMouth = 'Word of mouth / friends',
  OutreachEvents = 'HackBeanpot outreach events (MiniHacks, FUNdamentals of HTML / CSS / JS, etc.)',
  SchoolCommunications = 'School communications / newsletter features',
  Other = 'Other',
}

export enum YesOrNo {
  Yes = 'Yes',
  No = 'No',
}

export enum Lgbtq {
  Yes = 'Yes',
  No = 'No',
  PreferNotToSay = 'Prefer not to say',
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
  fields: Array<keyof ApplicationResponses>;
  responses: Array<QuestionResponse>;
};
export type RegistrationApiResponse = RegistrationApiRequest;

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
};

export type SingleApplicantApiResponse = {
  user: User & { _id: string };
};

export type PostAcceptanceApiRequest = {
  rsvpStatus: Exclude<RSVPStatus, RSVPStatus.Unconfirmed>;
  fields?: Array<keyof PostAcceptanceResponses>;
  responses?: Array<QuestionResponse>;
};
