/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/
import React, { ReactNode } from 'react';

import {
  Checkboxes,
  Dropdown,
  Gender,
  InterestLevel,
  FileUpload,
  LongText,
  NumberOf,
  QuestionDefinition,
  QuestionResponseField,
  QuestionSection,
  QuestionType,
  Race,
  Referrer,
  School,
  ShirtSize,
  ShortText,
  YearOfEducation,
  YesOrNo,
  Lgbtq,
  RadioGroup,
  WorkshopTopics,
  CabinGroupings,
  ApplicationResponsesType,
  applicationResponsesSchema,
} from './types';

let questionCount = 0;
// constants for min/max length of q + others
const checkboxMinSelectedCount = 0;
const shortTextMinLength = 0;
const shortTextMaxLength = 500;
const longTextMinLength = 0;
const longTextMaxLength = 3000;

// convenience constructors for questions (constructors in java)
export function makeCheckbox(
  field: QuestionResponseField,
  content: ReactNode,
  options: Array<string>,
  required: boolean,
  checkboxMaxSelectedCount: number
): Checkboxes {
  questionCount++;
  return {
    field,
    type: QuestionType.Checkboxes,
    options: options.map((name) => ({ name })),
    maxNumber: checkboxMaxSelectedCount,
    minNumber: checkboxMinSelectedCount,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeShortText(
  field: QuestionResponseField,
  content: ReactNode,
  required: boolean,
  placeholder?: string
): ShortText {
  questionCount++;
  return {
    field,
    type: QuestionType.ShortText,
    maxLength: shortTextMaxLength,
    minLength: shortTextMinLength,
    placeholder,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeDropdown(
  field: QuestionResponseField,
  content: ReactNode,
  options: Array<string>,
  required: boolean,
  placeholder?: string
): Dropdown {
  questionCount++;
  return {
    field,
    type: QuestionType.Dropdown,
    options: options.map((name) => ({ name })),
    placeholder,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeRadioGroup(
  field: QuestionResponseField,
  content: ReactNode,
  options: Array<string>,
  required: boolean
): RadioGroup {
  questionCount++;
  return {
    field,
    type: QuestionType.RadioGroup,
    options: options.map((name) => ({ name })),
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeLongText(
  field: QuestionResponseField,
  content: ReactNode,
  required: boolean
): LongText {
  questionCount++;
  return {
    field,
    type: QuestionType.LongText,
    maxLength: longTextMaxLength,
    minLength: longTextMinLength,

    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

/**
 * @param accept file types to accept eg. '.pdf'
 * @param multiple whether or not we can upload multiple files at once
 * @param limit maximum # of files
 */
export function makeFileUpload(
  field: QuestionResponseField,
  content: ReactNode,
  required: boolean,
  accept: string,
  multiple: boolean,
  limit: number,
  submittedText: string
): FileUpload {
  questionCount++;
  return {
    field,
    type: QuestionType.FileUpload,
    content,
    id: String(questionCount),
    required,
    accept,
    multiple,
    limit,
    submittedText,
  };
}

let sectionCount = 0;

const characterRecommendationMessage = '(250 words maximum)';

export function makeSection(text: ReactNode, description?: ReactNode): QuestionSection {
  sectionCount++;
  return {
    id: `section-${sectionCount}`,
    text: <h2>{text}</h2>,
    type: 'SECTION',
    description: description ? description : '',
  };
}

// write questions for portal here
// when adding a new question add the question field to the User type in common/types.ts
export const Sections: Array<QuestionSection | QuestionDefinition> = [
  makeSection(<>Let{"'"}s Get to Know You!</>),
  makeShortText('firstName', 'First name', true, 'First name'),
  makeShortText('preferredName', 'Preferred name', false, 'Preferred name'),
  makeShortText('lastName', 'Last name', true, 'Last name'),
  makeShortText('homeTown', 'Home Town', true, 'ex: Boston'),

  makeSection(
    <>Demographics</>,
    <p>
      None of the information in your application will be publicly shared except for your resume (if
      you opt in to share that with us). Your application will only be used to track our diversity,
      equity and inclusion efforts.
    </p>
  ),
  makeShortText(
    'pronouns',
    <div>
      <p>
        <br />
        Pronouns
        <br />
        <i>Your pronouns will not be shared publicly or to companies.</i>
      </p>
    </div>,
    true,
    'Pronouns'
  ),
  makeDropdown(
    'gender',
    <div>
      <p>
        <br />
        What is your gender?
        <br />
        <i>Your gender identity will not be shared publicly or to companies.</i>
      </p>
    </div>,
    Object.values(Gender),
    true,
    'Gender'
  ),
  makeShortText('unlistedGender', "If your gender isn't listed above, list it here!", false),
  makeDropdown(
    'lgbtq',
    <div>
      <p>
        <br />
        Do you identify as part of the LGBTQIA+ community??
        <br />
        <i>Your orientation will not be shared publicly or to companies.</i>
      </p>
    </div>,
    Object.values(Lgbtq),
    true,
    'Identify'
  ),
  makeShortText(
    'lgbtqIdentity',
    'If you said yes to the question above, how do you identify yourself?',
    false
  ),
  makeCheckbox('races', 'What race(s) do you identify as?', Object.values(Race), true, 8),

  makeShortText('unlistedRace', "If your race(s) aren't listed above, list it here!", false),
  makeDropdown(
    'school',
    'What school do you attend?',
    Object.values(School).sort((a, b) => {
      if (a === School['Northeastern University']) return -1;
      if (b === School['Northeastern University']) return 1;

      if (a === School['Other']) return 1;
      if (b === School['Other']) return -1;
      return a.localeCompare(b);
    }),
    true,
    'School'
  ),
  makeShortText(
    'unlistedSchool',
    'If your school was not listed in the previous question, list it here! (Please input full name of university)',
    false
  ),
  makeDropdown(
    'yearOfEducation',
    'What year in your current education are you?',
    Object.values(YearOfEducation),
    true,
    'Year'
  ),
  makeShortText(
    'majors',
    'What are your major / concentration(s)? (N/A if not applicable)',
    true,
    'Computer Science, etc.'
  ),
  makeShortText('minors', 'What are your minor(s)?', false, 'Interaction Design, etc.'),
  makeFileUpload(
    'resumeLink',
    <div>
      <p>
        Please upload your resume as a PDF! We do not read resumes as a part of the HBP application
        process. The resumes are shared with interested sponsors who may contact you about
        internship/job opportunities, and will only be read by them. Here is a Harvard doc template
        to help you get started if you don&apos;t have a resume yet:{' '}
        <a
          href="https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1890ff', textDecoration: 'underline' }}
        >
          Resume Template
        </a>
      </p>
    </div>,
    true,
    '.pdf',
    false,
    1,
    "You've already submitted a resume, but feel free to upload another one! (This will replace the old resume you've submitted.)"
  ),

  makeShortText('github', 'Github Url', false, 'ex: github.com/HackBeanpot'),
  makeShortText('linkedIn', 'LinkedIn Url', false, 'ex: linkedin.com/company/hackbeanpot-inc'),
  makeShortText('personalWebsite', 'Personal Website / Portfolio Url', false),

  makeDropdown(
    'shirtSize',
    <div>
      What is your t-shirt size? (Note: All sizes are unisex, and{' '}
      <a
        href="https://www.bellacanvas.com/product/3001/Unisex-Jersey-Short-Sleeve-Tee.html#pills-size"
        target="_blank"
        style={{
          textDecoration: 'underline',
        }}
      >
        measurements
      </a>{' '}
      are across the widest part of the chest!){' '}
    </div>,
    Object.values(ShirtSize),
    true,
    'Size'
  ),
  makeLongText(
    'accomodations',
    <div>
      <p>
        Do you require any special accommodations to fully participate in the event? If yes, please
        list your requested accomodations and the best form of contact so that we can reach out to
        you.
      </p>
      <i>
        Please fill out this question if you don’t have access to a laptop for the event so we can
        look for arrangements.
      </i>
    </div>,
    false
  ),
  makeSection(<>Interests and Experience</>),
  makeDropdown(
    'hackathonsAttended',
    'How many hackathons have you attended?',
    [NumberOf.Zero, NumberOf.OneToTwo, NumberOf.ThreeToFive, NumberOf.SixOrAbove],
    true,
    'Count'
  ),
  makeDropdown(
    'csClassesTaken',
    'How many CS classes have you taken or are currently taking?',
    [NumberOf.Zero, NumberOf.OneToTwo, NumberOf.ThreeToFive, NumberOf.SixOrAbove],
    true,
    'Count'
  ),

  makeSection(
    <></>,
    <>
      Please indicate which of the following topics you would be interested in attending a workshop
      about!
      <br />
      <i>
        Disclaimer: This is just for data collection and planning purposes and will NOT impact your
        application!
      </i>
    </>
  ),

  makeCheckbox(
    'workshopTopics',
    '',
    [
      WorkshopTopics['Mobile App Development'],
      WorkshopTopics['Web Development'],
      WorkshopTopics['UI/UX'],
      WorkshopTopics['Backend'],
      WorkshopTopics['Frontend'],
      WorkshopTopics['Data Science'],
      WorkshopTopics['Cybersecurity'],
      WorkshopTopics['AI/Machine Learning'],
      WorkshopTopics['Product Management'],
      WorkshopTopics['Entrepreneurship'],
    ],
    true,
    10
  ),

  makeLongText(
    'hackBeanGoals',
    <div>
      <p>
        At HackBeanpot 2026, we aim to create a welcoming environment where you can meet new
        friends, learn something new, and ultimately, pursue your goals. In the long term, what are
        you trying to learn or achieve? Think about personal or career goals, or something else
        entirely. What steps have you taken in the past to reach those goals, and how will
        participating in HackBeanpot help?
      </p>
      {characterRecommendationMessage}
    </div>,
    true
  ),
  makeLongText(
    'tedTalkTopic',
    <div>
      <p>
        What&apos;s a topic you&apos;re really passionate about? It can be anything — your favorite
        book, a world problem, the color purple, a project idea, or something else. Why should
        someone else care about it as much as you do?
      </p>
      {characterRecommendationMessage}
    </div>,
    true
  ),
  makeLongText(
    'prevHackathonFeedback',
    `Have you attended HackBeanpot previously? If you've attended a hackathon previously, what did you like or dislike about it? If this is your first hackathon, what would you like to see at HackBeanpot? `,
    true
  ),
  makeSection(<>Outreach</>),
  makeCheckbox(
    'referrers',
    'We want to know how best to reach talented students like you! How did you hear about HackBeanpot?',
    [
      Referrer.Facebook,
      Referrer.Instagram,
      Referrer.LinkedIn,
      Referrer.Twitter,
      Referrer.TikTok,
      Referrer.EmailOrNewsletter,
      Referrer.WordOfMouth,
      Referrer.OutreachEvents,
      Referrer.SchoolCommunications,
      Referrer.Other,
    ],
    true,
    10
  ),

  makeShortText(
    'unListedReferrer',
    'If you found out about HackBeanpot some other way and was not listed in the previous question, write it here!',
    false
  ),

  makeSection(
    <>Cabin Grouping</>,
    <>
      Hackers come to HackBeanpot for many reasons. For each of the reasons listed, indicate how
      important it is to you!
    </>
  ),

  makeDropdown('NewFriends', CabinGroupings.NewFriends, Object.values(InterestLevel), true),

  makeDropdown(
    'TechnicalWorkshops',
    CabinGroupings.TechnicalWorkshops,
    Object.values(InterestLevel),
    true
  ),
  makeDropdown('HavingFun', CabinGroupings.HavingFun, Object.values(InterestLevel), true),
  makeDropdown(
    'NetworkingOpportunities',
    CabinGroupings.NetworkingOpportunities,
    Object.values(InterestLevel),
    true
  ),
  makeDropdown(
    'ExchangingKnowledge',
    CabinGroupings.ExchangingKnowledge,
    Object.values(InterestLevel),
    true
  ),
  makeDropdown('CoopJobSearch', CabinGroupings.CoopJobSearch, Object.values(InterestLevel), true),

  makeSection(
    <>Core Feedback</>,
    <i>
      The HackBeanpot Core team is always looking to continue iterating and making this hackathon
      the best possible experience for everyone! We&apos;d really appreciate it if you took a few
      minutes to leave some feedback for us :)
    </i>
  ),
  makeLongText(
    'commentsQuestionsSuggestions',
    'Leave us any comments, questions, or suggestions on this application process!',
    false
  ),
  makeLongText(
    'howCanCoreTeamHelp',
    'What can the Core team do to help you have the best experience at HackBeanpot 2026?',
    false
  ),
  makeSection(<>Code of Conduct and Policy</>),
  makeCheckbox(
    'mlhCodeOfConduct',
    <p>
      I have read and agree to the{' '}
      <a
        href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Code of Conduct
      </a>
    </p>,
    [YesOrNo.Yes],
    true,
    1
  ),
  makeCheckbox(
    'mlhApplicationSharingAuthorization',
    <p>
      I authorize you to share my application/registration information with Major League Hacking for
      event administration, ranking, and MLH administration in-line with the{' '}
      <a
        href="https://mlh.io/privacy"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Privacy Policy
      </a>
      . I further agree to the terms of both the{' '}
      <a
        href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Contest Terms and Conditions
      </a>{' '}
      and the{' '}
      <a
        href="https://mlh.io/privacy"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Privacy Policy
      </a>
    </p>,
    [YesOrNo.Yes],
    true,
    1
  ),
  makeCheckbox(
    'mlhMarketingAuthorization',
    'I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.',
    [YesOrNo.Yes],
    true,
    1
  ),
];

const filterQuestion = (q: QuestionSection | QuestionDefinition): q is QuestionDefinition => {
  return q.type !== 'SECTION';
};

export const isApplicationField = (
  q: QuestionDefinition
): q is QuestionDefinition & { field: keyof ApplicationResponsesType } => {
  return (
    Object.keys(applicationResponsesSchema.shape) as Array<keyof ApplicationResponsesType>
  ).includes(q.field as keyof ApplicationResponsesType);
};

export const Questions: Array<QuestionDefinition> = Sections.filter(filterQuestion);

// when adding a new question add the question field to the User type in common/types.ts
export const PostAcceptanceFormSections: Array<QuestionSection | QuestionDefinition> = [
  makeSection(
    <>Post-Acceptance Form</>,
    <div>
      <p>
        Congrats on being accepted to HackBeanpot! We{"'"}re so excited to see you soon. Please
        answer the following questions to help us finalize logistics of making the event as great as
        it can be for our attendees!
      </p>
    </div>
  ),
  makeShortText('firstName', 'First name', true, 'First name'),
  makeShortText('lastName', 'Last name', true, 'Last name'),
  makeDropdown('adult', 'Are you 18 years of age or older?', ['Yes', 'No'], true, 'Yes'),
  makeSection(
    <>Above 18 Signature</>,
    'Complete this section only if you are above 18 years of age. If you are not, type in "N/A" and complete the following section accompanied by a parent or guardian.'
  ),
  makeShortText(
    'adultSignature',
    <div>
      <p>
        By typing my full legal name below, I acknowledge that this represents my legal signature
        and that I have read and agreed to the terms and conditions stated in the Participant
        Waiver.
      </p>
      PARTICIPANT WAIVER:{' '}
      <a href="http://bit.ly/3XjlJEz" target="_blank" rel="noreferrer">
        bit.ly/3XjlJEz
      </a>
    </div>,
    true,
    'First Last'
  ),
  makeSection(
    <>Under 18 Signature</>,
    'Complete this section only if you are under 18 years of age. If you are 18 years of age or over, mark "N/A" for both fields.'
  ),
  makeShortText(
    'minorSignature',
    <div>
      <p>
        Attendee: I acknowledge that I am above 13 and that I have read and agreed to the terms and
        conditions stated in the Participant Waiver.
      </p>
      PARTICIPANT WAIVER:{' '}
      <a href="http://bit.ly/3XjlJEz" target="_blank" rel="noreferrer">
        bit.ly/3XjlJEz
      </a>
    </div>,
    true,
    'First Last'
  ),
  makeShortText(
    'guardianSignature',
    'Guardian: I acknowledge that I am above 18 years of age. I have read and agreed to the terms and conditions stated in the Participant Waiver and will make sure the attendee follows the platform usage defined in the Media & Platform Release.',
    true,
    'First Last'
  ),
];

export const PostAcceptanceFormQuestions = PostAcceptanceFormSections.filter(filterQuestion);
