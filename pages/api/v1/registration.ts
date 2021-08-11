<<<<<<< HEAD
import { NextApiRequest, NextApiResponse } from 'next';
import { EXAMPLE_RESPONSE } from '../../../common/constants';
import { protect } from '../../../server/protect';
=======
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { EXAMPLE_RESPONSE } from '../../../common/constants'
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
      return res.status(201).send(undefined);
=======
      const { responses } = req.body
      for (let i = 0; i < responses.length; i += 1) {
        switch (i) {
          case 0:
            if (responses[0] === 'Alex' || 'Jess' || 'Jamie' || 'Karen') {
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
