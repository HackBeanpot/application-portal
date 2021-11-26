import Rollbar from 'rollbar';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

// Rollbar for error logging + notifications
const rollbar = new Rollbar({
  environment: 'production',
  accessToken: process.env.ROLLBAR_POST_SERVER_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// Make routes safe by catching and giving sane response + report to rollbar
export function safe(route: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await route(req, res);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rollbar.error(err, req);
      console.error(err);
      const msg = `Something broke on our end. Please reach out to us immediately.`;
      res.status(500).send(msg);
    } finally {
      await wait();
    }
  };
}

function wait() {
  return new Promise((resolve) => {
    rollbar.wait(() => resolve(null));
  });
}
