import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // respond with unimplemented
    res.status(501).send(undefined);
}