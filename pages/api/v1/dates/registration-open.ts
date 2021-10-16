import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getDate, postDate } from '../../../../server/dates';

const regOpenHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getDate(req, res, 'registration-open');
      break;
    case 'POST':
      await postDate(req, res, 'registration-open');
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

// export default protect(regOpenHandler);
export default regOpenHandler;
