import { MongoClient, Db, Collection } from 'mongodb';
import { SingletonDefinition, User } from '../common/types';
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

const retrieveEnvVarChecked = (s: string) => {
  const envVar = process.env[s] || '';
  if (envVar === '') {
    throw new Error(`Add this variable inside .env: ${s}`);
  }
  return envVar;
};

const dbName = retrieveEnvVarChecked('MONGO_SERVER_DBNAME');
const connectionString = (() => {
  const connStr = process.env.MONGO_PROD_CONNECTION_STRING;
  if (connStr) {
    return connStr;
  }
  const port = retrieveEnvVarChecked('MONGO_DEV_PORT');
  const username = retrieveEnvVarChecked('MONGO_DEV_USERNAME');
  const password = retrieveEnvVarChecked('MONGO_DEV_PASSWORD');
  return `mongodb://${username}:${password}@localhost:${port}`;
})();

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
type MongoCtx = {
  client: MongoClient;
  db: Db;
  userDataCollection: Collection<User>;
  singletonDataCollection: Collection<SingletonDefinition>;
};

type GlobalWithMongo = {
  mongo?: {
    conn?: MongoCtx;
    promise?: Promise<MongoCtx>;
  };
};
const g = global as unknown as GlobalWithMongo;
if (!g.mongo) {
  g.mongo = {};
}

export async function connectToDatabase(): Promise<MongoCtx> {
  // we know because of L36 that this is defined
  const cached = g.mongo!;

  // if there already is a connection, then use it
  if (cached.conn) {
    return cached.conn;
  }

  // instantiate to a promise resolved with the context
  if (!cached.promise) {
    cached.promise = new MongoClient(connectionString).connect().then((client) => {
      const db = client.db(dbName);
      const userDataCollection = db.collection<User>('applicant_data');

      const singletonDataCollection = db.collection<SingletonDefinition>('singleton_data');
      return {
        client,
        db,
        userDataCollection,
        singletonDataCollection,
      };
    });
  }

  // after connection is resolved, set the connection & return
  // this might happen multiple times, but that's ok
  cached.conn = await cached.promise;
  return cached.conn;
}
