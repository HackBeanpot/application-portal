/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/

import React, { ReactNode } from 'react';
import {
  AttendingState,
  Checkboxes,
  Dropdown,
  LongText,
  QuestionDefinition,
  QuestionSection,
  QuestionType,
  ShortText,
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
  field: string,
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
  field: string,
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
  field: string,
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

export function makeLongText(field: string, content: ReactNode, required: boolean): LongText {
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
export const Sections: Array<QuestionSection | QuestionDefinition> = [
  makeSection(<>Let{"'"}s Get to Know You!</>),
  makeShortText('name', 'What is your name?', true, 'First Last'),
  makeDropdown(
    'gender',
    'What is your gender?',
    ['Male', 'Female', 'Non-binary', 'Genderqueer', 'Agender', 'Unlisted', 'Prefer not to say'],
    true,
    'Gender'
  ),
  makeShortText(
    'unlistedGender',
    "If your gender isn't listed above or you selected 'Unlisted', list it here!",
    false
  ),
  makeCheckbox(
    'ethnicities',
    'What ethnicities do you identify as?',
    [
      'Indigenous American or Alaska Native',
      'East Asian',
      'South / Southeast Asian',
      'Black / African American',
      'Hispanic / Latinx',
      'Native Hawaiian or Other Pacific Islander',
      'White',
      'Unlisted',
      'Prefer not to say',
    ],
    true,
    9
  ),
  makeDropdown(
    'school',
    'What school do you attend?',
    [
      'Northeastern University',
      'MIT',
      'Harvard University',
      'Tufts University',
      'University of Massachusetts Amherst',
      'Boston College',
      'Boston University',
      'Emerson College',
      'Suffolk University',
      'Brandeis University',
      'Wellesley College',
      'Wentworth Institute of Technology',
      'Olin College of Engineering',
      'Simmons University',
      'Bristol Community College',
      'Worcester Polytechnic Institute',
      'Other',
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
    ['High school', 'Undergraduate', 'Graduate'],
    true,
    'Level'
  ),
  makeDropdown(
    'educationYear',
    'What year in your current education are you?',
    ['1st year', '2nd year', '3rd year', '4th year', '5th year+'],
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
    'tshirtSize',
    <div>
      We will be handing out t-shirts and other fun swag at the event. What is your t-shirt size?{' '}
      <i>All sizes are unisex.</i>
    </div>,
    ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    true,
    'Size'
  ),
  makeSection(<>Interests and Experience</>),
  makeDropdown(
    'hackathonsAttended',
    'How many hackathons have you attended?',
    ['0', '1-2', '3-5', '6+'],
    true,
    'Count'
  ),
  makeLongText(
    'prevHackathonFeedback',
    "If you've previously attended an in-person or virtual hackthon, what did you like or dislike about it?",
    false
  ),
  makeLongText(
    'hackBeanGoals',
    <div>
      <p>
        At HackBeanpot 2022, we aim to create a welcoming environment by focusing on exploration
        into the “final frontier”, curiosity, and innovation! Space exploration relies on community,
        spirit, and a drive to help each other thrive (and get back to Earth safely)!{' '}
      </p>
      <p>
        Whether you journey to the stars with a team or alone, what do you hope to get out of
        HackBeanpot? What do you want to walk away having learned or experienced from this weekend?
      </p>
      <i>P.S. All responses are read by hand, so please put in effort! :D</i>
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
  makeLongText(
    'meetAlienSpeech',
    'If you were the first human to meet a member of an extra-terrestrial intelligent species, what would you ask them?',
    true
  ),
  makeSection(<>Outreach</>),
  makeCheckbox(
    'referrers',
    'We want to know how best to reach talented students like you! How did you hear about HackBeanpot?',
    [
      'HackBeanpot social media pages',
      'HackBeanpot outreach events',
      'HackBeanpot email / newsletter',
      'School communications',
      'Other clubs',
      'Word of mouth',
    ],
    true,
    6
  ),
  makeCheckbox(
    'interestedWorkshops',
    <div>
      <p>
        As part of our space theme this year, you will be embarking on a weekend journey to
        different planets to collect soil - or gas - samples using your newly acquired tech skills.
        You will be given the chance to compete with your fellow astronauts in exciting competitions
        throughout the event to win the Planet Cup! You will also have mission commanders to guide
        you through the event as well as a way to get to know the rest of your teammates!
      </p>
      Which of the following workshops are you excited for?
    </div>,
    [
      'Intro to Git',
      'Intro to React',
      'Remote Hosting',
      'Hackathons for Resumes',
      'Careers in Tech',
      'Diversity in Tech',
      'Tech for Social Good',
      'Project Ideation / Formation',
      'Entry Level Jobs in Tech',
      'None / Other',
    ],
    true,
    10
  ),
  makeSection(<>Team Formation</>),
  makeDropdown(
    'applyingWithTeam',
    <div>
      <p>
        Do you plan on attending HackBeanpot with a pre-made team? If yes, please create / join a
        team with your teammates in the Team tab after filling out your application.
      </p>
      <i>
        Note: This question does not get factored into how your application is read! If you are
        already part of a team before applying, we will accept / reject your team together.
      </i>
    </div>,
    ['Yes', 'No'],
    true
  ),
  makeDropdown(
    'interestedInTeamFormation',
    <div>
      <p>
        If you don’t have a team or would like to add more members to your team, we will have a
        project ideation session and team formation activity we would love for you to attend. In the
        question below, if you express interest in finding a team at the event we will reach out
        closer to the event with more details.
      </p>
      Would you be interested in creating a team or finding more members for your current team at
      our team formation event?
    </div>,
    ['Yes', 'No'],
    true
  ),
];

const filterQuestion = (q: QuestionSection | QuestionDefinition): q is QuestionDefinition => {
  return q.type !== 'SECTION';
};

export const Questions: Array<QuestionDefinition> = Sections.filter(filterQuestion);

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
    'Complete this section only if you are above 18 years of age. If you are not, please complete the following section, accompanied by a parent or guardian.'
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
    false,
    'First Last'
  ),
  makeSection(
    <>Under 18 Signature</>,
    'Complete this section only if you are under 18 years of age. If you are not, please complete the above section.'
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
    false,
    'First Last'
  ),
  makeShortText(
    'guardianSignature',
    'Guardian: I acknowledge that I am above 18 years of age. I have read and agreed to the terms and conditions stated in the Participant Waiver and will make sure the attendee follows the platform usage defined in the Media & Platform Release.',
    false,
    'First Last'
  ),
  makeSection(
    <>Now the fun stuff!</>,
    "Even though our event will be mostly virtual, we still plan on getting our awesome swag to our attendees! We will be having Swag Outpost stations on certain days at Northeastern University's campus in Boston. For those unable to pick up in Boston, we will try our best to ship swag to you if you're within the continental US."
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
      <p>Are there any accommodations (e.g. dietary restrictions) you would need from us?</p>
      For snacks!
    </div>,
    false,
    'accomodations'
  ),
  makeDropdown(
    'pickUpSwag',
    <div>
      <p>
        If you are in the Boston area, would you be able to pick up your swag box at a location on
        the Northeastern University campus in January?
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
