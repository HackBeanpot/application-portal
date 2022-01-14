import React, { ReactNode } from 'react';
import { makeCheckbox, makeShortText, makeDropdown, makeLongText, makeSection } from './questions';
import { QuestionDefinition, QuestionSection } from './types';

export const PostAcceptanceForm: Array<QuestionSection | QuestionDefinition> = [
  makeSection(
    <>Acceptance Form</>,
    "Congrats on being accepted to HackBeanpot! We're so excited to see you soon. Please answer the following questions to help us finalize logistics of making the event as great as it can be for our attendees! *NOTE: We will only be able to guarantee swag for the first 200 hackers who complete this form and qualify for domestic shipping. Thanks for your understanding."
  ),
  makeShortText('email', 'Email address' + <br/> + "Please use the email address you applied to HackBeanpot with - this should be the one where you received your acceptance email!", true, 'Email address'),
  makeShortText('name', 'Full name', true, 'First Last'),
  makeDropdown(
    'attending',
    'Please select if you will be attending HackBeanpot on the weekend of February 11 - 13th, 2022. If you cannot make it, please select No and leave the rest of the form blank so that we can admit others on the waitlist instead.',
    ['Yes', 'No'],
    true,
    'Yes'
  ),
  makeCheckbox('adult', 'Are you 18 years of age or older?', ['Yes', 'No'], true, 1),
  makeSection(<>Above 18 Signature</>),
  makeShortText(
    'adultSignature',
    'By typing my full legal name below, I acknowledge that this represents my legal signature and that I have read and agreed to the terms and conditions stated in the Participant Waiver. PARTICIPANT WAIVER: bit.ly/hbp2022-waiver',
    true,
    'First Last'
  ),
  makeSection(<>Under 18 Signature</>, 'PARTICIPANT WAIVER: bit.ly/hbp2022-waiver'),
  makeShortText(
    'minorSignature',
    'Attendee: I acknowledge that I am above 13 and that I have read and agreed to the terms and conditions stated in the Participant Waiver. PARTICIPANT WAIVER: bit.ly/hbp2022-waiver',
    true,
    'First Last'
  ),
  makeShortText(
    'guardianSignature',
    'Guardian: I acknowledge that I am above 18 years of age. I have read and agreed to the terms and conditions stated in the Participant Waiver and will make sure the attendee follows the platform usage defined in the Media & Platform Release.',
    true,
    'First Last'
  ),
  makeSection(<>Now the fun (free) stuff!</>, "Even though our event will be mostly virtual, we still plan on getting our awesome swag to our attendees! We will be having Swag Outpost stations on certain days at Northeastern University's campus in Boston. For those unable to pick up in Boston, we will try our best to ship swag to you if you're within the continental US."),
  makeCheckbox(
    'swag',
    'Which of the following swag items would you like to receive?' + <br/> +"In the spirit of sustainability, we want to make sure that all of our swag items are useful and appreciated by everyone! Please help us by only opting in to the items that you would actually like.",
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
    'Are there any accommodations (e.g. dietary restrictions) you would need from us?' + <br/> + "For snacks!",
    true,
    'accomodations'
  ),
  makeDropdown(
    'pickUpSwag',
    'If you are in the Boston area, would you be interested in picking up your swag box at a location on the Northeastern University campus in January?' + <br/> + "It would really help us out :') Shipping is expensive these days but we want to get you the BEST swag out there <3",
    ['Yes', 'No/Not in Boston'],
    true,
    'Yes'
  ),
  makeLongText(
    'address',
    'Otherwise, what physical address would you like your swag to be shipped to? Please include the full name the package should be addressed to. *Note: At this time we can only ship to addresses in the US. Please write N/A if not in the US.' + <br/> + "Disclaimer: This information will not be shared with anyone outside of our organizing team and will only be used for shipping. Please note that the package will take two weeks to ship and will arrive mid-February.",
    true
  ),
  makeSection(<>Planet Mission Crew Sorting!</>, "Three… two… one… liftoff! In the spirit of our space theme, each attendees will be apart of a planet mission crew! Planet mission crews will be a space for hackers to meet and socialize with other attendees outside of your project team through the vacuum of empty interplanetary space. Throughout the weekend, you'll have chances to win points for your new homeworld at different workshops/activities and compete for the Space Race to the moon."),
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
      'What are u Hosting the party about',
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
