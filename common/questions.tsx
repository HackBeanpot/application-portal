/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/

import React, { ReactNode } from 'react';
import {
  Checkboxes,
  Dropdown,
  Education,
  Familiarity,
  Gender,
  InterestLevel,
  Lgbtqia,
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

let sectionCount = 0;

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
  makeShortText('pronouns', 'Pronouns', true, 'Pronouns'),
  makeDropdown(
    'gender',
    'What is your gender?',
    [
      Gender.Male,
      Gender.Female,
      Gender.Nonbinary,
      Gender.Genderqueer,
      Gender.Unlisted,
      Gender.PreferNotToSay,
    ],
    true,
    'Gender'
  ),
  makeShortText('unlistedGender', "If your gender isn't listed above, list it here!", false),
  makeCheckbox(
    'races',
    'What race(s) do you identify as?',
    [
      Race.IndigenousAlaskaNative,
      Race.Asian,
      Race.BlackAfricanAmerican,
      Race.HispanicLatinx,
      Race.NativeHawaiianPacificIslander,
      Race.White,
      Race.Unlisted,
      Race.PreferNotToSay,
    ],
    true,
    8
  ),
  makeShortText('unlistedRace', "If your race(s) aren't listed above, list it here!", false),
  makeDropdown(
    'lgbtqia',
    'Do you identify as part of the LGBTQIA+ community?',
    [Lgbtqia.Yes, Lgbtqia.No, Lgbtqia.Unsure, Lgbtqia.PreferNotToSay],
    true,
    'Do you identify'
  ),
  makeShortText(
    'identify',
    'If you answered yes in the previous question, how do you identify?',
    false
  ),
  makeShortText(
    'identify',
    'If you answered yes to the previous question, how do you identify?',
    false
  ),
  makeDropdown(
    'school',
    'What school do you attend?',
    [
      School.NortheasternUniversity,
      School.BostonUniversity,
      School.MIT,
      School.HarvardUniversity,
      School.TuftsUniversity,
      School.UniversityOfMassachusettsAmherst,
      School.BostonCollege,
      School.EmersonCollege,
      School.SuffolkUniversity,
      School.BrandeisUniversity,
      School.WellesleyCollege,
      School.WentworthInstituteOfTechnology,
      School.OlinCollegeOfEngineering,
      School.BenjaminFranklinInstituteOfTechnology,
      School.SimmonsUniversity,
      School.BristolCommunityCollege,
      School.WorcesterPolytechnicInstitute,
      School.Other,
    ],
    true,
    'School'
  ),
  makeShortText(
    'unlistedSchool',
    'If your school was not listed in the previous question, list it here!',
    false
  ),
  makeDropdown(
    'education',
    'What level of education are you currently pursuing?',
    [Education.HighSchool, Education.Undergraduate, Education.Graduate],
    true,
    'Level'
  ),
  makeDropdown(
    'yearOfEducation',
    'What year in your current education are you?',
    [
      YearOfEducation.first,
      YearOfEducation.second,
      YearOfEducation.third,
      YearOfEducation.fourth,
      YearOfEducation.fifthOrAbove,
    ],
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
  // todo: replace with GDrive upload
  // url to resume for now
  makeShortText(
    'resumeLink',
    <div>
      <p>
        If you would like to hear about internships / job opportunities from our our sponsors, add a
        link to your resume! (Google Drive, etc)
      </p>
      <i>
        Note: We do not read resumes as a part of the HBP application process. Your resume will only
        shared with sponsors regarding job opportunities, and will only be read by them.
      </i>
    </div>,
    false,
    'https://link-to-your-resume'
  ),
  makeDropdown(
    'shirtSize',
    <div>
      We will be handing out t-shirts and other fun swag at the event. What is your t-shirt size?{' '}
      <i>All sizes are unisex.</i>
    </div>,
    [
      ShirtSize.XSmall,
      ShirtSize.Small,
      ShirtSize.Medium,
      ShirtSize.Large,
      ShirtSize.XLarge,
      ShirtSize.XXLarge,
    ],
    true,
    'Size'
  ),
  makeShortText(
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
    false,
    'Accomodations'
  ),
  makeSection(
    <>Interests and Experience</>,
    <p>P.S. All responses are read by hand so please put in effort (:</p>
  ),
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
    <i>
      For each of the following CS disciplines, please rate your familiarity from (completely
      unfamiliar, very basic knowledge, proficient, expert)
    </i>
  ),
  makeDropdown(
    'mobileAppDevelopmentFamiliarity',
    'Mobile App Development',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true,
    'Familiarity'
  ),
  makeDropdown(
    'webDevelopmentFamiliarity',
    'Web Development',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true,
    'Familiarity'
  ),
  makeDropdown(
    'uiUxFamiliarity',
    'UI / UX',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true,
    'Familiarity'
  ),
  makeDropdown(
    'backendFamiliarity',
    'Backend',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true,
    'Familiarity'
  ),
  makeDropdown(
    'frontendFamiliarity',
    'Frontend',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true,
    'Familiarity'
  ),
  makeDropdown(
    'dataScienceFamiliarity',
    'Data Science',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true,
    'Familiarity'
  ),
  makeDropdown(
    'cybersecurityFamiliarity',
    'Cybersecurity',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true,
    'Familiarity'
  ),
  makeSection(<></>, <i>Which CS disciplines are you interested in learning more about?</i>),
  makeDropdown(
    'mobileAppDevelopmentInterestLevel',
    'Mobile App Development',
    [InterestLevel.NotInterested, InterestLevel.SomewhatInterested, InterestLevel.VeryInterested],
    true,
    'Interest level'
  ),
  makeDropdown(
    'webDevelopmentInterestLevel',
    'Web Development',
    [InterestLevel.NotInterested, InterestLevel.SomewhatInterested, InterestLevel.VeryInterested],
    true,
    'Interest level'
  ),
  makeDropdown(
    'uiUxInterestLevel',
    'UI / UX',
    [InterestLevel.NotInterested, InterestLevel.SomewhatInterested, InterestLevel.VeryInterested],
    true,
    'Interest level'
  ),
  makeDropdown(
    'backendInterestLevel',
    'Backend',
    [InterestLevel.NotInterested, InterestLevel.SomewhatInterested, InterestLevel.VeryInterested],
    true,
    'Interest level'
  ),
  makeDropdown(
    'frontendInterestLevel',
    'Frontend',
    [InterestLevel.NotInterested, InterestLevel.SomewhatInterested, InterestLevel.VeryInterested],
    true,
    'Interest level'
  ),
  makeDropdown(
    'dataScienceInterestLevel',
    'Data Science',
    [InterestLevel.NotInterested, InterestLevel.SomewhatInterested, InterestLevel.VeryInterested],
    true,
    'Interest level'
  ),
  makeDropdown(
    'cybersecurityInterestLevel',
    'Cybersecurity',
    [InterestLevel.NotInterested, InterestLevel.SomewhatInterested, InterestLevel.VeryInterested],
    true,
    'Interest level'
  ),
  makeCheckbox(
    'interestedWorkshops',
    <div>
      <p>
        As part of our desert exploration theme this year, you’ll be sorted into teams of explorers
        as you venture out into the desert together and compete in exciting competitions for prizes!
        You will also have mission commanders to guide you through the event as well as a way to get
        to know the rest of your teammates.
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
    'prevHackathonFeedback',
    'If you’ve attended a hackathon (in person or virtual) previously, what did you like or dislike about it? If you’ve never attended a hackathon, what would you like to see at HackBeanpot?',
    false
  ),
  makeLongText(
    'hackBeanGoals',
    <div>
      <p>
        At HackBeanpot 2023, we aim to create a welcoming environment by focusing on exploration
        into the desert, community, and growth! Desert exploration relies on perseverance, teamwork,
        innovation and a sense of adventure!
      </p>
      <p>
        Whether you journey along the sandy dunes alone or with a team, what do you hope to get out
        of HackBeanpot? What do you want to walk away having learned or experienced from this
        weekend?
      </p>
    </div>,
    true
  ),
  makeLongText(
    'tedTalkTopic',
    <>
      We want to get to know you and your interests better! If you had to give a thirty minute TED
      talk on any subject, what would it be and why? This could be about chicken raising, fantasy
      football, the Fermi paradox, or anything you would ramble about to friends at 2 am!
    </>,
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
    <>Team Formation</>,
    <i>
      *Note: This question does not get factored into how your application is read! This question is
      for us to plan ahead for team formation; applicants are accepted on an individual basis, and
      it is not guaranteed that everyone in a premade team will be accepted.
    </i>
  ),
  makeShortText(
    'premadeTeam',
    <p>
      Do you plan on attending HackBeanpot with a premade team? If yes,
      <b> please list their names (first and last).</b> Please note, team formations will not be
      finalized until the day of the event!
    </p>,
    true
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
    'What can the Core team do to help you have the best experience at HackBeanpot 2023?',
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
      *NOTE: We will only be able to guarantee swag for the first 200 hackers who complete this form
      and qualify for domestic shipping. Thanks for your understanding.
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
      <a href="https://bit.ly/hbp2022-waiver" target="_blank" rel="noreferrer">
        bit.ly/hbp2022-waiver
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
      <a href="https://bit.ly/hbp2022-waiver" target="_blank" rel="noreferrer">
        bit.ly/hbp2022-waiver
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
    <>Now the fun stuff!</>,
    "Even though our event will be mostly virtual, we still plan on getting our awesome swag to our attendees! We will be having Swag Outpost stations on certain days at Northeastern University's campus in Boston. For those unable to pick up in Boston, we will try our best to ship swag to you if you're within the continental US. If you would like to cover your international shipping costs for swag shipping costs, please email team@hackbeanpot.com with your mailing address."
  ),
  makeCheckbox(
    'swag',
    <div>
      <p>Which of the following swag items would you like to receive?</p>
      In the spirit of sustainability, we want to make sure that all of our swag items are useful
      and appreciated by everyone! Please help us by only opting in to the items that you would
      actually like.
    </div>,
    [
      'T-shirt: our annual event shirt',
      'Sticker sheet: classic HBP logo sticker with special space themed stickers',
      'Cafe glasses: clear glass coffee cups with HBP logo printed on them',
      'All of the above',
      'None or N/A',
    ],
    true,
    2
  ),
  makeShortText(
    'accomodations',
    <div>
      <p>
        Are there any accommodations (e.g. dietary restrictions) you would need from us for snacks?
      </p>
    </div>,
    false,
    'accomodations'
  ),
  makeDropdown(
    'pickUpSwag',
    <div>
      <p>
        If you are in the Boston area, would you be able to pick up your swag box at a location on
        the Northeastern University campus from January 29 - February 5? A separate Google form for
        swag outpost pickup will be sent to your email at a later time to coordinate Swag Pickup
        timeslots.
      </p>
      It would really help us out :{"'"}) Shipping is expensive these days but we want to get you
      the BEST swag out there!
    </div>,
    ['Yes', 'No/Not in Boston'],
    true,
    'Yes'
  ),
  makeLongText(
    'address',
    <div>
      <p>
        Otherwise, what physical address would you like your swag to be shipped to? Please include
        the full name the package should be addressed to. *Note: At this time we can only ship to
        addresses in the US. Please write N/A if not in the US.
      </p>
      Disclaimer: This information will not be shared with anyone outside of our organizing team and
      will only be used for shipping. Please note that the package will take two weeks to ship and
      will arrive mid-February.
    </div>,
    false
  ),
  makeSection(
    <>Planet Mission Crew Sorting!</>,
    <div>
      <p>Three… two… one… liftoff!</p>
      In the spirit of our space theme, each attendees will be apart of a planet mission crew!
      Planet mission crews will be a space for hackers to meet and socialize with other attendees
      outside of your project team through the vacuum of empty interplanetary space. Throughout the
      weekend, you{"'"}ll have chances to win points for your new homeworld at different
      workshops/activities and compete for the Space Race to the moon.
    </div>
  ),
  makeDropdown(
    'careerInTech',
    'What career in tech most interests you?',
    [
      'Backend software engineering',
      'Frontend software engineering',
      'Designer',
      'Product Manager',
      'Data Analyst/Engineer',
    ],
    true,
    'Backend software engineering'
  ),
  makeDropdown(
    'personAtParty',
    'What kind of person are you most like at a party?',
    [
      'Eating/bringing all the food',
      'Mingling with everyone',
      'Jamming out on the dancefloor',
      'Chilling in the corner',
      'Hosting the party',
    ],
    true,
    'Eating/bringing all the food'
  ),
  makeDropdown(
    'wonLottery',
    'You just won the lottery! What are you doing first?',
    [
      'Booking a trip around the world!',
      'Donate to a charity of your choice',
      'Invest in #stonks',
      'Go on a shopping spree with all your friends',
      'Put it in your bank account to save for when you need it',
    ],
    true,
    'Booking a trip around the world!'
  ),
  makeDropdown(
    'themePark',
    'You’re at a theme park. Where are you heading first?',
    [
      'The biggest roller coaster in the park!',
      'Something classic, like the ferris wheel',
      'The snack stands, the food is the best part!',
      'The game booths, you don’t really like rides',
      'Whatever is at the front of the park/closest',
    ],
    true,
    'The biggest roller coaster in the park!'
  ),
  makeDropdown(
    'celebrity',
    'In 5 years from now, you’re a celebrity! What are you famous for?',
    [
      'Accidentally became a meme',
      'Founder of a successful startup',
      'Popular actor/actress',
      'Influencer on Instagram/TikTok',
      'I’m not famous, but the Insta account I run for my dog is',
    ],
    true,
    'Accidentally became a meme'
  ),
];

export const PostAcceptanceFormQuestions = PostAcceptanceFormSections.filter(filterQuestion);
