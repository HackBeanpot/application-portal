# Local Development Infrastructure Setup

we use docker compose for setting up local dev infra! this is a cool tool that lets us easily spin up some containers,
and connect them via a network.

why do we need dev infra? great question: so you can run tests locally.

currently we use two containers: mongo, and mongo-express. mongo is our database. mongo-express is a helpful tool for
inspecting the database in the browser, used for development only.

you can view the local database in your browser via mongo-express at localhost:8081.

## Mongo

mongo is setup to run on port 27017, so the dev app points to 27017 by default (see the .env.example).

the data is stored in the ./mongo-data folder. this can be deleted whenever you want to reset your database.

init-mongo.js seeds the database after it is created. if you want to re-seed the db, try running
`yarn dev:db:down` and deleting the ./mongo-data folder, and running `yarn dev:db:up`.

currently, mongo is also setup to have a docker-compose health check. this is why the command
takes around 5 second to execute for startup. we use this health check to only
spin up mongo express after the db is already up, so mongo express doesn't crash.

## Mongo Express

mongo express is setup to run on port 8081. you can visit the db, after it's running, in your browser at
localhost:8081. this is purely for development purposes.

## Testing

### Unit Testing

#### Creating test files

Test files should be localized to the same directory as the components that they test. Syntax for naming your files:

`filename.test.tsx`

Note that you _must_ use the `tsx` extension in order to render components, just as in your component file.

#### Data test IDs

Unit test components by adding a `data-testid` to the top-most div. You can use this to inspect the DOM
and assess that certain properties of the elements being tested (such as their text) have been rendered appropriately.

Follow the `ApplicationStatusDialogue.tsx` file as an example for this. You can see how the component has been tested in `ApplicationStatusDialogue.test.tsx` as you set up tests for additional components.

#### What do I need to test about my component?

### References

- Docker Hub Mongo Image Reference: https://hub.docker.com/_/mongo/
- Docker Hub Mongo Express Image Reference: https://hub.docker.com/_/mongo-express/
- Mongosh Script Reference: https://docs.mongodb.com/mongodb-shell/
- Compose Spec Reference: https://github.com/compose-spec/compose-spec/blob/master/spec.md
