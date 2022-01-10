Welcome!

Thanks for helping to contribute to HackBeanpot's application portal! Here's a
quick guide to start developing locally.

# Prerequisites:

- Node version 14 installed
- Yarn 1.22.xx installed; if you don't have it already installed, `npm install -g yarn`

# Installation instructions:

1. Clone the repository with `git clone https://github.com/HackBeanpot/application-portal`
2. Install dependencies with `yarn install`
3. Copy the `.env.example` file to `.env`, and fill out your relevant credentials. Or, DM one of the tech team members for the specific file.
   1. For dev, you'll need email server credentials
   2. For prod, (if using clustered db) fill out and uncomment the mongo prod url.
   3. Update next auth url to deployment domain
4. Install [Docker Desktop](https://docs.docker.com/desktop/)
5. Start Docker
6. Start Containers `yarn dev:db:up`
7. Start dev server with `yarn dev`
8. [Optional] Start Cypress with `yarn test:dev`
9. Visit server at `localhost:3000` and database explorer at `localhost:8081`.
