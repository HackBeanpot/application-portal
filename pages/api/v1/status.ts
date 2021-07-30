import { NextApiRequest, NextApiResponse } from 'next'
import { EXAMPLE_APPLICATION_STATUS } from '../../../common/constants'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // stringify bc for some reason, next was removing the quotes in the response
      return res.status(200).json(JSON.stringify(EXAMPLE_APPLICATION_STATUS))
    case 'POST':
      return res.status(201).send(undefined)
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined)
  }
}
