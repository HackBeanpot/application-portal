import { NextApiHandler } from 'next';
import { protect } from '../../../server/protect';
import { getShowDecision, postShowDecision } from '../../../server/showDecision';
import { SingletonType } from '../../../common/types';

const showDecisionHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getShowDecision(req, res, SingletonType.ShowDecision);
      break;
    case 'POST':
      await postShowDecision(req, res, SingletonType.ShowDecision);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

export default showDecisionHandler;
