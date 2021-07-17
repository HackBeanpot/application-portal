export interface User {
    email: string;
    firstName: string;
    lastName: string;
    userId: number;
    gender: Gender;
    school: string;
    education: Education;
    yearOfEducation: YearOfEducation;
    ethnicities: Ethnicities;
    shirtSize: ShirtSize;
    applicationStatus: ApplicationStatus;
    major: string;
    minor: string;
    resumeLink: string;
    timeZone: string;
    learningGoals: string;
    responses: Array<QuestionResponse>
}
export interface PortalState {
    openDate: Date;
    closeDate: Date;
    maxAttendees: number;
    numAttendees: number;
    totalConfirmed: number;
}
enum Gender {
    Nonbinary = "Nonbinary", Female = "Female", Male = "Male", Unspecified = "Unspecified"
}
enum Education {
    HighSchool = "High School", Undergraduate = "Undergraduate", Graduate = "Graduate",
    Doctorate = "Doctorate"
}
type YearOfEducation = 1 | 2 | 3 | 4 | 5 | "5+";
enum Ethnicities {
    IndigenousAlaskaNative = "Indigenous / Alaska Native", Asian = "Asian", BlackAfricanAmerican = "Black / African American",
    HispanicLatino = "Hispanic / Latino", NativeHawaiianPacificIslander = "Native Hawaiian / Pacific Islander", White = "White",
    Other = "Other"
}
enum ShirtSize {
    XSmall = "XSmall", Small = "Small", Medium = "Medium", Large = "Large", XLarge = "XLarge"
}
enum ApplicationStatus {
    Unverified = "Unverified",
    IncompleteRegistrationOpen = "Incomplete / RegistrationOpen",
    IncompleteRegistrationClosed = "Incomplete / RegistrationClosed",
    SubmittedRegistrationOpen = "Submitted / RegistrationOpen",
    SubmittedRegistrationClosed = "Submitted / RegistrationClosed",
    AdmittedUnconfirmed = "Admitted / Unconfirmed",
    AdmittedConfirmedDeadlinePassed = "Admitted / Confirmed Deadline Passed",
    Waitlisted = "Waitlisted",
    Confirmed = "Confirmed",
    Declined = "Declined"
}
enum QuestionType {
    Checkboxes = "Checkboxes",
    ShortText = "Short Text",
    Dropdown = "Dropdown",
    LongText = "Long Text"
}
type Question = Checkboxes | ShortText | Dropdown | LongText;
interface IQuestion {
    content: string;
    id: number;
    required: boolean;
}
interface Checkboxes extends IQuestion {
    type: QuestionType.Checkboxes;
    options: Array<{ name: string }>;
    maxNumber: number;
    minNumber: number;
}
interface ShortText extends IQuestion {
    type: QuestionType.ShortText;
    maxLength: number;
    minLength: number;
}
interface Dropdown extends IQuestion {
    type: QuestionType.Dropdown;
    options: Array<{ name: string }>;
}
interface LongText extends IQuestion {
    type: QuestionType.LongText;
    maxLength: number;
    minLength: number;
}
interface QuestionResponse {
    userID: number;
    question: IQuestion;
    response: Array<string>; // <- can change
}
// example json User to use for now
export const exampleUser: User =
{
    email: 'judysu@gmail.com',
    firstName: 'Judy',
    lastName: 'Su',
    userId: 2,
    gender: Gender.Female,
    school: 'Northeastern',
    education: Education.Undergraduate,
    yearOfEducation: 4,
    ethnicities: Ethnicities.Asian,
    shirtSize: ShirtSize.Small,
    applicationStatus: ApplicationStatus.Declined,
    major: 'cs',
    minor: 'cs',
    resumeLink: 'cs',
    timeZone: 'cs',
    learningGoals: 'cs',
    responses: []
}