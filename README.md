Welcome!

Thanks for helping to contribute to Hackbeanpot's application portal! Here's a quick guide to start developing locally.

# Prerequisites:

- Node version 14 installed
- Yarn 1.22.xx installed; if you don't have it already installed, `npm install -g yarn`

# Installation instructions:

1. Clone the repository with `git clone https://github.com/HackBeanpot/application-portal`
2. Install dependencies with `yarn install`
3. Create an .env.local file; make a copy of the .env.example file, and fill out your relevant credentials. Or, DM one of the tech team members for the specific file.
   a. Email server credentials for email login/sending emails
   b. MongoDB credentials
   c. Next auth url
4. Start dev server with `yarn dev`
5. Visit localhost:3000 in your browser to see the current portal
