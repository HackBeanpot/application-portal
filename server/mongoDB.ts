import { MongoClient, Db, Collection } from 'mongodb';
import { SingletonDefinition, User } from '../common/types';

const MONGODB_URI = process.env.DATABASE_URL || '';
const MONGODB_DB = process.env.MONGODB_DB || '';

if (MONGODB_URI === '') {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (MONGODB_DB === '') {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

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

  // if cached is to correct collection, use it
  if (cached.conn) {
    return cached.conn;
  }

  // instantiate to a promise resolved with the context
  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((client) => {
      const db = client.db(MONGODB_DB);
      const userDataCollection = db.collection('applicant_data');
      const singletonDataCollection = db.collection('singleton_data');
      return { client, db, userDataCollection, singletonDataCollection };
    });
  }

  // after connection is resolved, set the connection & return
  // this might happen multiple times, but that's ok
  cached.conn = await cached.promise;
  return cached.conn;
}