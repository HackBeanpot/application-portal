import { NextApiHandler } from 'next';
import { protect } from '../../../../server/protect';
import { getDate, postDate } from '../../../../server/dates';

const confirmByHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getDate(req, res, 'confirm-by');
      break;
    case 'POST':
      await postDate(req, res, 'confirm-by');
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

export default protect(confirmByHandler);
