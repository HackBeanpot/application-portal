import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from '../../../server/mongoDB';
import { ApplicationStatus, RSVPStatus } from '../../../common/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
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
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
        maxAge: 15 * 60, // email links are valid for 15 minutes
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
}
