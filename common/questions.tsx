/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/
import React, { ReactNode } from 'react';
import countryList from 'iso3166-2-db/countryList/en.json';


import {
  Checkboxes,
  Dropdown,
  Education,
  Familiarity,
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
  Workshop,
  YearOfEducation,
  YesOrNo,
  Lgbtq,
  RadioGroup,
} from './types';
import {
  HangingWithFriends,
  ZombieApocalypse,
  TakeOverNation,
  Aspirations,
  Study,
  Club,
  SocialMedia,
  DuringClass,
  StuckInElevator,
} from './postAcceptanceTypes';
import { mlhAuthorizeShareApplicationText } from './constants';

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
  makeShortText('age', 'Age', true, 'Age'),
  makeShortText('homeTown', 'Home Town', true, 'ex: Boston'),
  makeDropdown('countryOfResidence',
    'Country Of Residence', 
    Object.values(countryList).map(country => country.name).sort((a, b) => a.localeCompare(b)),
    true, 
    'Country of Residence'),
  makeShortText('phoneNumber', 'Phone Number', true, 'Phone Number'),
  makeShortText('github', 'Github Url', false, 'ex: github.com/HackBeanpot'),
  makeShortText('linkedIn', 'LinkedIn Url', false, 'ex: linkedin.com/company/hackbeanpot-inc'),

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
    Object.keys(Gender),
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
    [Lgbtq.Yes, Lgbtq.No, Lgbtq.PreferNotToSay, Lgbtq.Unsure],
    true,
    'Identify'
  ),
  makeCheckbox('races', 'What race(s) do you identify as?', Object.values(Race), true, 8),

  makeShortText('unlistedRace', "If your race(s) aren't listed above, list it here!", false),
  makeDropdown('school', 'What school do you attend?', Object.values(School), true, 'School'),
  makeShortText(
    'unlistedSchool',
    'If your school was not listed in the previous question, list it here! (Please input full name of university, Ex: University of Southern California)',
    false
  ),
  makeDropdown(
    'education',
    'What level of education are you currently pursuing?',
    Object.values(Education),
    true,
    'Level'
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
        internship/job opportunities, and will only be read by them. Here is a Google doc template
        to help you get started if you don’t have a resume yet:
        https://docs.google.com/document/d/1vOdGOeGk5XTKL4Zu-9lctJKbDfC1zIVSKO2xowXnC3Q/edit
      </p>
    </div>,
    true,
    '.pdf',
    false,
    1,
    "You've already submitted a resume, but feel free to upload another one! (This will replace the old resume you've submitted.)"
  ),

  makeDropdown(
    'shirtSize',
    <div>
      We will be handing out t-shirts and other fun swag at the event. What is your t-shirt size?{' '}
      <i>All sizes are unisex.</i>
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
    'How many CS classes have you taken?',
    [NumberOf.Zero, NumberOf.OneToTwo, NumberOf.ThreeToFive, NumberOf.SixOrAbove],
    true,
    'Count'
  ),
  makeSection(
    <></>,
    <i>
      For each of the following CS disciplines, please rate your familiarity from (completely
      unfamiliar, very basic knowledge, proficient, expert)
    </i>
  ),
  makeRadioGroup(
    'mobileAppDevelopmentFamiliarity',
    'Mobile App Development',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'webDevelopmentFamiliarity',
    'Web Development',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'uiUxFamiliarity',
    'UI / UX',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'backendFamiliarity',
    'Backend',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'frontendFamiliarity',
    'Frontend',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'dataScienceFamiliarity',
    'Data Science',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'cybersecurityFamiliarity',
    'Cybersecurity',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'ai',
    'AI/Machine Learning',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'productManagement',
    'Product Management',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'entrepreneurship',
    'Entrepreneurship',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeSection(<></>, <i>Which CS disciplines are you interested in learning more about?</i>),
  makeRadioGroup(
    'mobileAppDevelopmentInterestLevel',
    'Mobile App Development',
    Object.values(InterestLevel),
    true
  ),
  makeRadioGroup(
    'webDevelopmentInterestLevel',
    'Web Development',
    Object.values(InterestLevel),
    true
  ),
  makeRadioGroup('uiUxInterestLevel', 'UI / UX', Object.values(InterestLevel), true),
  makeRadioGroup('backendInterestLevel', 'Backend', Object.values(InterestLevel), true),
  makeRadioGroup('frontendInterestLevel', 'Frontend', Object.values(InterestLevel), true),
  makeRadioGroup('dataScienceInterestLevel', 'Data Science', Object.values(InterestLevel), true),
  makeRadioGroup('cybersecurityInterestLevel', 'Cybersecurity', Object.values(InterestLevel), true),
  makeRadioGroup('aiInterestLevel', 'AI/Machine Learning', Object.values(InterestLevel), true),
  makeRadioGroup(
    'productManagementInterestLevel',
    'Product Management',
    Object.values(InterestLevel),
    true
  ),
  makeRadioGroup(
    'entrepreneurshipInterestLevel',
    'Entrepreneurship',
    Object.values(InterestLevel),
    true
  ),
  makeCheckbox(
    'interestedWorkshops',
    <div>
      <p>
        As part of our under the sea theme this year, you’ll be sorted into teams of explorers as
        you venture out into the sea together and compete in exciting competitions for prizes! You
        will also have captains to guide you through the event as well as a way to get to know the
        rest of your teammates.
      </p>
      Which of the following workshops are you excited for?
    </div>,
    [
      Workshop.Git,
      Workshop.WebDev,
      Workshop.IntermediateWebDev,
      Workshop.React,
      Workshop.Apis,
      Workshop.GameDev,
      Workshop.HBPPanel,
      Workshop.ResumesAndInternships,
      Workshop.Backend,
      Workshop.MobileAppDev,
      Workshop.MachineLearning,
      Workshop.Docker,
      Workshop.Go,
      Workshop.DemoAProject,
      Workshop.CareersInTech,
      Workshop.DiversityInTech,
      Workshop.TechForSocialGood,
      Workshop.None,
    ],
    true,
    17
  ),
  makeShortText(
    'unlistedWorkshops',
    'Were there any workshops not listed that you’d be interested in?',
    false
  ),
  makeLongText(
    'hackBeanGoals',
    <div>
      <p>
        At HackBeanpot 2024, we aim to create a welcoming environment by focusing on exploration
        into the desert, community, and growth! Ocean exploration relies on perseverance, teamwork,
        innovation and a sense of adventure!
      </p>
      <p>
        Whether you journey along the sea depths alone or with a team, what do you hope to get out
        of HackBeanpot? What do you want to walk away having learned or experienced from this
        weekend?
      </p>
      {characterRecommendationMessage}
    </div>,
    true
  ),
  makeLongText(
    'tedTalkTopic',
    <div>
      <p>
        We want to get to know you and your interests better! If you had to give a thirty minute TED
        talk on any subject, what would it be and why? This could be about chicken raising, fantasy
        football, the Fermi paradox, or anything you would ramble about to friends at 2 am!
      </p>
      {characterRecommendationMessage}
    </div>,
    true
  ),
  makeLongText(
    'prevHackathonFeedback',
    `Have you attended HackBeanpot previously? If you’ve attended a hackathon (in person or virtual) previously, what did you like or dislike about it? If this is your first hackathon, what would you like to see at HackBeanpot? `,
    false
  ),
  makeSection(
    <>Team Formation</>,
    <i>
      *Note: This question does not get factored into how your application is read! This question is
      for us to plan ahead for team formation; applicants are accepted on an individual basis, and
      it is not guaranteed that everyone in a premade team will be accepted. As part of our under
      the sea theme this year, you’ll be sorted into teams of explorers as you venture out into the
      sea together and compete in exciting competitions for prizes! You will also have captains to
      guide you through the event as well as a way to get to know the rest of your teammates.
    </i>
  ),
  makeLongText(
    'premadeTeam',
    <p>
      Do you plan on attending HackBeanpot with a premade team? If yes,
      <b> please list their names (first and last).</b> If not, write &quot;N/A&quot;. Please note,
      team formations will not be finalized until the day of the event!
    </p>,
    true
  ),
  makeShortText(
    'plannedProjectIdea',
    `What are you planning to work on?
  This doesn't have to be a final idea! We just want to know what you're thinking of working on. This can include a specific API you want to work with, an idea for a new app you want to build, or a general area of tech you're looking to learn more about. Feel free to meet with a mentor or core member or use the #ask-an-organizer Slack channel to workshop your ideas with us!`,
    false
  ),
  makeDropdown(
    'interestedInTeamFormation',
    <p>
      If you don’t have a team or would like to add more members to your team, we will have a
      <b> project ideation session and team formation activity </b> we’d love for you to attend. In
      the question below, if you express interest in finding a team at the event we will reach out
      closer to the event with more details.
      <br />
      Would you be interested in creating a team or finding more members for your current team at
      our team formation event?
    </p>,
    [YesOrNo.Yes, YesOrNo.No],
    true,
    'Interested'
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
      Referrer.Medium,
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
    "If you heard about HackBeanpot in a different way that isn't listed above, list it here!",
    false
  ),

  makeSection(
    <>Core Feedback</>,
    <i>
      The HackBeanpot Core team is always looking to continue iterating and making this hackathon
      the best possible experience for everyone! We’d really appreciate it if you took a few minutes
      to leave some feedback for us :)
    </i>
  ),
  makeLongText(
    'questionsToAdd',
    'Are there any questions you think we should have asked in this application?',
    false
  ),
  makeLongText(
    'commentsQuestionsSuggestions',
    'Leave us any comments, questions, or suggestions on this application process!',
    false
  ),
  makeLongText(
    'howCanCoreTeamHelp',
    'What can the Core team do to help you have the best experience at HackBeanpot 2024?',
    false
  ),
  makeSection(<>Code of Conduct and Policy</>),
  makeDropdown(
    'mlhCodeOfConduct',
    'I have read and agree to the MLH Code of Conduct(https://static.mlh.io/docs/mlh-code-of-conduct.pdf)',
    ['Yes'],
    true
  ),
  makeDropdown(
    'mlhApplicationSharingAuthorization',
    mlhAuthorizeShareApplicationText,
    ['Yes'],
    true
  ),
  makeDropdown(
    'mlhMarketingAuthorization',
    'I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.',
    Object.values(YesOrNo),
    false
  ),
];

const filterQuestion = (q: QuestionSection | QuestionDefinition): q is QuestionDefinition => {
  return q.type !== 'SECTION';
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
  makeSection(
    <>Sea Cabin Sorting!</>,
    <div>
      <p>
        Under the sea explorers, prepare your diving gear and navigation charts, and embark on an
        aquatic odyssey!
      </p>
      Embracing our new under the sea theme, each participant will join a fictional sea cabin with other hackers!
      These fictional cabins will serve as a hub for hackers to connect and mingle with fellow
      attendees amidst the wonders of the ocean depths. Over the course of the event, you{"'"}ll
      have opportunities to earn points for your underwater realm in various workshops/activities
      and vie for victory in the Undersea Expedition across the vast ocean floor.
    </div>
  ),
  makeDropdown(
    'hangingWithFriends',
    'You’re hanging out with your friends. You are likely...',
    [
      HangingWithFriends.RockClimbing,
      HangingWithFriends.Book,
      HangingWithFriends.Conversational,
      HangingWithFriends.Listening,
      HangingWithFriends.Discord,
    ],
    true,
    'Select an option'
  ),
  makeDropdown(
    'zombieApocalypse',
    'In the event of a zombie apocalypse, you need to get to safe territory. What’s one item you are definitely packing with you?',
    [
      ZombieApocalypse.Laptop,
      ZombieApocalypse.Survival,
      ZombieApocalypse.GoPro,
      ZombieApocalypse.WaterBottle,
      ZombieApocalypse.Backpack,
    ],
    true,
    'Select an option'
  ),
  makeDropdown(
    'takeOverNation',
    'If you were given the task to take over a nation, how would you approach it?',
    [
      TakeOverNation.Exploit,
      TakeOverNation.Hopeless,
      TakeOverNation.CyberAttack,
      TakeOverNation.SurpriseAttack,
      TakeOverNation.Marry,
    ],
    true,
    'Select an option'
  ),
  makeDropdown(
    'aspirations',
    'What are your long-term aspirations?',
    [
      Aspirations.WellLiked,
      Aspirations.Boss,
      Aspirations.Wise,
      Aspirations.RiskTaker,
      Aspirations.Remembered,
    ],
    true,
    'Select an option'
  ),
  makeDropdown(
    'study',
    'How would you typically study for exams?',
    [
      Study.Upperclassmen,
      Study.DrillPass,
      Study.StudyGroup,
      Study.OfficeHours,
      Study.TrickProfessor,
    ],
    true,
    'Select an option'
  ),
  makeDropdown(
    'stuckInElevator',
    'If you get stuck in an elevator in your dorm(the door doesn’t open) with your friends, what would you do? ',
    [
      StuckInElevator.CallRA,
      StuckInElevator.Debug,
      StuckInElevator.Brainstorm,
      StuckInElevator.KickDoor,
      StuckInElevator.Game,
    ],
    true,
    'Select an option'
  ),
  makeDropdown(
    'club',
    'What club would you be most likely to join!',
    [Club.Gardening, Club.Debate, Club.Book, Club.Adventure, Club.Gaming],
    true,
    'Select an option'
  ),
  makeDropdown(
    'socialMedia',
    'Pick a social media platform! ',
    [
      SocialMedia.None,
      SocialMedia.Instagram,
      SocialMedia.Pinterest,
      SocialMedia.Tiktok,
      SocialMedia.Twitch,
    ],
    true,
    'Select an option'
  ),
  makeDropdown(
    'duringClass',
    'What do you do during class? (a really hard class, not a joke class)',
    [
      DuringClass.Game,
      DuringClass.AskQuestions,
      DuringClass.Listening,
      DuringClass.OtherHomework,
      DuringClass.NotInClass,
    ],
    true,
    'Select an option'
  ),
];

export const PostAcceptanceFormQuestions = PostAcceptanceFormSections.filter(filterQuestion);
