import { MongoClient } from 'mongodb';

declare global {
    /* eslint-disable no-var */
var _mongoClientPromise: Promise<MongoClient> | undefined;
/* eslint-enable no-var */

}
