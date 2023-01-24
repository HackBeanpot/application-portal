"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const retrieveEnvVarChecked = (s) => {
    const envVar = process.env[s] || '';
    if (envVar === '') {
        throw new Error(`Add this variable inside .env: ${s}`);
    }
    return envVar;
};
const dbName = "HackbeanpotCluster";
const connectionString = (() => {
    const connStr = "mongodb+srv://dbadmin:ijTyfvOMOVOirZXR@hackbeanpotcluster.unazpk3.mongodb.net";
    return connStr
})();
const g = global;
if (!g.mongo) {
    g.mongo = {};
}
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        // we know because of L36 that this is defined
        const cached = g.mongo;
        // if there already is a connection, then use it
        if (cached.conn) {
            return cached.conn;
        }
        // instantiate to a promise resolved with the context
        if (!cached.promise) {
            cached.promise = new mongodb_1.MongoClient(connectionString).connect().then((client) => {
                const db = client.db(dbName);
                const userDataCollection = db.collection('applicant_data');
                const singletonDataCollection = db.collection('singleton_data');
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
        cached.conn = yield cached.promise;
        return cached.conn;
    });
}
exports.connectToDatabase = connectToDatabase;
