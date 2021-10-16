import { NextApiHandler } from 'next';
import { protect } from '../../../../server/protect';
import { getDate, postDate } from '../../../../server/dates';

const regClosedHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getDate(req, res, 'registration-closed');
      break;
    case 'POST':
      await postDate(req, res, 'registration-closed');
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

export default protect(regClosedHandler);
