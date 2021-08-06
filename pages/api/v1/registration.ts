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
  switch (req.method) {
    case 'GET':
<<<<<<< HEAD
      return res.status(200).json(EXAMPLE_RESPONSE);
=======
      const session = (await getSession({ req }))!
      session.user?.email

      const { client, db } = await connectToDatabase()
      const data = await db
        .collection('users')
        .findOne(
          { email: session.user?.email },
          { projection: { _id: 0, email: 1 } }
        )

      console.log(data)

      return res.status(200).json(data)
>>>>>>> started get /registration
    case 'POST':
      return res.status(201).send(undefined);
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
});
