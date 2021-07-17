import { NextApiRequest, NextApiResponse } from 'next';
import { User, exampleUser } from '../../../common/types';
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>
) {
    if (req.method === 'GET') {
        res.status(200).json(exampleUser);
    } else if (req.method === 'PUT') {
        res.status(200).json(exampleUser);
    } else if (req.method === 'POST') {
        res.status(200).json(exampleUser);
    } else if (req.method === 'DELETE') {
        res.status(200).json(exampleUser);
    }
}