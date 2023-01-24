"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendingState = exports.ConfirmByState = exports.QuestionType = exports.DecisionStatus = exports.RSVPStatus = exports.ApplicationStatus = exports.Lgbtq = exports.YesOrNo = exports.Referrer = exports.Workshop = exports.InterestLevel = exports.Familiarity = exports.NumberOf = exports.ShirtSize = exports.Race = exports.YearOfEducation = exports.Education = exports.School = exports.Gender = exports.SingletonType = void 0;
var SingletonType;
(function (SingletonType) {
    SingletonType["RegistrationOpen"] = "registration-open";
    SingletonType["RegistrationClosed"] = "registration-closed";
    SingletonType["ConfirmBy"] = "confirm-by";
    SingletonType["ShowDecision"] = "show-decision";
})(SingletonType = exports.SingletonType || (exports.SingletonType = {}));
var Gender;
(function (Gender) {
    Gender["Nonbinary"] = "Nonbinary";
    Gender["Female"] = "Female";
    Gender["Male"] = "Male";
    Gender["Genderqueer"] = "Genderqueer";
    Gender["Unlisted"] = "Unspecified";
    Gender["PreferNotToSay"] = "Prefer not to say";
})(Gender = exports.Gender || (exports.Gender = {}));
var School;
(function (School) {
    School["NortheasternUniversity"] = "Northeastern University";
    School["BostonUniversity"] = "Boston University";
    School["MIT"] = "MIT";
    School["HarvardUniversity"] = "Harvard University";
    School["TuftsUniversity"] = "Tufts University";
    School["UniversityOfMassachusettsAmherst"] = "University of Massachusetts Amherst";
    School["BostonCollege"] = "Boston College";
    School["EmersonCollege"] = "Emerson College";
    School["SuffolkUniversity"] = "Suffolk University";
    School["BrandeisUniversity"] = "Brandeis University";
    School["WellesleyCollege"] = "Wellesley College";
    School["WentworthInstituteOfTechnology"] = "Wentworth Institute of Technology";
    School["OlinCollegeOfEngineering"] = "Olin College of Engineering";
    School["BenjaminFranklinInstituteOfTechnology"] = "Benjamin Franklin Institute of Technology";
    School["SimmonsUniversity"] = "Simmons University";
    School["BristolCommunityCollege"] = "Bristol Community College";
    School["WorcesterPolytechnicInstitute"] = "Worcester Polytechnic Institute";
    School["Other"] = "Other";
})(School = exports.School || (exports.School = {}));
var Education;
(function (Education) {
    Education["HighSchool"] = "High School";
    Education["Undergraduate"] = "Undergraduate";
    Education["Graduate"] = "Graduate";
})(Education = exports.Education || (exports.Education = {}));
var YearOfEducation;
(function (YearOfEducation) {
    YearOfEducation["first"] = "1st year";
    YearOfEducation["second"] = "2nd year";
    YearOfEducation["third"] = "3rd year";
    YearOfEducation["fourth"] = "4th year";
    YearOfEducation["fifthOrAbove"] = "5th year +";
})(YearOfEducation = exports.YearOfEducation || (exports.YearOfEducation = {}));
var Race;
(function (Race) {
    Race["IndigenousAlaskaNative"] = "Indigenous / Alaska Native";
    Race["Asian"] = "Asian (East, Southeast, South)";
    Race["BlackAfricanAmerican"] = "Black or African American";
    Race["HispanicLatinx"] = "Hispanic or Latinx";
    Race["NativeHawaiianPacificIslander"] = "Native Hawaiian or Pacific Islander";
    Race["White"] = "White";
    Race["Unlisted"] = "Unlisted";
    Race["PreferNotToSay"] = "Prefer not to say";
})(Race = exports.Race || (exports.Race = {}));
var ShirtSize;
(function (ShirtSize) {
    ShirtSize["XSmall"] = "XS";
    ShirtSize["Small"] = "S";
    ShirtSize["Medium"] = "M";
    ShirtSize["Large"] = "L";
    ShirtSize["XLarge"] = "XL";
    ShirtSize["XXLarge"] = "2XL";
})(ShirtSize = exports.ShirtSize || (exports.ShirtSize = {}));
var NumberOf;
(function (NumberOf) {
    NumberOf["Zero"] = "0";
    NumberOf["OneToTwo"] = "1-2";
    NumberOf["ThreeToFive"] = "3-5";
    NumberOf["SixOrAbove"] = "6+";
})(NumberOf = exports.NumberOf || (exports.NumberOf = {}));
var Familiarity;
(function (Familiarity) {
    Familiarity["CompletelyUnfamiliar"] = "Completely unfamiliar";
    Familiarity["VeryBasicKnowledge"] = "Very basic knowledge";
    Familiarity["Proficient"] = "Proficient";
    Familiarity["Expert"] = "Expert";
})(Familiarity = exports.Familiarity || (exports.Familiarity = {}));
var InterestLevel;
(function (InterestLevel) {
    InterestLevel["NotInterested"] = "Not Interested";
    InterestLevel["SomewhatInterested"] = "Somewhat Interested";
    InterestLevel["VeryInterested"] = "Very Interested";
})(InterestLevel = exports.InterestLevel || (exports.InterestLevel = {}));
var Workshop;
(function (Workshop) {
    Workshop["Git"] = "Intro to Git";
    Workshop["WebDev"] = "Intro to Web Dev (HTML / CSS / JS)";
    Workshop["IntermediateWebDev"] = "Intermediate Web Dev";
    Workshop["React"] = "Intro to React";
    Workshop["Apis"] = "Intro to APIs";
    Workshop["GameDev"] = "Intro to Game Dev";
    Workshop["HBPPanel"] = "HackBeanpot Panel";
    Workshop["ResumesAndInternships"] = "Resumes and Internships";
    Workshop["Backend"] = "Backend Workshop";
    Workshop["MobileAppDev"] = "Intro to Mobile App Dev";
    Workshop["MachineLearning"] = "Intro to Machine Learning";
    Workshop["Docker"] = "Intro to Docker";
    Workshop["Go"] = "Intro to Go";
    Workshop["DemoAProject"] = "How to Demo a Project for Judging";
    Workshop["CareersInTech"] = "Careers in Tech";
    Workshop["DiversityInTech"] = "Diversity in Tech";
    Workshop["TechForSocialGood"] = "Tech for Social Good";
    Workshop["None"] = "None";
})(Workshop = exports.Workshop || (exports.Workshop = {}));
var Referrer;
(function (Referrer) {
    Referrer["Facebook"] = "Facebook";
    Referrer["Instagram"] = "Instagram";
    Referrer["LinkedIn"] = "LinkedIn";
    Referrer["Twitter"] = "Twitter";
    Referrer["Medium"] = "Medium";
    Referrer["EmailOrNewsletter"] = "HackBeanpot email / newsletter";
    Referrer["WordOfMouth"] = "Word of mouth / friends";
    Referrer["OutreachEvents"] = "HackBeanpot outreach events (MiniHacks, FUNdamentals of HTML / CSS / JS, etc.)";
    Referrer["SchoolCommunications"] = "School communications / newsletter features";
    Referrer["Other"] = "Other";
})(Referrer = exports.Referrer || (exports.Referrer = {}));
var YesOrNo;
(function (YesOrNo) {
    YesOrNo["Yes"] = "Yes";
    YesOrNo["No"] = "No";
})(YesOrNo = exports.YesOrNo || (exports.YesOrNo = {}));
var Lgbtq;
(function (Lgbtq) {
    Lgbtq["Yes"] = "Yes";
    Lgbtq["No"] = "No";
    Lgbtq["PreferNotToSay"] = "Prefer not to say";
})(Lgbtq = exports.Lgbtq || (exports.Lgbtq = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["Incomplete"] = "Incomplete";
    ApplicationStatus["Submitted"] = "Submitted";
})(ApplicationStatus = exports.ApplicationStatus || (exports.ApplicationStatus = {}));
var RSVPStatus;
(function (RSVPStatus) {
    RSVPStatus["Confirmed"] = "Confirmed";
    RSVPStatus["NotAttending"] = "Not Attending";
    RSVPStatus["Unconfirmed"] = "Unconfirmed";
})(RSVPStatus = exports.RSVPStatus || (exports.RSVPStatus = {}));
var DecisionStatus;
(function (DecisionStatus) {
    DecisionStatus["Admitted"] = "Admitted";
    DecisionStatus["Waitlisted"] = "Waitlisted";
    DecisionStatus["Declined"] = "Declined";
    DecisionStatus["Undecided"] = "Undecided";
})(DecisionStatus = exports.DecisionStatus || (exports.DecisionStatus = {}));
var QuestionType;
(function (QuestionType) {
    QuestionType["Checkboxes"] = "Checkboxes";
    QuestionType["ShortText"] = "Short Text";
    QuestionType["Dropdown"] = "Dropdown";
    QuestionType["LongText"] = "Long Text";
    QuestionType["FileUpload"] = "File Upload";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var ConfirmByState;
(function (ConfirmByState) {
    ConfirmByState["Before"] = "Before";
    ConfirmByState["After"] = "After";
})(ConfirmByState = exports.ConfirmByState || (exports.ConfirmByState = {}));
var AttendingState;
(function (AttendingState) {
    AttendingState["Unspecified"] = "Unspecified";
    AttendingState["No"] = "No";
    AttendingState["Yes"] = "Yes";
})(AttendingState = exports.AttendingState || (exports.AttendingState = {}));
