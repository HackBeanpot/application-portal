import {
  Checkboxes,
  Dropdown,
  FileUpload,
  LongText,
  QuestionDefinition,
  QuestionResponse,
  QuestionType,
  RadioGroup,
  RegistrationApiRequest,
  ShortText,
} from '../../common/types';
import Joi from 'joi';
import { Questions } from '../../common/questions';
import { z } from 'zod';

export const convertQuestionDefinitionToJoiSchema = (
  question: QuestionDefinition,
  required: boolean
): Joi.Schema<QuestionResponse> => {
  if (question.type === QuestionType.Checkboxes) {
    return convertCheckboxesToJoiSchema(question, required);
  } else if (question.type === QuestionType.Dropdown) {
    return convertDropdownToJoiSchema(question, required);
  } else if (question.type === QuestionType.LongText) {
    return convertLongTextToJoiSchema(question, required);
  } else if (question.type === QuestionType.ShortText) {
    return convertShortTextToJoiSchema(question, required);
  } else if (question.type === QuestionType.FileUpload) {
    return convertFileUploadToJoiSchema(question, required);
  } else if (question.type === QuestionType.RadioGroup) {
    return convertRadioGroupToJoiSchema(question, required);
  }
  throw new Error(`unexpected question type on question: ${question}`);
};

// joi documentation is pretty good: checkout joi.dev/api
export const makeRequiredIfNeeded = (
  question: QuestionDefinition,
  schema: Joi.Schema,
  required: boolean
): Joi.Schema => {
  if (!required || !question.required) {
    return schema.allow(null);
  }
  // by default, joi allows undefined, but not null.
  return schema.required();
};
export const convertCheckboxesToJoiSchema = (
  question: Checkboxes,
  required: boolean
): Joi.Schema => {
  // checkboxes expects an array of strings back
  const itemSchema = Joi.valid(...question.options.map((s) => s.name));
  const arraySchema = Joi.array()
    .items(itemSchema)
    .unique()
    .min(question.minNumber)
    .max(question.maxNumber);
  return makeRequiredIfNeeded(question, arraySchema, required);
};
export const convertDropdownToJoiSchema = (question: Dropdown, required: boolean): Joi.Schema => {
  // dropdown expects a single string
  const answerSchema = Joi.valid(...question.options.map((s) => s.name));
  return makeRequiredIfNeeded(question, answerSchema, required);
};

export const convertRadioGroupToJoiSchema = (
  question: RadioGroup,
  required: boolean
): Joi.Schema => {
  // dropdown expects a single string
  const answerSchema = Joi.valid(...question.options.map((s) => s.name));
  return makeRequiredIfNeeded(question, answerSchema, required);
};

export const convertLongTextToJoiSchema = (question: LongText, required: boolean): Joi.Schema => {
  // expects a long text response
  let answerSchema;
  if (question.required) {
    answerSchema = Joi.string().trim().min(1).max(question.maxLength).label(`${question.field}`);
  } else {
    answerSchema = Joi.string().trim().min(question.minLength).max(question.maxLength);
  }
  return makeRequiredIfNeeded(question, answerSchema, required);
};
export const convertShortTextToJoiSchema = (question: ShortText, required: boolean): Joi.Schema => {
  // expects a long text response
  let answerSchema;
  if (question.required) {
    answerSchema = Joi.string().trim().min(1).max(question.maxLength).label(`${question.field}`);
  } else {
    answerSchema = Joi.string().trim().min(question.minLength).max(question.maxLength);
  }
  return makeRequiredIfNeeded(question, answerSchema, required);
};

export const convertFileUploadToJoiSchema = (
  question: FileUpload,
  required: boolean
): Joi.Schema => {
  const answerSchema = Joi.string();
  return makeRequiredIfNeeded(question, answerSchema, required);
};

export const makeQuestionResponseSchemas = (
  questions: QuestionDefinition[],
  required: boolean
): Joi.Schema[] =>
  questions.map((question) => convertQuestionDefinitionToJoiSchema(question, required));
export const makeRegistrationApiRequestSchema = (questions: QuestionDefinition[]): Joi.Schema =>
  Joi.object<RegistrationApiRequest>({
    fields: Joi.array().sparse().length(questions.length).required(),
    responses: Joi.array().sparse().length(questions.length).required(),
  });

// an array of the schema for each question in order
const QuestionResponseSchemas = makeQuestionResponseSchemas(Questions, true);
const OptionalQuestionResponseSchemas = makeQuestionResponseSchemas(Questions, false);
const RegistrationApiRequestSchema = makeRegistrationApiRequestSchema(Questions);

/**
 * attempts to validate a registration api request body. will throw if the request is invalid.
 * @param body the request body
 */
export const attemptToValidateRegistrationApiRequest = (
  body: unknown,
  required: boolean
): RegistrationApiRequest => {
  const { fields, responses }: RegistrationApiRequest = Joi.attempt(
    body,
    RegistrationApiRequestSchema
  );
  return {
    fields,
    responses: responses.map((response, i) =>
      Joi.attempt(
        response,
        required ? QuestionResponseSchemas[i] : OptionalQuestionResponseSchemas[i]
      )
    ),
  };
};
