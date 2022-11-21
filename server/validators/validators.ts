import {
  Checkboxes,
  Dropdown,
  FileUpload,
  LongText,
  QuestionDefinition,
  QuestionResponse,
  QuestionType,
  RegistrationApiRequest,
  ShortText,
} from '../../common/types';
import Joi from 'joi';
import { Questions } from '../../common/questions';

export const convertQuestionDefinitionToJoiSchema = (
  q: QuestionDefinition
): Joi.Schema<QuestionResponse> => {
  if (q.type === QuestionType.Checkboxes) {
    return convertCheckboxesToJoiSchema(q);
  } else if (q.type === QuestionType.Dropdown) {
    return convertDropdownToJoiSchema(q);
  } else if (q.type === QuestionType.LongText) {
    return convertLongTextToJoiSchema(q);
  } else if (q.type === QuestionType.ShortText) {
    return convertShortTextToJoiSchema(q);
  } else if (q.type === QuestionType.FileUpload) {
    return convertFileUploadToJoiSchema(q);
  }
  throw new Error(`unexpected question type on question: ${q}`);
};

// joi documentation is pretty good: checkout joi.dev/api
export const makeRequiredIfNeeded = (q: QuestionDefinition, schema: Joi.Schema): Joi.Schema => {
  // by default, joi allows undefined, but not null.
  if (q.required) {
    // required means don't allow undefined
    return schema.required();
  }
  // if not required, then allow undefined (implicitly), and null
  return schema.allow(null);
};
export const convertCheckboxesToJoiSchema = (q: Checkboxes): Joi.Schema => {
  // checkboxes expects an array of strings back
  const itemSchema = Joi.valid(...q.options.map((s) => s.name));
  const arraySchema = Joi.array().items(itemSchema).unique().min(q.minNumber).max(q.maxNumber);
  return makeRequiredIfNeeded(q, arraySchema);
};
export const convertDropdownToJoiSchema = (q: Dropdown): Joi.Schema => {
  // dropdown expects a single string
  const answerSchema = Joi.valid(...q.options.map((s) => s.name));
  return makeRequiredIfNeeded(q, answerSchema);
};
export const convertLongTextToJoiSchema = (q: LongText): Joi.Schema => {
  // expects a long text response
  let answerSchema;
  if (q.required) {
    answerSchema = Joi.string().trim().min(10).max(q.maxLength).label(`${q.field}`);
  } else {
    answerSchema = Joi.string().trim().min(q.minLength).max(q.maxLength);
  }
  return makeRequiredIfNeeded(q, answerSchema);
};
export const convertShortTextToJoiSchema = (q: ShortText): Joi.Schema => {
  // expects a long text response
  let answerSchema;
  if (q.required) {
    answerSchema = Joi.string().trim().min(1).max(q.maxLength).label(`${q.field}`);
  } else {
    answerSchema = Joi.string().trim().min(q.minLength).max(q.maxLength);
  }
  return makeRequiredIfNeeded(q, answerSchema);
};

export const convertFileUploadToJoiSchema = (q: FileUpload): Joi.Schema => {
  const answerSchema = Joi.string();
  return makeRequiredIfNeeded(q, answerSchema);
};

export const makeQuestionResponseSchemas = (qs: QuestionDefinition[]): Joi.Schema[] =>
  qs.map(convertQuestionDefinitionToJoiSchema);
export const makeRegistrationApiRequestSchema = (qs: QuestionDefinition[]): Joi.Schema =>
  Joi.object<RegistrationApiRequest>({
    fields: Joi.array().sparse().length(qs.length).required(),
    responses: Joi.array().sparse().length(qs.length).required(),
  });

// an array of the schema for each question in order
const QuestionResponseSchemas = makeQuestionResponseSchemas(Questions);
const RegistrationApiRequestSchema = makeRegistrationApiRequestSchema(Questions);

/**
 * attempts to validate a registration api request body. will throw if the request is invalid.
 * @param body the request body
 */
export const attemptToValidateRegistrationApiRequest = (body: unknown): RegistrationApiRequest => {
  const { fields, responses }: RegistrationApiRequest = Joi.attempt(
    body,
    RegistrationApiRequestSchema
  );
  return {
    fields,
    responses: responses.map((response, i) => Joi.attempt(response, QuestionResponseSchemas[i])),
  };
};
