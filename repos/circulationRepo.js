const { MongoClient, ObjectId } = require('mongodb');
// const assert = require('assert');

function circulationRepo() {
  if (process.env.NODE_ENV !== 'production') require('dotenv').config();
  const uri = process.env.uri || '';
  const dbName = 'TESTAPP';

  function get() {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);

        const items = db.collection('newspapers').find();
        // collection.find({}).project({ a: 1 })                             // Create a projection of field a
        // collection.find({}).skip(1).limit(10)                          // Skip 1 and limit 10
        // collection.find({}).batchSize(5)                               // Set batchSize on cursor to 5
        // collection.find({}).filter({ a: 1 })                              // Set query on the cursor
        // collection.find({}).comment('add a comment')                   // Add a comment to the query, allowing to correlate queries
        // collection.find({}).addCursorFlag('tailable', true)            // Set cursor as tailable
        // collection.find({}).addCursorFlag('oplogReplay', true)         // Set cursor as oplogReplay
        // collection.find({}).addCursorFlag('noCursorTimeout', true)     // Set cursor as noCursorTimeout
        // collection.find({}).addCursorFlag('awaitData', true)           // Set cursor as awaitData
        // collection.find({}).addCursorFlag('exhaust', true)             // Set cursor as exhaust
        // collection.find({}).addCursorFlag('partial', true)             // Set cursor as partial
        // collection.find({}).addQueryModifier('$orderby', { a: 1 })        // Set $orderby {a:1}
        // collection.find({}).max(10)                                    // Set the cursor max
        // collection.find({}).maxTimeMS(1000)                            // Set the cursor maxTimeMS
        // collection.find({}).min(100)                                   // Set the cursor min
        // collection.find({}).returnKey(10)                              // Set the cursor returnKey
        // collection.find({}).setReadPreference(ReadPreference.PRIMARY)  // Set the cursor readPreference
        // collection.find({}).showRecordId(true)                         // Set the cursor showRecordId
        // collection.find({}).sort([['a', 1]])                           // Sets the sort order of the cursor query
        // collection.find({}).hint('a_1')

        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function getByParam(query, limit) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);

        let items = db.collection('newspapers').find(query);

        if (limit > 0) {
          items = items.limit(limit);
        }

        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);

        const results = await db.collection('newspapers').insertMany(data);
        //   console.log(results.insertedCount, results.ops);
        // assert.equal(data.length, results.insertedCount);

        resolve(results);
        client.close;
      } catch (error) {
        reject(error);
      }
    });
  }

  function getById(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);

        const item = await db
          .collection('newspapers')
          .findOne({ _id: ObjectId(id) });
        resolve(item);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function add(item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);
        const addedItem = await db.collection('newspapers').insertOne(item);

        resolve(addedItem);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function update(id, newItem) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);
        const updatedItem = await db
          .collection('newspapers')
          .findOneAndReplace({ _id: ObjectId(id) }, newItem, {
            returnOriginal: false,
          });

        resolve(updatedItem.value);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function remove(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);
        const removed = await db
          .collection('newspapers')
          .deleteOne({ _id: ObjectId(id) });

        resolve(removed.deletedCount === 1);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  return { loadData, get, getByParam, getById, add, update, remove };
}

module.exports = circulationRepo();
