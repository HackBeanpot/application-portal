/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/

import React, { ReactNode } from 'react';
import {
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
const minNumberCheck = 0;
const maxLengthShort = 100;
const minLengthShort = 0;
const maxLengthLong = 250;
const minLengthLong = 0;

// convenience constructors for questions (constructors in java)
function makeCheckbox(
  content: ReactNode,
  options: Array<string>,
  required: boolean,
  maxNumberCheck: number
): Checkboxes {
  questionCount++;
  return {
    type: QuestionType.Checkboxes,
    options: options.map((name) => ({ name })),
    maxNumber: maxNumberCheck,
    minNumber: minNumberCheck,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

function makeShortText(
  content: ReactNode,
  required: boolean,
  placeholder?: string
): ShortText {
  questionCount++;
  return {
    type: QuestionType.ShortText,
    maxLength: maxLengthShort,
    minLength: minLengthShort,
    placeholder,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

function makeDropdown(
  content: ReactNode,
  options: Array<string>,
  required: boolean,
  placeholder?: string
): Dropdown {
  questionCount++;
  return {
    type: QuestionType.Dropdown,
    options: options.map((name) => ({ name })),
    placeholder,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

function makeLongText(content: ReactNode, required: boolean): LongText {
  questionCount++;
  return {
    type: QuestionType.LongText,
    maxLength: maxLengthLong,
    minLength: minLengthLong,

    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

let sectionCount = 0;

function makeSection(text: ReactNode): QuestionSection {
  sectionCount++;
  return {
    id: `section-${sectionCount}`,
    text: <h2>{text}</h2>,
    type: 'SECTION',
  };
}

// write questions for portal here
export const Sections: Array<QuestionSection | QuestionDefinition> = [
  makeSection(<>Let{"'"}s Get to Know You!</>),
  makeShortText('What is your name?', true, 'First Last'),
  makeDropdown(
    'What is your gender?',
    [
      'Male',
      'Female',
      'Non-binary',
      'Genderqueer',
      'Agender',
      'Unlisted',
      'Prefer not to say',
    ],
    true,
    'Gender'
  ),
  makeShortText(
    "If your gender isn't listed above or you selected 'Unlisted', list it here!",
    false
  ),
  makeCheckbox(
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
    'If your school was not listed in the previous question, list it here!',
    false
  ),
  makeDropdown(
    'What level of education are you currently pursuing?',
    ['High school', 'Undergraduate', 'Graduate'],
    true,
    'Level'
  ),
  makeDropdown(
    'What year in your current education are you?',
    ['1st year', '2nd year', '3rd year', '4th year', '5th year+'],
    true,
    'Year'
  ),
  makeShortText(
    'What are your major / concentration(s)? (N / A if not applicable)',
    true
  ),
  makeShortText('What are your minor(s)?', false),
  // url to resume for now
  makeShortText(
    <div>
      <p>
        If you would like to hear about opportunities from our our sponsors, add
        a link to your resume! (Google Drive, etc)
      </p>
      <i>
        Note: We do not read resumes as a part of the HBP application process.
        The resumes are only shared with interested sponsors who may contact you
        about internship / job opportunities, and will only be read by them.
      </i>
    </div>,
    false
  ),
  makeDropdown(
    <>
      We will be handing out t-shirts and other fun swag at the event. What is
      your t-shirt size? All sizes are unisex!
      <br />
    </>,
    ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    true,
    'Size'
  ),
  makeSection(<>Interests and Experience</>),
  makeDropdown(
    'How many hackathons have you attended?',
    ['0', '1-2', '3-5', '6+'],
    true,
    'Count'
  ),
  makeLongText(
    "If you've previously attended an in-person or virtual hackthon, what did you like or dislike about it?",
    false
  ),
  makeLongText(
    <>
      <i>P.S. All responses are read by hand, so please put in effort! :D </i>
      <br />
      At HackBeanpot 2022, we aim to create a welcoming environment by focusing
      on exploration into the “final frontier”, curiosity, and innovation! Space
      exploration relies on community, spirit, and a drive to help each other
      thrive (and get back to Earth safely)! <br />
      Whether you journey to the stars with a team or alone, what do you hope to
      get out of HackBeanpot? What do you want to walk away having learned or
      experienced from this weekend?
    </>,
    true
  ),
  makeLongText(
    <>
      We want to get to know you and your interests better! If you had to give a
      thirty minute TED talk on any subject, what would it be and why? This
      could be about chicken raising, fantasy football, the Fermi paradox, or
      anything you would ramble about to friends at 2 am!
    </>,
    true
  ),
  makeLongText(
    'If you were the first human to meet a member of an extra-terrestrial intelligent species, what would you ask them?',
    true
  ),
  makeSection(<>Outreach</>),
  makeCheckbox(
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
    <>
      As part of our space theme this year, you will be embarking on a weekend
      journey to different planets to collect soil - or gas - samples using your
      newly acquired tech skills. You will be given the chance to compete with
      your fellow astronauts in exciting competitions throughout the event to
      win the Planet Cup! You will also have mission commanders to guide you
      through the event as well as a way to get to know the rest of your
      teammates! <br />
      Which of the following workshops are you excited for?
    </>,
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
    8
  ),
  makeSection(<>Team Formation</>),
  makeDropdown(
    <div>
      <p>
        Do you plan on attending HackBeanpot with a pre-made team? If yes,
        please create / join a team with your teammates in the Team tab after
        filling out your application.
      </p>
      <i>
        Note: This question does not get factored into how your application is
        read! If you are already part of a team before applying, we will accept
        / reject your team together.
      </i>
    </div>,
    ['Yes', 'No'],
    true
  ),
  makeDropdown(
    <>
      If you don’t have a team or would like to add more members to your team,
      we will have a project ideation session and team formation activity we
      would love for you to attend. In the question below, if you express
      interest in finding a team at the event we will reach out closer to the
      event with more details. <br />
      Would you be interested in creating a team or finding more members for
      your current team at our team formation event?
    </>,
    ['Yes', 'No'],
    true
  ),
];

export const Questions: Array<QuestionDefinition> = Sections.filter(function (
  sectionOrQuestion
): sectionOrQuestion is QuestionDefinition {
  return sectionOrQuestion.type !== 'SECTION';
});
