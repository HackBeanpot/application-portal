import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { EXAMPLE_RESPONSE } from '../../../common/constants';
import { Questions } from '../../../common/questions';
import { QuestionType, RegistrationResponse } from '../../../common/types';
import { connectToDatabase } from '../../../server/mongoDB';
import { protect } from '../../../server/protect';

export default protect(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getSession({ req }))!;
  session.user?.email;

  const { client, db } = await connectToDatabase();
  switch (req.method) {
    case 'GET':
      const data = await db
        .collection('user')
        .findOne(
          { email: session.user?.email },
          { projection: { _id: 0, email: 1 } }
        );

      console.log(data);

      return res.status(200).json(data);
    case 'POST':
      // TO DO: add validation : valid json, valid list of registrationResponse
      const body: RegistrationResponse = req.body;
      // check that the # of questions matched expected
      if (
        // only want to check required question's length
        // ask Alex how we're planning on using question count, required question count
        // can we store the number of required question in questions.ts
        // pretend everything is an array, in questions.ts, export array and object to use
        // if iterating, easier with array, lookup (object)
        // array is total number of question (required and nonrequired)
        // null if person didn't fill it out
        // if response is null (check if required or nonrequired)
        // iterate through all questions, DONT ASSUME FRONTEND PRESERVES REQUIRED
        // Ar <Questions>.length === Ar <QuestionResponse> all good
        Object.keys(body.responses).length !== Object.keys(Questions).length
      ) {
        return res.status(400).send(undefined);
      }

      Questions.forEach((q) => {
        // q.id => compare to RegistrationResponse[id]
        // validate that response, check non-null if required
        const response = body.responses[q.id];
        if (response === null && q.required) {
          return res.status(400);
        }

        switch (q.type) {
          case QuestionType.Checkboxes:
            // take in the response
            // min, max value
            if (
              response.length <= q.maxNumber &&
              response.length >= q.minNumber
            ) {
            } else {
              return res.status(400);
            }
            break;
          case QuestionType.ShortText:
            if (
              response.length <= q.maxLength &&
              response.length >= q.minLength
            ) {
            } else {
              return res.status(400);
            }
            break;
          case QuestionType.LongText:
            if (
              response.length <= q.maxLength &&
              response.length >= q.minLength
            ) {
            } else {
              return res.status(400);
            }
            break;
          case QuestionType.Dropdown:
            if (response.length === 1) {
            } else {
              return res.status(400);
            }
            break;
        }
      });

      // finally, query database (insert)
      // return 202
      return res.status(201).send(undefined);
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
});
