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
}

export interface PortalState {
    openDate: Date;
    closeDate: Date;
    maxAttendees: number;
    numAttendees: number;
    totalConfirmed: number;

}

enum Gender {
    Nonbinary="Nonbinary", Female="Female", Male="Male", Unspecified="Unspecified"
}

enum Education {
    HighSchool="HighSchool", Undergraduate="Undergraduate", Graduate="Graduate", 
    Doctorate="Doctorate"
}

type YearOfEducation = 1 | 2 | 3 | 4 | 5 | "5+";

enum Ethnicities {
    "Indigenous/AlaskaNative"="Indigenous/AlaskaNative", Asian="Asian", "Black/AfricanAmerican"="Black/AfricanAmerican", 
    "Hispanic/Latino"="Hispanic/Latino", "NativeHawaiian/PacificIslander" = "NativeHawaiian/PacificIslander", white = "white",
    other = "other"
}

enum ShirtSize {
    XSmall = "XSmall", Small = "Small", Medium = "Medium", Large = "Large", XLarge = "XLarge"
}

enum ApplicationStatus {
    Unverified = "Unverified", 
    "Incomplete/RegistrationOpen" = "Incomplete/RegistrationOpen",
    "Incomplete/RegistrationClosed" = "Incomplete/RegistrationClosed",
    "Submitted/RegistrationOpen" = "Submitted/RegistrationOpen",
    "Submitted/RegistrationClosed" = "Submitted/RegistrationClosed",
    "Admitted/Unconfirmed" = "Admitted/Unconfirmed", 
    "Admitted/ConfirmedDeadlinePassed" = "Admitted/ConfirmedDeadlinePassed",
    Waitlisted = "Waitlisted",
    Confirmed = "Confirmed", 
    Declined = "Declined"
}

enum QuestionType {
    Checkboxes = "Checkboxes", 
    ShortText = "ShortText", 
    Dropdown = "Dropdown", 
    LongText = "LongText"
}

type Question = Checkboxes | ShortText | Dropdown | LongText;

interface IQuestion {
    content: string;
    id: number;
    required: boolean;
}

interface Checkboxes extends IQuestion {
    type : QuestionType.Checkboxes;
    options : Array<{name: string}>;
    maxNumber : number;
    minNumber : number;
}

interface ShortText extends IQuestion {
    type : QuestionType.ShortText;
    maxLength : number;
    minLength : number;
}

interface Dropdown extends IQuestion {
    type : QuestionType.Dropdown;
    options : Array<{name: string}>;

}

interface LongText extends IQuestion {
    type : QuestionType.LongText;
    maxLength : number;
    minLength : number;
}

interface QuestionResponse {
    userID: number;
    question: IQuestion;
    response : Array<string>; // <- can change
}
