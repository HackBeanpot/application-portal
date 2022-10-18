import { NextApiHandler } from 'next';
import { protect } from '../../../server/protect';
import { uploadApplicantResume } from '../../../server/upload/upload';

const handler: NextApiHandler = async (req, res) => {
  uploadApplicantResume('TEST', 'test file');
  res.send('passed through file upload code successfully');
};

export default protect(handler);
