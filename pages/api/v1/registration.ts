<<<<<<< HEAD
import { NextApiRequest, NextApiResponse } from 'next';
import { EXAMPLE_RESPONSE } from '../../../common/constants';
import { protect } from '../../../server/protect';
=======
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { EXAMPLE_RESPONSE } from '../../../common/constants'
import { Questions } from '../../../common/questions'
import { RegistrationResponse } from '../../../common/types'
import { connectToDatabase } from '../../../server/mongoDB'
import { protect } from '../../../server/protect'
import { useSignIn } from '../../application'
>>>>>>> started get /registration

export default protect(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getSession({ req }))!
  session.user?.email

  const { client, db } = await connectToDatabase()
  switch (req.method) {
    case 'GET':
<<<<<<< HEAD
<<<<<<< HEAD
      return res.status(200).json(EXAMPLE_RESPONSE);
=======
      const session = (await getSession({ req }))!
      session.user?.email

      const { client, db } = await connectToDatabase()
=======
>>>>>>> started post
      const data = await db
        .collection('user')
        .findOne(
          { email: session.user?.email },
          { projection: { _id: 0, email: 1 } }
        )

      console.log(data)

      return res.status(200).json(data)
>>>>>>> started get /registration
    case 'POST':
<<<<<<< HEAD
<<<<<<< HEAD
      return res.status(201).send(undefined);
=======
=======
      // TO DO: add validation : valid json, valid list of registrationResponse
      const body: RegistrationResponse = req.body
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
        return res.status(400).send(undefined)
      }

      for (const [QuestionId, QuestionResponse] of Object.entries(
        body.responses
      )) {
        const QUESTIONID = QuestionId
        if (
          QUESTIONID !== '1' ||
          QUESTIONID !== '2' ||
          QUESTIONID !== '3' ||
          QUESTIONID !== '4'
        ) {
          return res.status(400).send(undefined)
        }
        if (
          QUESTIONID === '1' &&
          (QuestionResponse === 'Alex' ||
            QuestionResponse === 'Jess' ||
            QuestionResponse === 'Jamie' ||
            QuestionResponse === 'Karen')
        ) {
          // post to database
          // need to check question type, see if response is of that response type
        } else if (
          QUESTIONID === '2' &&
          QuestionResponse.length >= 200 &&
          QuestionResponse.length <= 500
        ) {
        } else {
          return res.status(400).send(undefined)
        }
        // if this doesn't match, then 400
        // otherwise, check that type (either string[] or string)matches question type
        // validate response constraints against question requirements
        // (for example, text length for text responsese
      }

      // finally, query database (insert)
      // return 202

>>>>>>> work in prog
      const { responses } = req.body
      for (let i = 0; i < responses.length; i += 1) {
        switch (responses.get(i)) {
          case 0:
            if (responses[0] === 'Alex' || 'Jess' || 'Jamie' || 'Karen') {
            } else {
            }
          case 1:

          case 2:

          case 3:
        }
      }
      return res.status(201).send(undefined)
>>>>>>> started post
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
});
