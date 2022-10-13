Welcome!

Thanks for helping to contribute to HackBeanpot's application portal! Here's a
quick guide to start developing locally.

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

# Jest unit testing:

- Name all test files {nameOfFileTested}.test.ts and place the test file with the actual file in a directory name-of-file-tested
- Separate a each test into sections with line breaks:
  > 1. All lines pertaining to set-up and expected strings or values
  > 2. All lines doing the action we simulate ie rendering components, etc.
  > 3. Expected values and subsequent teardown if we ever need that
- Each test should read as a sentence - keep this in mind when you are writing describe + it blocks because everything concatenates together
- Each file should have its own test file. You should not be testing things from different files in one file.
- To run the tests, use the command `yarn test:unit` which will print out test results and the coverage
