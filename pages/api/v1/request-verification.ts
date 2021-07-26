import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return res.status(201).send(undefined)
    default:
      return res.status(405).setHeader('Allow', 'POST').send(undefined)
  }
}
