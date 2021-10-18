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
      logo: '/logo.svg',
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
      async signIn({ user }) {
        // can implement banned users if needed
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
          const { userDataCollection } = await connectToDatabase();
          const existingUser = await userDataCollection.findOne({
            email: user.email!,
          });
          if (!existingUser) {
            await userDataCollection.insertOne({
              email: user.email!,
              applicationStatus: ApplicationStatus.IncompleteRegistrationOpen,
              isAdmin: false,
              rsvpStatus: RSVPStatus.InPerson,
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
