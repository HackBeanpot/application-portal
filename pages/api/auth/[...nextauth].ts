import NextAuth from 'next-auth';
import EmailProvider, { EmailConfig } from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from '../../../server/mongoDB';
import { ApplicationStatus, RSVPStatus } from '../../../common/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { safe } from '../../../server/errors';
import nodemailer from 'nodemailer';
import { identifier } from '@babel/types';

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, {
    pages: {
      signIn: '/auth/signin',
    },
    theme: {
      colorScheme: 'auto', // "auto" | "dark" | "light"
      brandColor: '', // Hex color code
      logo: '/logo_big.png',
    },
    // Configure one or more authentication providers
    providers: [
      // Providers.GitHub({
      //   clientId: process.env.GITHUB_ID,
      //   clientSecret: process.env.GITHUB_SECRET,
      // }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT
            ? parseInt(process.env.EMAIL_SERVER_PORT)
            : 0,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
        maxAge: 15 * 60, // email links are valid for 15 minutes
        sendVerificationRequest,
      }),
    ],
    // A database is optional, but required to persist accounts in a database
    adapter: MongoDBAdapter({
      db: await connectToDatabase().then((ctx) => ctx.client.db('next-auth')),
    }),
    // callback so that we can add a user to the database
    callbacks: {
      async signIn({ user, email }) {
        // can implement banned users if needed
        if (email.verificationRequest) {
          // don't create user on validation request, only on sign-in
          return true;
        }

        // non-null assertion ok because email is currently the only form of sign-in
        const userEmail = user.email!;
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
          const { userDataCollection } = await connectToDatabase();
          const existingUser = await userDataCollection.findOne({
            email: userEmail,
          });
          if (!existingUser) {
            // all users with @hackbeanpot.com are made admins by default
            const [, domain] = userEmail.split('@');
            await userDataCollection.insertOne({
              email: userEmail,
              applicationStatus: ApplicationStatus.Incomplete,
              isAdmin: domain === 'hackbeanpot.com',
              rsvpStatus: RSVPStatus.Unconfirmed,
            });
          }
          return true;
        } else {
          // return false to display a default error message
          return false;
          // or we can return a URL to redirect to:
          // return /unauthorized
        }
      },
    },
  });
};

// Unclear if this actually works but this is some black magic right here
interface EmailRequestType {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
}

async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { server, from },
}: EmailRequestType) {
  const { host } = new URL(url);
  const transport = nodemailer.createTransport(server);
  await transport.sendMail({
    to: email,
    from,
    subject: `Log into HBP Application Portal @ ${host}`, // TODO: What do we actually want here
    text: text({ url, host }),
    html: html({ url, host, email }),
  });
}

function html({ url, host, email }: Record<'url' | 'host' | 'email', string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`;

  // Some simple styling options
  const backgroundColor = '#f9f9f9';
  const textColor = '#444444';
  const mainBackgroundColor = '#ffffff';
  const buttonBackgroundColor = '#346df1';
  const buttonBorderColor = '#346df1';
  const buttonTextColor = '#ffffff';

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<'url' | 'host', string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export default safe(authHandler);
